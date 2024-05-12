'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { getProductForUserApi } from '@/api/searchApi';
import IProduct from '@/api/searchApi';
import { ProductCard } from '@/components';

export default function page() {
    const [productList, setProductList] = useState<IProduct[]>([]);
    const handleGetProduct = async () => {
        try {
            const response = await getProductForUserApi();
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
    useEffect(() => {
        handleGetProduct();
    }, []);
    useEffect(() => {
        console.log('Search results updated:', productList);
    }, [productList]);
    return (
        <section>
            <div className="home__cars-wrapper">
                {productList.map((item) => (
                    <ProductCard key={item._id} item={item.product} />
                ))}
            </div>
        </section>
    );
}
