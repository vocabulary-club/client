import React from 'react';
import ApiService from "../services/ApiService";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Paper, Stack, Radio, RadioGroup, FormControlLabel, FormControl, ToggleButton, ToggleButtonGroup, } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

import { useLang } from "../contexts/LangContext";
import { Languages } from "../components/Language";

export default function Home() {

    const { lang, setLang } = useLang();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [dayVal, setDayVal] = React.useState("last");

    const [dataList, setDataList] = React.useState([]);

    React.useEffect(() => {
        
        getData();

    }, [dayVal]);

    const getData = () => {

        const data = { "day" : dayVal, };
        ApiService.request("/", {
            // auth: false,
            method: "POST",
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {         
                setDataList(data);
            })
            .catch((error) => {
                console.error("Request failed:", error.message);
            });
    };

    const columns = [
        { field: "eng_word", headerName: "English", flex: 1 },
        { field: "mon_word", headerName: "Mongolian", flex: 1 },
    ];
    
    return (
        <div className="content-layout">

            {/* Toolbar */}
            <Paper sx={{ p: 1, mb: 1 }}>

                {isMobile ? (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <ToggleButtonGroup
                            exclusive
                            value={dayVal}
                            onChange={(e, val) => val && setDayVal(val)}
                            size="small"                            
                        >
                            <ToggleButton value="last" sx={{ fontSize: 12 }} >{Languages[lang].lastDay}</ToggleButton>
                            <ToggleButton value="second last" sx={{ fontSize: 12 }} >{Languages[lang].aDayBefore}</ToggleButton>
                            <ToggleButton value="third last" sx={{ fontSize: 12 }} >{Languages[lang].twoDaysBefore}</ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                    ) : (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <FormControl>
                            <RadioGroup row name="day" value={dayVal} onChange={(e) => setDayVal(e.target.value)} >
                                <FormControlLabel value="last" control={<Radio />} label={Languages[lang].lastDay} />
                                <FormControlLabel value="second last" control={<Radio />} label={Languages[lang].aDayBefore} />
                                <FormControlLabel value="third last" control={<Radio />} label={Languages[lang].twoDaysBefore} />
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                )}

            </Paper>

            <Box sx={{ flex: 1, minHeight: 0, height: "100%", }}>
                <DataGrid
                    getRowId={(row) => row.dic_id || null}
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

        </div>
    );
}