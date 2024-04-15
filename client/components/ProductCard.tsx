'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ProductProps } from '@/types';
import CustomButton from './CustomButton';

interface ProductCardProps {
    item: ProductProps;
}

const ProductCard = ({ item }: ProductCardProps) => {
    const { name, imageUrl, price, category, material, condition, origin } = item;
    return (
        <div className="car-card group">
            <div className="car-card__content">
                <h2 className="car-card__content-title">
                    {name} {origin}
                </h2>
            </div>
            <p className="flex mt-6 text-[32px] font-extrabold">
                <span className="self-start text-[14px] font-semibold">${price}</span>
            </p>
            <div className="relative w-full h-40 my-3 object-contain">
                <Image src={imageUrl} alt="product model" fill priority className="object-contain" />
            </div>

            <div className="relative flex w-full mt-2">
                <div className="flex group-hover:invisible w-full justify-between text-gray">
                    <div className="flex flex-col justify-center items-center gap-2"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
