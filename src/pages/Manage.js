import React from 'react';
import ApiService from "../services/ApiService";
import { TabulatorFull as Tabulator } from "tabulator-tables";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { Modal, Box, Typography, TextField, Button, Stack } from "@mui/material";

export default function Manage() {

    const tableRef = React.useRef(null);
    const tabulatorRef = React.useRef(null);

    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState("Add new word?");

    const [firstWord, setFirstWord] = React.useState("");
    const [secondWord, setSecondWord] = React.useState("");

    const updateRef = React.useRef(0);

    React.useEffect(() => {
        initTable();

        return () => {
            tabulatorRef.current?.destroy();
            tabulatorRef.current = null;
        };
    }, []);
    
    const handleCreate = (e) => {
        e.preventDefault();

        tabulatorRef.current.deselectRow();
        tabulatorRef.current.clearFilter();

        setFirstWord("");
        setSecondWord("");
        setModalTitle("Add new word?");
        setModalOpen(true);

        updateRef.current = 0;
    }
    
    const handleUpdate = (e) => {
        e.preventDefault();

        const selected = tabulatorRef.current.getSelectedData();
        if(selected.length) {
            setFirstWord(selected[0].eng_word);
            setSecondWord(selected[0].mon_word);
            setModalTitle("Update old word?");
            setModalOpen(true);

            updateRef.current = 1;
        }
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
                    method: "POST",
                    body: JSON.stringify(data),
                })
                .then((response) => response.json())
                .then((data) => { getData(); })
                .catch((error) => { alert("Failed to delete."); });
            }
        }
    }

    const handleModalSave = (e) => {
        e.preventDefault(); 

        if(!firstWord || !secondWord) {
            alert("Enter your words!");
            return;
        }

        const data = {
            eng_word : firstWord,
            mon_word : secondWord,
        };

        let url = "/create";
        if(updateRef.current == 1) { 
            url = "/update"; 
            const selected = tabulatorRef.current.getSelectedData();
            data.eng_id = selected[0].eng_id;
            data.mon_id = selected[0].mon_id;
        }

        ApiService.request("/api/manage" + url, {
            method: "POST",
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => { getData(); })
        .catch((error) => { alert("Failed to save."); });

        setModalOpen(false);
    }

    const getData = () => {
        ApiService.request("/api/manage/select", {
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

            <div className="toolbar">

                <input type="text" id="inSearch" placeholder="Search input"/>
                
                <button onClick={(e) => handleCreate(e) }>Create</button>
                <button onClick={(e) => handleUpdate(e) }>Update</button>
                <button onClick={(e) => handleCancel(e) }>Cancel</button>
                <button onClick={(e) => handleDelete(e) }>Delete</button>

                <DeleteIcon
                    onClick={(e) => handleDelete(e)}
                    color="error"
                    sx={{
                        fontSize: 32,
                        cursor: "pointer",
                        "&:hover": { transform: "scale(1.1)" },
                        "&:active": { transform: "scale(0.9)" },
                    }}
                />

            </div>

            <div className="table-wrapper">
                <div ref={tableRef} />
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box
                    sx={{
                        width: 256,
                        bgcolor: "background.paper",
                        p: 3,
                        borderRadius: 2,
                        m: "auto",
                        mt: "20%",
                    }}
                >
                {/* Title */}
                <Typography variant="h6" mb={2}>
                    {modalTitle}
                </Typography>

                {/* Inputs */}
                <Stack spacing={2}>
                    <TextField placeholder="English" fullWidth value={firstWord} onChange={(e) => setFirstWord(e.target.value)} autoFocus />
                    <TextField placeholder="Mongolian" fullWidth value={secondWord} onChange={(e) => setSecondWord(e.target.value)}/>
                </Stack>

                {/* Buttons */}
                <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
                    <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={(e) => handleModalSave(e)}>Save</Button>
                </Stack>
                </Box>
            </Modal>

        </div>
    );  
        
}