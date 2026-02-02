import React from 'react';
import ApiService from "../services/ApiService";
import { TabulatorFull as Tabulator } from "tabulator-tables";

export default function Test1() {

    const originDataRef = React.useRef([]);
    const shuffledDataRef = React.useRef([]);
    const finishedDataRef = React.useRef([]);
    const shuffledIdxRef = React.useRef(0);

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
    const intervalIdRef = React.useRef(null);

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

            myTask();
            if (!intervalIdRef.current) {
                intervalIdRef.current = setInterval(() => { 
                    myTask(); 
                }, time * 1000);
            }            

        } else {
            if(tableReady) { tabulatorRef.current.setData(finishedDataRef.current); }
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;

        }

        return () => {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }

    }, [action]);

    const myTask = () => {
    
        const currIndex = shuffledIdxRef.current;
        if (currIndex >= shuffledDataRef.current.length) {
            setAction("stop");
            return ;
        }

        const currData = shuffledDataRef.current[currIndex];

        if (lang === "eng") {
            setEngWord(currData?.eng_word || "");
            setMonWord("");
        } else {
            setEngWord("");
            setMonWord(currData?.mon_word || "");
        }

        setRegDate(currData?.reg_date || "");
        setCount(`${currIndex + 1} / ${shuffledDataRef.current.length}`);
        finishedDataRef.current = [...finishedDataRef.current, currData];
        shuffledIdxRef.current = currIndex + 1;

    }

    const getData = () => {
        ApiService.request("/api/test/select", {
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

                    <input type="radio" id="stop" name="action" value="stop" checked={action === "stop"} onChange={(e)=> setAction(e.target.value)} disabled={!tableReady}/>
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

                <div className="radio-group">
                    <input type="radio" id="two" name="time" value={2} checked={time === 2} onChange={() => setTime(2)} />
                    <label htmlFor="two">2 sec</label>

                    <input type="radio" id="three" name="time" value={3} checked={time === 3} onChange={() => setTime(3)} />
                    <label htmlFor="three">3 sec</label>
                </div>

            </div>

            <div className={`word-wrapper ${action === "stop" ? "hide" : ""}`}>
                <div className="word font48">{engWord}</div>
                <div className="word font48">{monWord}</div>
                <div className="word font24">{regDate}</div>
                <div className="word font24">{count}</div>
            </div>

            <div className={`table-wrapper ${action === "start" ? "hide" : ""}`}>
                <div ref={tableRef} />
            </div>

        </div>
    );  
        
}