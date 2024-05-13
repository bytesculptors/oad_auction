'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { IProduct, getProductForUserApi } from '@/api/searchApi';
import { ProductCard } from '@/components';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/Store';
import { useRouter } from 'next/navigation';
import { payProduct } from '@/api/paymentApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

export default function page() {
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [status, setStatus] = useState(0);
    const router = useRouter();
    const handleChange = (event: SelectChangeEvent) => {
        // setStatus(parseInt(event.target.value, 10) as number);
        setStatus(parseInt(event.target.value));
    };
    const stateUser = useSelector((state: RootState) => state.reducerUser);

    const handleGetProduct = async (status: number) => {
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

    const handlePayProduct = async (idSession: string, idProduct: string, idUser: string) => {
        const response = await payProduct(
            {
                _id: idSession,
                productId: idProduct,
            },
            idUser,
        );
        if (response.status === 201) {
            toast.success('Success', {
                position: 'top-center',
            });
            setProductList((prev) => prev.filter((product) => product._id !== response._id));
        } else {
            toast.error(response.data?.message, {
                position: 'top-center',
            });
        }
    };

    useEffect(() => {
        if (stateUser?._id) handleGetProduct(status);
    }, [stateUser]);

    useEffect(() => {
        if (stateUser?._id) {
            handleGetProduct(status);
        }
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
                        defaultValue={'0'}
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
                <div className="">
                    {productList.length === 0 ? (
                        <div>
                            <h2 className="text-black text-xl font-bold">Oops, no results!!</h2>
                        </div>
                    ) : (
                        <div className="flex flex-row gap-2 flex-wrap">
                            {productList.map((item) => {
                                return (
                                    <div>
                                        {item.userStatus === 0 ? (
                                            <div>
                                                {/* count down */}
                                                <ProductCard
                                                    key={item.product._id}
                                                    item={item.product}
                                                    buttonTitle="Access Bidding Room"
                                                    onhandleButton2={() => {
                                                        handleAccessBiddingRoom(item._id);
                                                    }}
                                                />
                                            </div>
                                        ) : item.userStatus === 1 ? (
                                            <div>
                                                <ProductCard
                                                    key={item.product._id}
                                                    item={item.product}
                                                    buttonTitle="Pay"
                                                    onhandleButton2={() => {
                                                        handlePayProduct(item._id, item.product._id, stateUser._id);
                                                    }}
                                                />{' '}
                                            </div>
                                        ) : item.userStatus === 2 ? (
                                            <ProductCard
                                                key={item.product._id}
                                                item={item.product}
                                                buttonTitle="You win"
                                            />
                                        ) : (
                                            <ProductCard
                                                key={item.product._id}
                                                item={item.product}
                                                buttonTitle="Loser"
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
