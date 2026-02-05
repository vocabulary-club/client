import React from 'react';
import ApiService from "../services/ApiService";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Paper, Stack, Radio, RadioGroup, FormControlLabel, FormControl, ToggleButton, ToggleButtonGroup, } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

export default function Home() {

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
                            <ToggleButton value="last" sx={{ fontSize: 12 }} >Last Day</ToggleButton>
                            <ToggleButton value="second last" sx={{ fontSize: 12 }} >A Day Before</ToggleButton>
                            <ToggleButton value="third last" sx={{ fontSize: 12 }} >2 Days Before</ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                    ) : (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <FormControl>
                            <RadioGroup row name="day" value={dayVal} onChange={(e) => setDayVal(e.target.value)} >
                                <FormControlLabel value="last" control={<Radio />} label="Last Day" />
                                <FormControlLabel value="second last" control={<Radio />} label="A Day Before" />
                                <FormControlLabel value="third last" control={<Radio />} label="2 Days Before" />
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
                />
            </Box>

        </div>
    );
}