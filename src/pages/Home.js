import "../styles/style.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";

// MUI Components
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

export default function Home() {

    const [value, setValue] = useState("last");
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, [value]);

    const fetchData = () => {

        const data = { "day" : value, };
        ApiService.request("/", {
            auth: false,
            method: "POST",
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setRows(data);
            })
            .catch((error) => {
                console.error("Request failed:", error.message);
            });
    };

    const handleChange = (event) => {
        setValue(event.target.value);
        console.info("Selected value:", event.target.value);
    };

    const columns = [
        { field: 'eng_word', headerName: 'English', width: 130 },
        { field: 'mon_word', headerName: 'Mongolian', width: 130 },
    ];

    const paginationModel = { page: 0, pageSize: 50 };
    
    return (
        <div>
            <div>
                <FormControl>
                    <RadioGroup
                        row
                        name="radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="last" control={<Radio />} label="Last Day" className="radio-item"/>
                        <FormControlLabel value="second last" control={<Radio />} label="A Day Before" className="radio-item"/>
                        <FormControlLabel value="third last" control={<Radio />} label="2 Days Before" className="radio-item"/>

                    </RadioGroup>
                </FormControl>
            </div>
            <div>
                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        checkboxSelection
                        sx={{ border: 0 }}
                        getRowId={(row) => row.dic_id}
                    />
                </Paper>
            </div>
        </div>
    );
}