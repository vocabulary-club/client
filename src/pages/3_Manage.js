import React from 'react';
import ApiService from "../services/ApiService";
import { TabulatorFull as Tabulator } from "tabulator-tables";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";

import { Modal, Box, Typography, TextField, Button, Stack, Paper, IconButton, } from "@mui/material";

export default function Manage() {

    const tableRef = React.useRef(null);
    const tabulatorRef = React.useRef(null);

    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState("Add new word?");

    const [firstWord, setFirstWord] = React.useState("");
    const [secondWord, setSecondWord] = React.useState("");

    const [search, setSearch] = React.useState("");

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
    
    const handleSearch = (e) => {
        e.preventDefault();

        const value = e.target.value.toLowerCase();
        setSearch(value);
        tabulatorRef.current.setFilter(function (data) {
            return (
                data.eng_word?.toLowerCase().includes(value) ||
                data.mon_word?.toLowerCase().includes(value)
            );
        });
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
        setSearch("");
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

            {/* Toolbar */}
            <Paper sx={{ p: 1, mb: 1 }}>

                <Stack direction="row" spacing={1}>
                    <TextField size="small" label="Search" value={search} onChange={(e) => handleSearch(e)} />

                    <Box
                        onClick={(e) => handleCreate(e)}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            height: "100%",
                        }}
                    >
                        <IconButton color="primary" size="small">
                            <AddIcon />
                        </IconButton>
                        <Typography variant="caption" sx={{ mt: -0.5, fontSize: 10, lineHeight: 1 }}>
                            {"New Word"}
                        </Typography>
                    </Box>

                    <IconButton color="primary" onClick={handleCreate} aria-label="create">
                        <AddIcon />
                    </IconButton>

                    <IconButton color="info" onClick={handleUpdate} aria-label="update">
                        <EditIcon />
                    </IconButton>

                    <IconButton color="warning" onClick={handleCancel} aria-label="cancel">
                        <ClearIcon />
                    </IconButton>

                    <IconButton color="error" onClick={handleDelete} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>

                </Stack>

            </Paper>

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