'use client';
import React, { useEffect, useState } from 'react';
import { Table, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getProductByIdSeller } from '@/api/productApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/Store';
import { FiRefreshCcw } from 'react-icons/fi';
import { IProduct } from '@/types/product.type';
import StickyHeadTable from '@/components/table/StickyHeadTable';

interface Column {
    id: 'id' | 'name' | 'description' | 'price' | 'category' | 'status';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

interface Data {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    status: string;
}

export default function SellerProducts() {
    const stateUser = useSelector((state: RootState) => state.reducerUser);
    const [productList, setProductList] = useState<Data[]>([]);
    const [sort, setSort] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSort(event.target.value as string);
    };

    const columns: readonly Column[] = [
        { id: 'id', label: 'Id', minWidth: 50 },
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'description', label: 'Description', minWidth: 170 },
        { id: 'price', label: 'Price', minWidth: 170 },
        { id: 'category', label: 'Category', minWidth: 170 },
        { id: 'status', label: 'Status', minWidth: 170 },
    ];

    const handleResetApi = async () => {
        const response = await getProductByIdSeller({
            sellerId: stateUser._id,
        });

        if (response.status === 200) {
            var _productList: Data[] = [];
            response.data.map((item) => {
                if (item.product) {
                    var status = 'null';
                    if (item.status === 0) {
                        status = 'Inactive';
                    } else if (item.status === 1) {
                        status = 'Pending';
                    } else if (item.status === 2) {
                        status = 'Active';
                    } else if (item.status === 3) {
                        status = 'Deny';
                    } else if (item.status === 4) {
                        status = 'Bidding';
                    } else if (item.status === 5) {
                        status = 'Sold';
                    }
                    _productList.push({
                        category: item.product.category,
                        description: item.product.description,
                        id: item._id,
                        name: item.product.name,
                        price: item.product.price,
                        status: status,
                    });
                }
            });
            setProductList(_productList);
        }
    };

    useEffect(() => {
        handleResetApi();
    }, []);

    return (
        <div className="w-5/6">
            <Box sx={{ minWidth: 120, padding: 5 }}>
                <div className="flex flex-row justify-end gap-3">
                    <button onClick={handleResetApi}>
                        <FiRefreshCcw />
                    </button>
                    <TextField id="outlined-basic" label="Search" variant="outlined" />
                    <FormControl className="w-1/5">
                        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sort}
                            label="Sort"
                            onChange={handleChange}
                        >
                            <MenuItem value={'id'}>Id</MenuItem>
                            <MenuItem value={'name'}>Name</MenuItem>
                            <MenuItem value={'description'}>Description</MenuItem>
                            <MenuItem value={'price'}>Price</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </Box>

            <StickyHeadTable columns={columns} rows={productList} />
        </div>
    );
}
