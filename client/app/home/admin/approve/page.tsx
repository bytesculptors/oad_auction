'use client';
import { ProductCard } from '@/components';
import ProductData from '@/data/ProductData';
import React, { useState } from 'react';

const Approve = () => {
    // const [product, setProduct] = useState('');
    const filterProduct = ProductData.filter((item) => {
        const productName = item.name.toLowerCase();
        return productName;
    });
    return (
        <div className="w-5/6 bg-slate-300 ">
            <div className="w-2/6 mx-auto mt-4">
                <ProductCard item={filterProduct[0]} buttonTitle="Approve" />
            </div>
        </div>
    );
};

export default Approve;
