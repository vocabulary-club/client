import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, } from "@mui/material";

export default function WordSelectBox({limit, setLimit, dateGroup, }) {

    return (
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

                {/* Loop dateGroup */}
                {Array.isArray(dateGroup) && dateGroup.map((item, index) => (
                    <MenuItem
                        key={item.reg_ymd ?? index}
                        value={item.reg_ymd}
                    >
                        {item.reg_ymd + " words"}
                    </MenuItem>
                ))}

            </Select>
        </FormControl>
    );  
        
}