import React from 'react';
import ApiService from "../services/ApiService";
import { TabulatorFull as Tabulator } from "tabulator-tables";

export default function Check() {

    const [originData, setOriginData] = React.useState([]);
    const [shuffledData, setShuffledData] = React.useState([]);
    const [finishedData, setFinishedData] = React.useState([]);
    const [shuffledIndex, setShuffledIndex] = React.useState(0);

    const [action, setAction] = React.useState("stop");          // start, stop
    const [limit, setLimit] = React.useState("rand 10");    // last 10, rand 10, last 50, rand 50
    const [lang, setLang] = React.useState("eng");          // eng, mon
    const [time, setTime] = React.useState(3);               // 2, 3

    const [engWord, setEngWord] = React.useState("");
    const [monWord, setMonWord] = React.useState("");
    const [regDate, setRegDate] = React.useState("");
    const [count, setCount] = React.useState("");

    const tableRef = React.useRef(null);
    const tabulatorRef = React.useRef(null);

    // for interval

    const [delay, setDelay] = React.useState(1000); // ms
    const [isRunning, setIsRunning] = React.useState(false);

    React.useEffect(() => {

        fetchData();

        tabulatorRef.current = new Tabulator(tableRef.current, {
            selectableRows:1,
            layout:"fitColumns",
            history:true,
            pagination: false,
			columnDefaults:{
                tooltip:true,         //show tool tips on cells
            },
            columns:[
                {
                    formatter: "rowSelection", 
                    hozAlign: "center",
                    headerSort: false,
                    frozen: true,
                    headerHozAlign: "center",
                    width: 32,
                },
                {title:"English", field:"eng_word", },
                {title:"Mongolian", field:"mon_word", },
            ],
        });
        tabulatorRef.current.on("tableBuilt", function(){ });

        return () => {
            tabulatorRef.current?.destroy();
        };
    }, []);

    React.useEffect(() => {

        setEngWord("");
        setMonWord("");
        setRegDate("");
        setCount("");
       
        if(action === "start") {
            if(limit.includes("last 10")) {
                setShuffledData(shuffle(originData.slice(0, 10)));
            } else if(limit.includes("last 50")) {
                setShuffledData(shuffle(originData.slice(0, 50)));
            } else if(limit.includes("rand 10")) {
                setShuffledData(shuffle(originData).slice(0, 10));
            } else if(limit.includes("rand 50")) {
                setShuffledData(shuffle(originData).slice(0, 50));
            }
            setFinishedData([]);
            setShuffledIndex(0);            
            setDelay(time * 1000);
            setIsRunning(true);
        } else {
            setShuffledData([]);
            setFinishedData([]);
            setShuffledIndex(0);
            setIsRunning(false);  
        }

    }, [action]);

    const fetchData = () => {

        ApiService.request("/api/check/select", {
            auth: false,
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {                              
                setOriginData(data);
                console.log(data);  
            })
            .catch((error) => {
                console.error("Request failed:", error.message);
            });
    };

    const shuffle = data => {
        const copy = [...data];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };

    const myTask = React.useCallback(() => {
        setShuffledIndex((prevIndex) => {
            if (action === "stop" || prevIndex >= shuffledData.length) {
                tabulatorRef.current.setData(finishedData);
                setIsRunning(false);
                setAction("stop");                
                return prevIndex;
            }

            const current = shuffledData[prevIndex];

            if (lang === "eng") {
                setEngWord(current?.eng_word || "");
                setMonWord("");
            } else {
                setEngWord("");
                setMonWord(current?.mon_word || "");
            }

            setRegDate(current?.reg_date || "");
            setCount(`${prevIndex + 1} / ${shuffledData.length}`);

            setFinishedData((prev) => [...prev, current]);

            return prevIndex + 1;
        });
    }, [action, shuffledData, lang]);

    React.useEffect(() => {
        if (!isRunning) {
            return;
        }
        
        myTask();

        const id = setInterval(myTask, delay);
        return () => clearInterval(id);

    }, [isRunning, delay, myTask]);

    React.useEffect(() => {
        if (isRunning) return;
        if (!tabulatorRef.current) return;
        if (finishedData.length === 0) return;

        // wait until table is visible in DOM
        requestAnimationFrame(() => {
            tabulatorRef.current.setData(finishedData);
            tabulatorRef.current.redraw(true);
        });
    }, [isRunning, finishedData]);


    return (
        <div className="content-layout">
            <div className="toolbar">
            
                <div className="radio-group">
                    <input type="radio" id="start" name="action" value="start" checked={action === "start"} onChange={(e) => setAction(e.target.value)} />
                    <label htmlFor="start">Start</label>

                    <input type="radio" id="stop" name="action" value="stop" checked={action === "stop"} onChange={(e)=>setAction(e.target.value)} />
                    <label htmlFor="stop">Stop</label>
                </div>

                <div className="radio-group">
                    <input type="radio" id="lastTen" name="limit" value="last 10" checked={limit === "last 10"} onChange={(e) => setLimit(e.target.value)} />
                    <label htmlFor="lastTen">Last 10</label>

                    <input type="radio" id="randTen" name="limit" value="rand 10" checked={limit === "rand 10"} onChange={(e)=>setLimit(e.target.value)} />
                    <label htmlFor="randTen">Rand 10</label>

                    <input type="radio" id="lastFifty" name="limit" value="last 50" checked={limit === "last 50"} onChange={(e)=>setLimit(e.target.value)} />
                    <label htmlFor="lastFifty">Last 50</label>

                    <input type="radio" id="randFifty" name="limit" value="rand 50" checked={limit === "rand 50"} onChange={(e)=>setLimit(e.target.value)} />
                    <label htmlFor="randFifty">Rand 50</label>
                </div>

                <div className="radio-group">
                    <input type="radio" id="eng" name="lang" value="eng" checked={lang === "eng"} onChange={(e) => setLang(e.target.value)} />
                    <label htmlFor="eng">Eng</label>

                    <input type="radio" id="mon" name="lang" value="mon" checked={lang === "mon"} onChange={(e)=>setLang(e.target.value)} />
                    <label htmlFor="mon">Mon</label>
                </div>

                <div className="radio-group">
                    <input type="radio" id="two" name="time" value={2} checked={time === 2} onChange={() => setTime(2)} />
                    <label htmlFor="two">2 sec</label>

                    <input type="radio" id="three" name="time" value={3} checked={time === 3} onChange={() => setTime(3)} />
                    <label htmlFor="three">3 sec</label>
                </div>

            </div>

            <div className={`table-wrapper ${!isRunning ? "hide" : ""}`}>
                <div className="word">{engWord}</div>
                <div className="word">{monWord}</div>
                <div className="word">{regDate}</div>
                <div className="word">{count}</div>
            </div>

            <div className={`table-wrapper ${isRunning ? "hide" : ""}`}>
                <div ref={tableRef} />
            </div>

        </div>
    );  
        
}