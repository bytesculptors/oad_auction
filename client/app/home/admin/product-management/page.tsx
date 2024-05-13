'use client';
import React, { useEffect, useState } from 'react';
import { Table, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { adminGetProduct, getProductByIdSeller } from '@/api/productApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/Store';
import { FiRefreshCcw } from 'react-icons/fi';
import { IProduct } from '@/types/product.type';
import StickyHeadTable, { Data } from '@/components/table/StickyHeadTable';

export default function AdminManagementProducts() {
    const stateUser = useSelector((state: RootState) => state.reducerUser);
    const [productList, setProductList] = useState<Data[]>([]);
    const [statusProduct, setStatusProduct] = useState('');

    const handleChangeStatusProduct = (event: SelectChangeEvent) => {
        setStatusProduct(event.target.value as string);
    };

    useEffect(() => {
        handleResetApi(parseInt(statusProduct));
    }, [statusProduct]);

    const handleResetApi = async (status?: number) => {
        const response = await adminGetProduct(status);

        if (response.status === 200) {
            var _productList: Data[] = [];
            response.data.map((item) => {
                if (item.product && item.sellerId) {
                    var status = 'null';
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
                        status = 'Paying';
                    } else if (item.status === 6) {
                        status = 'Sold';
                    }
                    _productList.push({
                        seller: item.sellerId.name,
                        category: item.product.category,
                        description: item.product.description,
                        id: item.product._id,
                        name: item.product.name,
                        price: item.product.price,
                        status: status,
                        action: 'edit',
                        image: item.product.image,
                        color: item.product.color,
                        condition: item.product.condition,
                        deposit: item.product.deposit,
                        dimension: item.product.dimension,
                        duration: item.duration,
                        manufacturer: item.product.manufacturer,
                        material: item.product.material,
                        origin: item.product.origin,
                        style: item.product.style,
                        weight: item.product.weight,
                        year: item.product.year,
                        startTime: item.startTime,
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
                    <button onClick={() => handleResetApi}>
                        <FiRefreshCcw />
                    </button>
                    <TextField id="outlined-basic" label="Search" variant="outlined" />
                    <FormControl className="w-1/5">
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={statusProduct}
                            label="Sort"
                            onChange={handleChangeStatusProduct}
                        >
                            <MenuItem value={'0'}>Inactive</MenuItem>
                            <MenuItem value={'1'}>Pending</MenuItem>
                            <MenuItem value={'2'}>Active</MenuItem>
                            <MenuItem value={'3'}>Deny</MenuItem>
                            <MenuItem value={'4'}>Bidding</MenuItem>
                            <MenuItem value={'5'}>Paying</MenuItem>
                            <MenuItem value={'6'}>Sold</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </Box>

            <StickyHeadTable rows={productList} role={stateUser.role} />
        </div>
    );
}
