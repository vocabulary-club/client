import React from 'react';
import ApiService from "../services/ApiService";
import { TabulatorFull as Tabulator } from "tabulator-tables";

export default function Home() {

    const [dayVal, setDayVal] = React.useState("last");

    const tableRef = React.useRef(null);
    const tabulatorRef = React.useRef(null);

    React.useEffect(() => {
        
        initTable();

        return () => {
            tabulatorRef.current?.destroy();
            tabulatorRef.current = null;
        };
    }, []);

    React.useEffect(() => {
        
        getData();

    }, [dayVal]);

    const getData = () => {

        const data = { "day" : dayVal, };
        ApiService.request("/", {
            auth: false,
            method: "POST",
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {         
                tabulatorRef.current.setData(data);
            })
            .catch((error) => {
                console.error("Request failed:", error.message);
            });
    };

    const initTable = () => {
        if (!tableRef.current) return;

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

        tabulatorRef.current.on("tableBuilt", function(){
            getData();
        });
    };
    
    return (
        <div className="content-layout">
            <div className="toolbar">
                <div className="radio-group">
                    <input type="radio" id="last" name="day" value="last" checked={dayVal === "last"} onChange={(e) => setDayVal(e.target.value)} />
                    <label htmlFor="last">Last Day</label>

                    <input type="radio" id="secondLast" name="day" value="second last" checked={dayVal === "second last"} onChange={(e) => setDayVal(e.target.value)} />
                    <label htmlFor="secondLast">A Day Before</label>

                    <input type="radio" id="thirdLast" name="day" value="third last" checked={dayVal === "third last"} onChange={(e) => setDayVal(e.target.value)} />
                    <label htmlFor="thirdLast">2 Days Before</label>
                </div>
            </div>

            <div className="table-wrapper">
                <div ref={tableRef} />
            </div>
        </div>
    );
}