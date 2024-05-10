'use client';
import React, { useState } from 'react';
import { Table } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ProductMangement() {
    const [productList, setProductList] = useState([]);
    const [sort, setSort] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSort(event.target.value as string);
    };
    return (
        <div>
            <Box sx={{ minWidth: 120, padding: 5 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sort}
                        label="Sort"
                        onChange={handleChange}
                    >
                        <MenuItem value={'all'}>All</MenuItem>
                        <MenuItem value={'inactive'}>Inactive</MenuItem>
                        <MenuItem value={'pending'}>Pending</MenuItem>
                        <MenuItem value={'active'}>Active</MenuItem>
                        <MenuItem value={'deny'}>Deny</MenuItem>
                        <MenuItem value={'bidding'}>Bidding</MenuItem>
                        <MenuItem value={'sold'}>Sold</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Table style={{ margin: 5 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {productList.map((item) => {
                        return (
                            <tr>
                                {/* <td>{item.name}</td>
                                <td>{item.imageUrl}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>{item.description}</td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}
