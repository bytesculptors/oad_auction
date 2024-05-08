import { IProductItem } from '@/types/bid.type';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

const ProductItem: FC<IProductItem> = ({ ...product }) => {
    return (
        <Box display={'flex'} mx={2} mt={1} py={2} px={2} gap={4} bgcolor={'white'} borderRadius={3} boxShadow={2}>
            <Image
                className="rounded-lg bg-sky-50 shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                src={product.image}
                width={300}
                height={300}
                alt="Picture of the author"
            />
            <Box display={'flex'} flexDirection={'column'} gap={2}>
                <Typography variant="h3" fontWeight={600}>
                    {product.name}
                </Typography>
                <Typography variant="body1">{product.description}</Typography>
                <Typography variant="body1">Starting price: {product.price} VNĐ</Typography>
                <Typography variant="body1">Category: {product.category}</Typography>
                <Typography variant="body1">Year: {product.year}</Typography>
            </Box>
        </Box>
    );
};

export default ProductItem;
