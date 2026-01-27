import React from 'react';
import ApiService from "../services/ApiService";
import { TabulatorFull as Tabulator } from "tabulator-tables";

export default function Manage() {

    const tableRef = React.useRef(null);
    const tabulatorRef = React.useRef(null);

    const [modal, setModal] = React.useState(false);

    React.useEffect(() => {
        initTable();

        return () => {
            tabulatorRef.current?.destroy();
            tabulatorRef.current = null;
        };
    }, []);
    
    const handleCreate = (e) => {
        e.preventDefault();
        setModal(true);
    }
    
    const handleUpdate = (e) => {
        e.preventDefault();
        setModal(true);
    }
    
    const handleCancel = (e) => {
        e.preventDefault(); 
        tabulatorRef.current.deselectRow();
        tabulatorRef.current.clearFilter();
    }
    
    const handleDelete = (e) => {
        e.preventDefault(); 
        const selected = tabulatorRef.current.getSelectedData();
        if(selected.length) {
            if(window.confirm("Are you sure to delete?")) {
                const data = {
                    dic_id : selected[0].dic_id,
                    eng_id : selected[0].eng_id,
                    mon_id : selected[0].mon_id,
                };
                ApiService.request("/api/manage/delete", {
                    auth: false,
                    method: "POST",
                    body: JSON.stringify(data),
                })
                .then((response) => response.json())
                .then((data) => { getData(); })
                .catch((error) => { alert("Failed to save."); });
            }
        }
    }

    const handleModalSave = (e) => {
        e.preventDefault(); 
        setModal(false);
    }

    const handleModalCancel = (e) => {
        e.preventDefault(); 
        setModal(false);
    }

    const getData = () => {
        ApiService.request("/api/manage/select", {
            auth: false,
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                tabulatorRef.current?.setData(data);
            })
            .catch((error) => {
                console.error("Request failed:", error.message);
            });
    };

    const initTable = () => {
        if (!tableRef.current) return;

        tabulatorRef.current = new Tabulator(tableRef.current, {
            selectableRows: 1,
            layout: "fitColumns",
            history: true,
            pagination: true,
            paginationSize: 32,
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
            getData();
        });
    };

    return (
        <div className="content-layout">

            <div className="content-wrapper-layout">
                <div className="content-wrapper">

                    <div className="toolbar">

                        <input type="text" id="inSearch" placeholder="Search input"/>

                        <button onClick={(e) => handleCreate(e) }>Create</button>
                        <button onClick={(e) => handleUpdate(e) }>Update</button>
                        <button onClick={(e) => handleCancel(e) }>Cancel</button>
                        <button onClick={(e) => handleDelete(e) }>Delete</button>

                    </div>

                    <div className="table-wrapper">
                        <div ref={tableRef} />
                    </div>

                </div>

                {modal && 
                    <div className="modal-wrapper">
                        <div className="modal">
                            <div className="modal-body">
                                <div className="modal-header">
                                    <h3>Create Vocabulary</h3>
                                </div>
                                <div className="modal-content">
                                    <div>
                                        <input type="text" placeholder="Input English"/>
                                    </div>
                                    <br/>                                 
                                    <div>
                                        <input type="text" placeholder="Input Mongolian"/>
                                    </div>                                    
                                </div>
                                <div className="modal-footer">
                                    <button onClick={(e) => handleModalSave(e) }>Save</button>
                                    <button onClick={(e) => handleModalCancel(e) }>Cancel</button>
                                </div>
                            </div>					
                        </div>
                    </div>
                }

            </div>
        </div>
    );  
        
}