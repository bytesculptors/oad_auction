'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { IProductUser, getProductForUserApi } from '@/api/searchApi';
import IProduct from '@/api/searchApi';
import { ProductCard } from '@/components';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/Store';
import { useRouter } from 'next/navigation';

export default function page() {
    const [productList, setProductList] = useState<IProductUser[]>([]);
    const [status, setStatus] = useState<number | null>(null);
    const router = useRouter();
    const handleChange = (event: SelectChangeEvent) => {
        setStatus(parseInt(event.target.value, 10) as number);
    };
    const stateUser = useSelector((state: RootState) => state.reducerUser);

    const handleGetProduct = async (status: any) => {
        try {
            const response = await getProductForUserApi(stateUser._id, status);
            if (response.status === 200) {
                console.log(response.data);
                setProductList(response.data);
            } else {
                console.error('Error fetching products:', response.status);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAccessBiddingRoom = (idSession: string) => {
        router.push(`/bid/${idSession}`);
    };
    useEffect(() => {
        handleGetProduct(status);
    }, [status]);
    useEffect(() => {
        console.log('Search results updated:', productList);
    }, [productList]);
    return (
        <div>
            <Box sx={{ minWidth: 120, padding: 5 }}>
                <FormControl className="w-72">
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status !== null ? status.toString() : ''}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>Applied</MenuItem>
                        <MenuItem value={1}>Won not paying</MenuItem>
                        <MenuItem value={2}>Won paid</MenuItem>
                        <MenuItem value={3}>Lost</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <section className="mx-5">
                <div className="home__cars-wrapper">
                    {productList.length === 0 ? (
                        <div>
                            <h2 className="text-black text-xl font-bold">Oops, no results!!</h2>
                        </div>
                    ) : (
                        productList.map((item) => {
                            return (
                                <div>
                                    {item.product.statusUser === 'Applied' ? (
                                        <ProductCard
                                            key={item._id}
                                            item={item.product}
                                            buttonTitle="Access Bidding Room"
                                            onhandleButton2={() => {
                                                handleAccessBiddingRoom(item._id);
                                            }}
                                        />
                                    ) : item.product.statusUser === 'Won not paying' ? (
                                        <ProductCard key={item._id} item={item.product} buttonTitle="Pay" />
                                    ) : item.product.statusUser === 'Won paid' ? (
                                        <ProductCard key={item._id} item={item.product} buttonTitle="You win" />
                                    ) : (
                                        <ProductCard key={item._id} item={item.product} buttonTitle="Loser" />
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </section>
        </div>
    );
}
