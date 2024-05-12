'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ProductProps } from '@/types';
import CustomButton from './CustomButton';
import ProductDetail from './ProductDetail';

interface ProductCardProps {
    item: ProductProps;
}

const ProductCard = ({ item }: ProductCardProps) => {
    const { name, image, price, category, year, style, origin } = item;
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
                <Image src={image} alt="product model" fill priority className="object-contain" />
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
                <div className="car-card__btn-container flex">
                    <CustomButton
                        title="View More"
                        containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                        textStyles="text-white text-[14px] leading-[17px] font-bold"
                        rightIcon="/right-arrow.svg"
                        handleClick={() => setIsOpen(true)}
                    />
                    <CustomButton
                        title="Apply for auction"
                        containerStyles="w-full py-[16px] rounded-full border border-solid"
                        textStyles="text-black text-[14px] leading-[17px] font-bold"
                    />
                </div>
            </div>
            <ProductDetail isOpen={isOpen} closeModal={() => setIsOpen(false)} item={item} />
        </div>
    );
};

export default ProductCard;
