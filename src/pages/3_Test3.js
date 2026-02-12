import React from 'react';
import ApiService from "../services/ApiService";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Paper, Stack, Typography,
    Radio, RadioGroup, 
    FormControlLabel, FormControl, 
    ToggleButton, ToggleButtonGroup, Divider, 
    InputLabel, Select, MenuItem,
    LinearProgress, Button, 
    List, ListItemButton, ListItemText  } from "@mui/material";

import { useTheme, useMediaQuery } from "@mui/material";

export default function Test3() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const originDataRef = React.useRef([]);
    const shuffledDataRef = React.useRef([]);
    const finishedDataRef = React.useRef([]);
    const shuffledIdxRef = React.useRef(0);

    const [action, setAction] = React.useState("stop");          // start, stop
    const [limit, setLimit] = React.useState("r10");    // last 10, rand 10, last 50, rand 50
    const [lang, setLang] = React.useState("word");          // word, definition

    const [testWord, setTestWord] = React.useState("");
    const [progress, setProgress] = React.useState(0);
    const [answer, setAnswer] = React.useState(null);
    const [result, setResult] = React.useState("");
    
    const [answer0, setAnswer0] = React.useState("answer1");
    const [answer1, setAnswer1] = React.useState("answer2");
    const [answer2, setAnswer2] = React.useState("answer3");
    const [answer3, setAnswer3] = React.useState("answer4");

    const [dataList, setDataList] = React.useState([]);

    React.useEffect(() => {
        
        getData();
        
    }, []);

    React.useEffect(() => {
        if (action === "start") {
            
            reShuffle();

            finishedDataRef.current = [];
            shuffledIdxRef.current = 0;

            myNext();       

        } else {
            setDataList(finishedDataRef.current);
        }

        return () => { }
    }, [action]);

    const handleAnswer = (value) => {

        setAnswer(value);

        const answer = shuffledDataRef.current[shuffledIdxRef.current - 1].answer[parseInt(value, 10)];
        
        if(answer.mean_id === shuffledDataRef.current[shuffledIdxRef.current - 1].mean_id) {
            setResult("correct");
            if(!finishedDataRef.current[shuffledIdxRef.current - 1].result) {
                finishedDataRef.current[shuffledIdxRef.current - 1].result = "correct";					
            }
        } else {
            setResult("wrong");
            if(!finishedDataRef.current[shuffledIdxRef.current - 1].result) {
                finishedDataRef.current[shuffledIdxRef.current - 1].result = "wrong";
            }
        }
    }

    const handleNext = (e) => {

        setAnswer(null);

        setResult("");

        myNext();
    }

    const myNext = () => {
    
        const currIndex = shuffledIdxRef.current;
        if (currIndex >= shuffledDataRef.current.length) {
            setAction("stop");
            return ;
        }

        const currData = shuffledDataRef.current[currIndex];

        if (lang === "word") {
            setTestWord(currData?.word || "");
            setAnswer0(currData?.answer[0]?.definition || "");
            setAnswer1(currData?.answer[1]?.definition || "");
            setAnswer2(currData?.answer[2]?.definition || "");
            setAnswer3(currData?.answer[3]?.definition || "");            
        } else {
            setTestWord(currData?.definition || "");
            setAnswer0(currData?.answer[0]?.word || "");
            setAnswer1(currData?.answer[1]?.word || "");
            setAnswer2(currData?.answer[2]?.word || "");
            setAnswer3(currData?.answer[3]?.word || "");
        }

        finishedDataRef.current = [...finishedDataRef.current, currData];
        shuffledIdxRef.current = currIndex + 1;

        const percent = ((currIndex) / shuffledDataRef.current.length) * 100;
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

    const reShuffle = () => {
        if (limit.includes("l10")) {
            shuffledDataRef.current = shuffle(originDataRef.current.slice(0, 10));
        } else if(limit.includes("l50")) {
            shuffledDataRef.current = shuffle(originDataRef.current.slice(0, 50));
        } else if(limit.includes("r10")) {
            shuffledDataRef.current = shuffle(originDataRef.current).slice(0, 10);
        } else if(limit.includes("r50")) {
            shuffledDataRef.current = shuffle(originDataRef.current).slice(0, 50);
        }

        shuffledDataRef.current.forEach((item, index) => {

            let answer = shuffle(originDataRef.current).slice(0, 4);            
            if(answer.find((x) => x.mean_id === item.mean_id)) {
                
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
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>Choose words</InputLabel>
                    <Select
                        label="Choose words"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                    >
                        <MenuItem value="l10">Latest 10 words</MenuItem>
                        <MenuItem value="r10">Random 10 words</MenuItem>
                        <MenuItem value="l50">Latest 50 words</MenuItem>
                        <MenuItem value="r50">Random 50 words</MenuItem>
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

                    <Box sx={{ width: "100%" }}>
                        <List sx={{ p: 0 }}>

                            <ListItemButton
                                selected={answer === "0"}
                                onClick={() => handleAnswer("0")}
                                sx={{
                                    mb: 1,
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "divider"
                                }}
                                >
                                <ListItemText primary={answer0} />
                            </ListItemButton>

                            <ListItemButton
                                selected={answer === "1"}
                                onClick={() => handleAnswer("1")}
                                sx={{
                                    mb: 1,
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "divider"
                                }}
                                >
                                <ListItemText primary={answer1} />
                            </ListItemButton>

                            <ListItemButton
                                selected={answer === "2"}
                                onClick={() => handleAnswer("2")}
                                sx={{
                                    mb: 1,
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "divider"
                                }}
                                >
                                <ListItemText primary={answer2} />
                            </ListItemButton>

                            <ListItemButton
                                selected={answer === "3"}
                                onClick={() => handleAnswer("3")}
                                sx={{
                                    mb: 1,
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "divider"
                                }}
                                >
                                <ListItemText primary={answer3} />
                            </ListItemButton>

                        </List>
                    </Box>

                    <Button variant="contained" sx={{ width: 80, fontSize: 12, }} onClick={handleNext} >Next</Button>

                    <Box sx={{ width: "100%", mt: 2 }}>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{ height: 10, borderRadius: 5 }}
                        />
                    </Box>

                    <Typography fontSize={24}>{result}</Typography>

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
                        getRowClassName={(params) => {
                            if (params.row.result === "correct") return "row-correct";
                            if (params.row.result === "wrong") return "row-wrong";
                            return "";
                        }}
                        sx={{
                            "& .row-correct": {
                                bgcolor: "success.light",
                                "&:hover": { bgcolor: "success.main" },
                            },
                            "& .row-wrong": {
                                bgcolor: "error.light",
                                "&:hover": { bgcolor: "error.main" },
                            },
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