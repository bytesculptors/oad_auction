import { MouseEventHandler } from 'react';

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: 'button' | 'submit';
    textStyles?: string;
    rightIcon?: string;
    isDisabled?: boolean;
}
export interface SearchProductProps {
    product: string;
    setProduct: (product: string) => void;
}
export interface OptionProps {
    title: string;
    value: string;
}
export interface CustomFilterProps {
    title: string;
    options: OptionProps[];
}

export interface ProductProps {
    name: string;
    image: any;
    description: string;
    price: number;
    category: string;
    material: string;
    dimension: string;
    color: string;
    weight: number;
    condition: string;
    style: string;
    manufacturer: string;
    year: number;
    origin: string;
}
