'use client';
import { approveProduct } from '@/api/approveApi';
import { adminGetProduct } from '@/api/productApi';
import { ProductCard } from '@/components';
import ProductData from '@/data/ProductData';
import { ProductProps } from '@/types';
import { IProductWithSeller } from '@/types/product.type';
import { Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Approve = () => {
    // const [product, setProduct] = useState('');
    const [productsApprove, setProductsApprove] = useState<IProductWithSeller[]>();
    const handleAprove = async (_id: string, sellerId: string, productId: string) => {
        const response = await approveProduct(
            {
                _id: _id,
                sellerId: sellerId,
                productId: productId,
            },
            2,
        );

        if (response.status === 200) {
            handleResetApi();
            toast.success(response.message, {
                position: 'top-center',
            });
        } else {
            toast.error(response.message, {
                position: 'top-center',
            });
        }
    };
    const handleResetApi = async () => {
        const response = await adminGetProduct(1);
        if (response.status === 200) {
            var _productsApprove: IProductWithSeller[] = [];
            response.data.map((item) => {
                if (item.product) {
                    _productsApprove.push({
                        _id: item._id,
                        duration: item.duration,
                        startTime: item.startTime,
                        status: item.status,
                        product: {
                            category: item.product.category,
                            color: item.product.color,
                            condition: item.product.condition,
                            description: item.product.description,
                            dimension: item.product.dimension,
                            image: item.product.image,
                            manufacturer: item.product.manufacturer,
                            material: item.product.material,
                            name: item.product.name,
                            origin: item.product.origin,
                            price: item.product.price,
                            style: item.product.style,
                            weight: item.product.weight,
                            year: item.product.year,
                            _id: item.product._id,
                            deposit: item.product.deposit,
                        },
                        sellerId: {
                            _id: item.sellerId._id,
                            name: item.sellerId.name,
                        },
                    });
                }
            });
            setProductsApprove(_productsApprove);
        }
    };

    useEffect(() => {
        handleResetApi();
    }, []);
    return (
        <div className="w-5/6 bg-slate-200 flex flex-row-reverse ">
            <div className="flex flex-col">
                <Paper className="flex flex-row justify-end gap-3 p-3 m-2">
                    <button onClick={handleResetApi}>
                        <FiRefreshCcw />
                    </button>
                    <TextField id="outlined-basic" label="Search" variant="outlined" />
                </Paper>
                <Paper className=" p-3 m-2">
                    <Typography id="modal-modal-title" variant="h6" component="h5" aria-multiline>
                        Bạn có {productsApprove?.length} sản phẩm chưa chấp thuận lên sàn
                    </Typography>
                </Paper>
            </div>

            <div
                className="w-3/6 mx-auto mt-2"
                style={{
                    maxHeight: 500,
                    overflowY: 'auto',
                }}
            >
                {productsApprove &&
                    productsApprove?.map((product) => {
                        return (
                            <Paper className="mt-5 p-5 flex flex-col justify-center items-center border-y-2">
                                <div className="flex flex-row justify-start items-start ">
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Seller : {product.sellerId.name}
                                    </Typography>
                                </div>
                                <ProductCard
                                    item={product.product}
                                    buttonTitle="Approve"
                                    onhandleButton2={async () => {
                                        await handleAprove(product._id, product.sellerId._id, product.product._id);
                                    }}
                                />
                            </Paper>
                        );
                    })}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Approve;
