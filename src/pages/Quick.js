import React from 'react';
import ApiService from "../services/ApiService";
import { TabulatorFull as Tabulator } from "tabulator-tables";

export default function Quick() {

    const originDataRef = React.useRef([]);
    const shuffledDataRef = React.useRef([]);
    const finishedDataRef = React.useRef([]);
    const shuffledIdxRef = React.useRef(0);

    const [action, setAction] = React.useState("stop");          // start, stop
    const [limit, setLimit] = React.useState("rand 10");    // last 10, rand 10, last 50, rand 50
    const [lang, setLang] = React.useState("eng");          // eng, mon

    const [question, setQuestion] = React.useState("");
    const [answer, setAnswer] = React.useState(null);
    
    const [answer0, setAnswer0] = React.useState("answer1");
    const [answer1, setAnswer1] = React.useState("answer2");
    const [answer2, setAnswer2] = React.useState("answer3");
    const [answer3, setAnswer3] = React.useState("answer4");

    const [regDate, setRegDate] = React.useState("");
    const [count, setCount] = React.useState("");

    const tableRef = React.useRef(null);
    const tabulatorRef = React.useRef(null);

    const [tableReady, setTableReady] = React.useState(false);

    React.useEffect(() => {
        getData();
        initTable();

        return () => {
            tabulatorRef.current?.destroy();
            tabulatorRef.current = null;
        };
    }, []);

    React.useEffect(() => {
        if (action === "start") {
            
            reShuffle();

            finishedDataRef.current = [];
            shuffledIdxRef.current = 0;

            myNext();       

        } else {

            if(tableReady) { tabulatorRef.current.setData(finishedDataRef.current); }

        }

        return () => { }
    }, [action]);

    const handleAnswer = (value) => {

        const answer = shuffledDataRef.current[shuffledIdxRef.current - 1].answer[parseInt(value, 10)];
        
        if(answer.dic_id == shuffledDataRef.current[shuffledIdxRef.current - 1].dic_id) {
            if(!finishedDataRef.current[shuffledIdxRef.current - 1].result) {
                finishedDataRef.current[shuffledIdxRef.current - 1].result = "correct";					
            }
        } else {
            if(!finishedDataRef.current[shuffledIdxRef.current - 1].result) {
                finishedDataRef.current[shuffledIdxRef.current - 1].result = "wrong";
            }
        }

        myNext();
    }

    const myNext = () => {
    
        const currIndex = shuffledIdxRef.current;
        if (currIndex >= shuffledDataRef.current.length) {
            setAction("stop");
            return ;
        }

        const currData = shuffledDataRef.current[currIndex];

        if (lang === "eng") {
            setQuestion(currData?.eng_word || "");
            setAnswer0(currData?.answer[0]?.mon_word || "");
            setAnswer1(currData?.answer[1]?.mon_word || "");
            setAnswer2(currData?.answer[2]?.mon_word || "");
            setAnswer3(currData?.answer[3]?.mon_word || "");            
        } else {
            setQuestion(currData?.mon_word || "");
            setAnswer0(currData?.answer[0]?.eng_word || "");
            setAnswer1(currData?.answer[1]?.eng_word || "");
            setAnswer2(currData?.answer[2]?.eng_word || "");
            setAnswer3(currData?.answer[3]?.eng_word || "");
        }

        setRegDate(currData?.reg_date || "");
        setCount(`${currIndex + 1} / ${shuffledDataRef.current.length}`);
        finishedDataRef.current = [...finishedDataRef.current, currData];
        shuffledIdxRef.current = currIndex + 1;

    }

    const getData = () => {
        ApiService.request("/api/check/select", {
            auth: false,
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {                              
                originDataRef.current = data;
            })
            .catch((error) => {
                console.error("Request failed:", error.message);
            });
    };

    const reShuffle = () => {
        if (limit.includes("last 10")) {
            shuffledDataRef.current = shuffle(originDataRef.current.slice(0, 10));
        } else if(limit.includes("last 50")) {
            shuffledDataRef.current = shuffle(originDataRef.current.slice(0, 50));
        } else if(limit.includes("rand 10")) {
            shuffledDataRef.current = shuffle(originDataRef.current).slice(0, 10);
        } else if(limit.includes("rand 50")) {
            shuffledDataRef.current = shuffle(originDataRef.current).slice(0, 50);
        }

        shuffledDataRef.current.forEach((item, index) => {

            let answer = shuffle(originDataRef.current).slice(0, 4);            
            if(answer.find((x) => x.dic_id === item.dic_id)) {
                
            } else{
                answer = answer.slice(0, 3);
                answer.push(item);
                answer = shuffle(answer);
            }
            item.answer = answer;
        });
    }

    const shuffle = (data) => {
        const copy = [...data];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };

    const initTable = () => {
        if (!tableRef.current) return;

        tabulatorRef.current = new Tabulator(tableRef.current, {
            selectableRows: 1,
            layout: "fitColumns",
            history: true,
            pagination: false,
            columnDefaults: {
                tooltip: true,
            },
            rowFormatter: function (row) {
				const data = row.getData();
				if (data.result === "correct") {
					row.getElement().style.backgroundColor = "#4f44"; // green
				} else if (data.result === "wrong") {
					row.getElement().style.backgroundColor = "#f444"; // red
				}
			},
            columns: [
                {
                    formatter: "rowSelection",
                    hozAlign: "center",
                    headerSort: false,
                    frozen: true,
                    headerHozAlign: "center",
                    width: 32,
                },
                { title: "English", field: "eng_word" },
                { title: "Mongolian", field: "mon_word" },
            ],
        });

        tabulatorRef.current.on("tableBuilt", () => {  
            setTableReady(true);
        });
    };

    return (
        <div className="content-layout">
            <div className="toolbar">
            
                <div className="radio-group">
                    <input type="radio" id="start" name="action" value="start" checked={action === "start"} onChange={(e)=> setAction(e.target.value)} disabled={!tableReady} />
                    <label htmlFor="start">Start</label>

                    <input type="radio" id="stop" name="action" value="stop" checked={action === "stop"} onChange={(e)=> setAction(e.target.value)} disabled={!tableReady} />
                    <label htmlFor="stop">Stop</label>
                </div>

                <div className="radio-group">
                    <input type="radio" id="lastTen" name="limit" value="last 10" checked={limit === "last 10"} onChange={(e) => setLimit(e.target.value)} />
                    <label htmlFor="lastTen">Last 10</label>

                    <input type="radio" id="randTen" name="limit" value="rand 10" checked={limit === "rand 10"} onChange={(e)=> setLimit(e.target.value)} />
                    <label htmlFor="randTen">Rand 10</label>

                    <input type="radio" id="lastFifty" name="limit" value="last 50" checked={limit === "last 50"} onChange={(e)=> setLimit(e.target.value)} />
                    <label htmlFor="lastFifty">Last 50</label>

                    <input type="radio" id="randFifty" name="limit" value="rand 50" checked={limit === "rand 50"} onChange={(e)=> setLimit(e.target.value)} />
                    <label htmlFor="randFifty">Rand 50</label>
                </div>

                <div className="radio-group">
                    <input type="radio" id="eng" name="lang" value="eng" checked={lang === "eng"} onChange={(e) => setLang(e.target.value)} />
                    <label htmlFor="eng">Eng</label>

                    <input type="radio" id="mon" name="lang" value="mon" checked={lang === "mon"} onChange={(e)=> setLang(e.target.value)} />
                    <label htmlFor="mon">Mon</label>
                </div>

            </div>

            <div className={`word-wrapper ${action === "stop" ? "hide" : ""}`}>
                <div className="word font48">{question}</div>
                <br />
                <div className="radio-group">
                    <input type="radio" id="answer0" name="answer" value="0" checked={answer === "0"} onChange={(e) => handleAnswer(e.target.value)} />
                    <label htmlFor="answer0" className='full-width'>{answer0}</label>
                    <br />
                    <input type="radio" id="answer1" name="answer" value="1" checked={answer === "1"} onChange={(e) => handleAnswer(e.target.value)} />
                    <label htmlFor="answer1" className='full-width'>{answer1}</label>
                    <br />
                    <input type="radio" id="answer2" name="answer" value="2" checked={answer === "2"} onChange={(e) => handleAnswer(e.target.value)} />
                    <label htmlFor="answer2" className='full-width'>{answer2}</label>
                    <br />
                    <input type="radio" id="answer3" name="answer" value="3" checked={answer === "3"} onChange={(e) => handleAnswer(e.target.value)} />
                    <label htmlFor="answer3" className='full-width'>{answer3}</label>
                </div>
                <div className="word font24">{regDate}</div>
                <div className="word font24">{count}</div>
            </div>

            <div className={`table-wrapper ${action === "start" ? "hide" : ""}`}>
                <div ref={tableRef} />
            </div>

        </div>
    );  
        
}