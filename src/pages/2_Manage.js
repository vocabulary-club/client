import React from 'react';
import ApiService from "../services/ApiService";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { Modal, Box, Typography, TextField, Button, Stack, Paper, IconButton, } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

import { useLang } from "../contexts/LangContext";
import { Languages } from "../components/Language";

const MenuItem = ({ icon, label, onClick, color }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                height: "100%",
            }}
        >
            <IconButton sx={{ p: 0.5 }} size="small" color={color} >
                {icon || null}
            </IconButton>
            <Typography variant="caption" sx={{ fontSize: 12, lineHeight: 1, }}>
                {label}
            </Typography>
        </Box>
    );
};

export default function Manage() {

    const { lang, setLang } = useLang();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [searchText, setSearchText] = React.useState("");
    const [dataList, setDataList] = React.useState([]);
    
    const [selectionModel, setSelectionModel] = React.useState({ type: 'include', ids: new Set(), });

    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState("");

    const [word, setWord] = React.useState("");
    const [definition, setDefinition] = React.useState("");

    const updateRef = React.useRef(0);

    React.useEffect(() => {
        const handleKeyDown = (e) => {

            // CTRL + SPACE
            if (e.ctrlKey && e.code === "Space") {
                e.preventDefault();
                handleCreate();
            }

            // ESC
            if (e.key === "Escape") {
                e.preventDefault();
                setModalOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    React.useEffect(() => {

        getData();

        return () => { };
    }, []);
    
    const handleCreate = (e) => {

        setSelectionModel({ type: 'include', ids: new Set(), });

        setWord("");
        setDefinition("");
        setModalTitle(Languages[lang].addNewWord);
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
            alert(Languages[lang].selectFirst);
            return;
        }

        const selectedRow = getSelectedRow();        
        if (!selectedRow) return;

        setWord(selectedRow.word);
        setDefinition(selectedRow.definition);
        setModalTitle(Languages[lang].fixOldWord);
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
            alert(Languages[lang].selectFirst);
            return;
        }

        const selectedRow = getSelectedRow();        
        if (!selectedRow) return;
 
        if(window.confirm(Languages[lang].deleteQuesion)) {
            const data = {
                meanId : selectedRow.mean_id,
                wordId : selectedRow.word_id,
            };
            ApiService.request("/api/manage/delete", {
                method: "POST",
                body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => { getData(); })
            .catch((error) => { alert(Languages[lang].failed); });
        }
    }

    const handleModalSave = (e) => {

        if(!word || !definition) {
            alert(Languages[lang].enterWords);
            return;
        }

        const data = {
            word : word,
            definition : definition,
        };

        let url = "/create";
        if(updateRef.current === 1) { 
            url = "/update"; 
            
            const selectedRow = getSelectedRow();
            data.wordId = selectedRow.word_id;
            data.meanId = selectedRow.mean_id;
        }

        ApiService.request("/api/manage" + url, {
            method: "POST",
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => { getData(); })
        .catch((error) => { alert(Languages[lang].failed); });

        setModalOpen(false);
    }

    const getData = () => {
        ApiService.request("/api/manage/selectByUserId", {
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
        return dataList.find(r => r.word_id === id);
    };

    const columns = [
        { field: "word", headerName: "English", flex: 1 },
        { field: "definition", headerName: "Mongolian", flex: 1 },
    ];

    const filteredList = React.useMemo(() => {
        return dataList.filter((item) => {
            if (!searchText) return true;
            return (
                item.word.toLowerCase().includes(searchText) ||
                item.definition.toLowerCase().includes(searchText)
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

                <Stack direction={{ xs: "column", sm: "row" }}                    
                    alignItems={{ xs: "stretch", sm: "center" }}
                    spacing={1} >

                    <TextField size="small" label={Languages[lang].search}
                        value={searchText} onChange={handleSearch}
                        sx={{ width: { xs: "100%", sm: 256 } }} />

                    <Stack direction="row" spacing={1} flexWrap="wrap">

                        {isMobile ? (
                            <Stack direction="row" spacing={1}>
                                {/* <MenuItem icon={<AddIcon />} label={"New Word"} onClick={(e) => handleCreate(e)} color="primary"/>
                                <MenuItem icon={<EditIcon />} label={"Fix Word"} onClick={(e) => handleUpdate(e)} color="info"/>
                                <MenuItem icon={<ClearIcon />} label={"Cancel"} onClick={(e) => handleCancel(e)} color="warning"/>
                                <MenuItem icon={<DeleteIcon />} label={"Delete"} onClick={(e) => handleDelete(e)} color="error"/> */}
                                <Button variant="contained" sx={{ width: 80, fontSize: 12, }} onClick={handleCreate} >{Languages[lang].addWord}</Button>
                                <Button variant="contained" sx={{ width: 80, fontSize: 12, }} onClick={handleUpdate} >{Languages[lang].fixWord}</Button>
                                <Button variant="contained" sx={{ width: 80, fontSize: 12, }} onClick={handleCancel} >{Languages[lang].cancel}</Button>
                                <Button variant="contained" sx={{ width: 80, fontSize: 12, }} onClick={handleDelete} >{Languages[lang].delete}</Button>
                            </Stack>
                            ) : (
                            <Stack direction="row" spacing={1}>
                                <Button variant="contained" sx={{ width: 120 }} onClick={handleCreate} >{Languages[lang].addWord}</Button>
                                <Button variant="contained" sx={{ width: 120 }} onClick={handleUpdate} >{Languages[lang].fixWord}</Button>
                                <Button variant="contained" sx={{ width: 120 }} onClick={handleCancel} >{Languages[lang].cancel}</Button>
                                <Button variant="contained" sx={{ width: 120 }} onClick={handleDelete} >{Languages[lang].delete}</Button>
                            </Stack>                            
                        )}

                    </Stack>

                </Stack>

            </Paper>

            <Box sx={{ flex: 1, minHeight: 0, height: "100%", }}>
                <DataGrid
                    getRowId={(row) => row.word_id || null}
                    rows={filteredList}
                    columns={columns}
                    disableColumnMenu
                    checkboxSelection={true}
                    rowSelectionModel={selectionModel}
                    onRowSelectionModelChange={handleCheckBoxClick}
                    sx={{
                        '& .MuiDataGrid-cell': {
                            whiteSpace: 'normal !important',
                            wordBreak: 'break-word',
                            lineHeight: '1.4 !important',
                            display: 'flex',
                            alignItems: 'center',   // top align
                            py: 1,
                        },
                    }}
                    getRowHeight={() => 'auto'}
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
                    <TextField placeholder="English" fullWidth value={word} onChange={(e) => setWord(e.target.value)} autoFocus />
                    <TextField placeholder="Mongolian" fullWidth value={definition} onChange={(e) => setDefinition(e.target.value)}/>
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