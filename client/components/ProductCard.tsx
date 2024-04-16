'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ProductProps } from '@/types';
import CustomButton from './CustomButton';

interface ProductCardProps {
    item: ProductProps;
}

const ProductCard = ({ item }: ProductCardProps) => {
    const { name, imageUrl, price, category, year, style, origin } = item;
    const [isOpen, setIsOpen] = useState(false);
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
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image src="/category.svg" width={20} height={20} alt="steering wheel" />
                        <p className="text-[14px]">{category}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image src="/year.svg" width={20} height={20} alt="steering wheel" />
                        <p className="text-[14px]">{year}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image src="/style.svg" width={20} height={20} alt="steering wheel" />
                        <p className="text-[14px]">{style}</p>
                    </div>
                </div>
                <div className="car-card__btn-container">
                    <CustomButton
                        title="View More"
                        containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                        textStyles="text-white text-[14px] leading-[17px] font-bold"
                        rightIcon="/right-arrow.svg"
                        handleClick={() => setIsOpen(true)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
