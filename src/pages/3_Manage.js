import React from 'react';
import ApiService from "../services/ApiService";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { Modal, Box, Typography, TextField, Button, Stack, Paper, IconButton, } from "@mui/material";

export default function Manage() {

    const [searchText, setSearchText] = React.useState("");
    const [dataList, setDataList] = React.useState([]);
    
    const [selectionModel, setSelectionModel] = React.useState({ type: 'include', ids: new Set(), });

    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState("Add new word?");

    const [firstWord, setFirstWord] = React.useState("");
    const [secondWord, setSecondWord] = React.useState("");

    const updateRef = React.useRef(0);

    React.useEffect(() => {

        getData();

        return () => { };
    }, []);
    
    const handleCreate = (e) => {

        setSelectionModel({ type: 'include', ids: new Set(), });

        setFirstWord("");
        setSecondWord("");
        setModalTitle("Add new word?");
        setModalOpen(true);

        updateRef.current = 0;
    }
    
    const handleSearch = (e) => {

        const value = e.target.value.toLowerCase();
        setSearchText(value);
    }

    const handleUpdate = (e) => {

        const selectedId = [...selectionModel.ids][0];
        if (!selectedId) {
            alert("Please select a row first!");
            return;
        }

        const selectedRow = getSelectedRow();        
        if (!selectedRow) return;

        setFirstWord(selectedRow.eng_word);
        setSecondWord(selectedRow.mon_word);
        setModalTitle("Update old word?");
        setModalOpen(true);

        updateRef.current = 1;
    }
    
    const handleCancel = (e) => {
        
        setSelectionModel({ type: 'include', ids: new Set(), });
        setSearchText("");
    }
    
    const handleDelete = (e) => {

        const selectedId = [...selectionModel.ids][0];
        if (!selectedId) {
            alert("Please select a row first!");
            return;
        }

        const selectedRow = getSelectedRow();        
        if (!selectedRow) return;
 
        if(window.confirm("Are you sure to delete?")) {
            const data = {
                dic_id : selectedRow.dic_id,
                eng_id : selectedRow.eng_id,
                mon_id : selectedRow.mon_id,
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

    const handleModalSave = (e) => {

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
            
            const selectedRow = getSelectedRow();
            data.eng_id = selectedRow.eng_id;
            data.mon_id = selectedRow.mon_id;
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
                setDataList(data);
            })
            .catch((error) => {
                console.error("Request failed:", error.message);
            });
    };

    const getSelectedRow = () => {
        const id = [...selectionModel.ids][0];
        if (!id) return null;
        return dataList.find(r => r.dic_id === id);
    };

    const columns = [
        { field: "eng_word", headerName: "English", flex: 1 },
        { field: "mon_word", headerName: "Mongolian", flex: 1 },
    ];

    const filteredList = React.useMemo(() => {
        return dataList.filter((item) => {
            if (!searchText) return true;
            return (
                item.eng_word.toLowerCase().includes(searchText) ||
                item.mon_word.toLowerCase().includes(searchText)
            );
        });
    }, [searchText, dataList]);

    const handleCheckBoxClick = React.useCallback((newModel) => {
        const idsArray = [...newModel.ids];

        if (idsArray.length > 1) {
            const last = idsArray[idsArray.length - 1];
            setSelectionModel({ type: 'include', ids: new Set([last]), });
        } else if (idsArray.length === 1) {
            setSelectionModel(newModel);
        } else {
            setSelectionModel({ type: 'include', ids: new Set(), });
        }
    }, []);

    return (
        <div className="content-layout">

            {/* Toolbar */}
            <Paper sx={{ p: 1, mb: 1 }}>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    alignItems={{ xs: "stretch", sm: "center" }}
                    >

                    <TextField
                        sx={{ width: { xs: "100%", sm: 256 } }}
                        size="small" label="Search"
                        value={searchText} onChange={handleSearch}                        
                    />

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        
                        <Box
                            onClick={(e) => handleCreate(e)}
                            sx={{ display: "flex", flexDirection: "column", alignItems: "center", 
                                justifyContent: "center", cursor: "pointer", height: "100%", }}
                        >
                            <IconButton color="primary" size="small">
                                <AddIcon />
                            </IconButton>
                            <Typography variant="caption" sx={{ mt: -0.5, fontSize: 10, lineHeight: 1 }}>
                                {"New Word"}
                            </Typography>
                        </Box>

                        <Box
                            onClick={(e) => handleUpdate(e)}
                            sx={{ display: "flex", flexDirection: "column", alignItems: "center", 
                                justifyContent: "center", cursor: "pointer", height: "100%", }}
                        >
                            <IconButton color="info" size="small">
                                <EditIcon />
                            </IconButton>
                            <Typography variant="caption" sx={{ mt: -0.5, fontSize: 10, lineHeight: 1 }}>
                                {"Fix Word"}
                            </Typography>
                        </Box>

                        <Box
                            onClick={(e) => handleCancel(e)}
                            sx={{ display: "flex", flexDirection: "column", alignItems: "center", 
                                justifyContent: "center", cursor: "pointer", height: "100%", }}
                        >
                            <IconButton color="warning" size="small">
                                <ClearIcon />
                            </IconButton>
                            <Typography variant="caption" sx={{ mt: -0.5, fontSize: 10, lineHeight: 1 }}>
                                {"Cancel"}
                            </Typography>
                        </Box>

                        <Box
                            onClick={(e) => handleDelete(e)}
                            sx={{ display: "flex", flexDirection: "column", alignItems: "center", 
                                justifyContent: "center", cursor: "pointer", height: "100%", }}
                        >
                            <IconButton color="error" size="small">
                                <DeleteIcon />
                            </IconButton>
                            <Typography variant="caption" sx={{ mt: -0.5, fontSize: 10, lineHeight: 1 }}>
                                {"Delete"}
                            </Typography>
                        </Box>

                    </Stack>

                </Stack>

            </Paper>

            <Box sx={{ flex: 1, minHeight: 0, height: "100%", }}>
                <DataGrid
                    getRowId={(row) => row.dic_id || null}
                    rows={filteredList}
                    columns={columns}
                    disableColumnMenu
                    checkboxSelection={true}
                    rowSelectionModel={selectionModel}
                    onRowSelectionModelChange={handleCheckBoxClick}
                />
            </Box>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box
                    sx={{
                        width: 256, bgcolor: "background.paper", p: 3,
                        borderRadius: 2, m: "auto", mt: "20%",
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