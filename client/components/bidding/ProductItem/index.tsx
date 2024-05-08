import { IProductItem } from '@/types/bid.type';
import { Box } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

const ProductItem: FC<IProductItem> = ({ ...product }) => {
    return (
        <Box>
            <Image
                className="my-10 p-2 h-auto max-w-sm rounded-lg bg-sky-50 shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                src={product.image}
                width={300}
                height={300}
                alt="Picture of the author"
            />
        </Box>
    );
};

export default ProductItem;
