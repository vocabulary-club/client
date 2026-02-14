import React from 'react';
import ApiService from "../services/ApiService";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Paper, Stack, Typography,
    Radio, RadioGroup, 
    FormControlLabel, FormControl, 
    ToggleButton, ToggleButtonGroup, Divider, 
    InputLabel, Select, MenuItem,
    LinearProgress  } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import WordSelectBox from "../components/MySelectBox.js";

export default function Test1() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const originDataRef = React.useRef([]);
    const shuffledDataRef = React.useRef([]);
    const finishedDataRef = React.useRef([]);
    const shuffledIdxRef = React.useRef(0);

    const [action, setAction] = React.useState("stop");          // start, stop
    const [limit, setLimit] = React.useState("r10");    // last 10, rand 10, last 50, rand 50
    const [lang, setLang] = React.useState("word");          // word, definition
    const [time, setTime] = React.useState(3);               // 2, 3

    const [testWord, setTestWord] = React.useState("");
    const [progress, setProgress] = React.useState(0);

    const intervalIdRef = React.useRef(null);

    const [dataList, setDataList] = React.useState([]);
    const [dateGroup, setDateGroup] = React.useState([]);

    React.useEffect(() => {

        getData();
        getDateGroup();

    }, []);

    React.useEffect(() => {
        if (action === "start") {
            
            reShuffle();

            finishedDataRef.current = [];
            shuffledIdxRef.current = 0;
            setProgress(0);

            myTask();
            if (!intervalIdRef.current) {
                intervalIdRef.current = setInterval(() => { 
                    myTask(); 
                }, time * 1000);
            }            

        } else {
            setDataList(finishedDataRef.current);
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

        if (lang === "word") {
            setTestWord(currData?.word || "");
        } else {
            setTestWord(currData?.definition || "");
        }

        finishedDataRef.current = [...finishedDataRef.current, currData];
        shuffledIdxRef.current = currIndex + 1;

        const percent = ((currIndex + 1) / shuffledDataRef.current.length) * 100;
        setProgress(percent);
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

    const getDateGroup = () => {return;
        ApiService.request("/api/test/selectDate", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setDateGroup(data);
            })
            .catch((error) => {
                console.error("Request failed:", error.message);
            });
    };

    const reShuffle = () => {
        if (limit.includes("l10")) {
            shuffledDataRef.current = shuffle(originDataRef.current.slice(0, 10));
        } else if(limit.includes("l50")) {
            shuffledDataRef.current = shuffle(originDataRef.current.slice(0, 50));
        } else if(limit.includes("r10")) {
            shuffledDataRef.current = shuffle(originDataRef.current).slice(0, 10);
        } else if(limit.includes("r50")) {
            shuffledDataRef.current = shuffle(originDataRef.current).slice(0, 50);
        } else {
            shuffledDataRef.current = shuffle(originDataRef.current.filter(x => x.reg_ymd === limit));
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

    const columns = [
        { field: "word", headerName: "Word", flex: 1 },
        { field: "definition", headerName: "Definition", flex: 1 },
    ];

    return (
        <div className="content-layout">

            {/* Toolbar */}
            <Paper sx={{ p: 1, mb: 1 }}>

                <Stack direction={{ xs: "column", sm: "row" }}                    
                    alignItems={{ xs: "stretch", sm: "center" }}
                    spacing={{ xs: 2, sm: 1 }} >

                    <Stack direction="row" alignItems="center" spacing={1}>

                        {/* ACTION */}
                        <ToggleButtonGroup
                            exclusive
                            value={action}
                            onChange={(e, val) => val && setAction(val)}
                            size="small"
                        >
                            <ToggleButton value="start">
                                Start
                            </ToggleButton>

                            <ToggleButton value="stop">
                                Stop
                            </ToggleButton>
                        </ToggleButtonGroup>

                        {/* LANGUAGE */}
                        <ToggleButtonGroup
                            exclusive
                            value={lang}
                            onChange={(e, val) => val && setLang(val)}
                            size="small"
                            >
                            <ToggleButton value="word">
                                Word
                            </ToggleButton>

                            <ToggleButton value="definition">
                                Meaning
                            </ToggleButton>
                        </ToggleButtonGroup>

                    </Stack>

                    {/* LIMIT */}
                    <WordSelectBox limit={limit} setLimit={setLimit} dateGroup={dateGroup} />

                    {/* TIME */}
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Choose Time</InputLabel>
                    <Select
                        label="Choose Time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    >
                        <MenuItem value={2}>2 seconds</MenuItem>
                        <MenuItem value={3}>3 seconds</MenuItem>
                        <MenuItem value={4}>4 seconds</MenuItem>
                        <MenuItem value={5}>5 seconds</MenuItem>
                        <MenuItem value={10}>10 seconds</MenuItem>
                    </Select>
                    </FormControl>

                </Stack>
            </Paper>

            {action === "start" ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                        py: 2
                    }}
                    >
                    <Typography fontSize={48}>{testWord}</Typography>
                    <Box sx={{ width: "100%", mt: 2 }}>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{ height: 10, borderRadius: 5 }}
                        />
                    </Box>

                </Box>
            ) : (
                <Box 
                    sx={{ 
                        flex: 1, minHeight: 0, height: "100%", 
                        display: "flex",
                    }}>
                    <DataGrid
                        getRowId={(row) => row.mean_id || null}
                        rows={dataList}
                        columns={columns}
                        disableColumnMenu
                        checkboxSelection={false}
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
            )}

        </div>
    );  
        
}