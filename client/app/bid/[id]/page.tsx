'use client';
import AuctionProgress from '@/components/AuctionProgress';
import DummyBid from '@/components/DummyBid';
import TimeCountDown from '@/components/TimeCountDown';
import _AuctionProgressData from '@/data/AuctionProgressData';
import ProductData from '@/data/ProductData';
import { IAuctionProgress, IDataAuctionProgress } from '@/types/AuctionProgress.type';
import { ITime } from '@/types/Time.type';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Grid, Input, TextField } from '@mui/material';
import ViewMode from '@/components/bidding/core/ViewMode';
import { IProductItem } from '@/types/bid.type';
import table_lamp from '../../../assets/images/table_lamp.jpg';
import ProductItem from '@/components/bidding/ProductItem';
const product: IProductItem = {
    name: 'Table Lamp',
    image: table_lamp,
    description:
        'Elegantly minimal, this Model 2552 brass table lamp was designed by Josef Frank for Svenskt Tenn. Outfitted with a cheery yellow fabric shade, this sleek lamp adds a modern touch to any bedside or living room. This lamp has been rewired to the highest standards in Los Angeles.',
    price: 150,
    category: 'Lighting',
    material: 'Brass, Glass',
    dimensions: '40cm x 40cm x 60cm',
    color: 'Gold',
    weight: 3.2,
    condition: 'Used',
    style: 'Antique',
    manufacturer: 'Vintage Lamps Co.',
    year: 1950,
    origin: 'Europe',
    deposit: 150,
};
const RoomDetail = () => {
    const [auctionProgreeData, setAuctionProgreeData] = useState<IDataAuctionProgress[]>([]);
    const [bidIncrement, setBidIncrement] = useState(5000000);
    const [timeBidIncrement, setTimeBidIncrement] = useState(1);
    const resultBid = useRef<HTMLParagraphElement>(null);

    const handleSummitBid = () => {
        toast.success(resultBid ? 'Success ' + resultBid.current?.textContent : 'Fault', {
            position: 'top-center',
        });
    };

    useEffect(() => {
        setAuctionProgreeData(_AuctionProgressData);
    }, []);

    const handleAddittion = () => {
        setTimeBidIncrement(timeBidIncrement + 1);
    };

    const handleSubtraction = () => {
        if (timeBidIncrement > 1) {
            setTimeBidIncrement(timeBidIncrement - 1);
        }
    };

    return (
        <div className="w-screen overflow-x-hidden bg-slate-100">
            <Grid container className="h-screen justify-between">
                <Grid
                    item
                    xs={8}
                    className="flex flex-col h-full overflow-hidden bg-white border-2  rounded-md border-gray-200"
                >
                    {/* <div className="mt-4 cursor-text text-xl flex flex-col justify-center items-center bg-blue-950 rounded-md border-green-400 border-2  text-center p-2 text-lime-600 ">
                        <p>Thời gian còn lại</p>
                        <div className="flex flex-row justify-center">
                            <div className="basis-1/6 ">
                                <p>48</p>
                                <p>phút</p>
                            </div>
                            <p className="basis-4/6 px-1">:</p>
                            <div className="basis-1/6">
                                <p>00</p>
                                <p>giây</p>
                            </div>
                        </div>
                    </div> */}
                    <Box display={'flex'} flexDirection={'column'} gap={4}>
                        <ProductItem {...product} />
                        <DummyBid
                            bid={auctionProgreeData[0] ? auctionProgreeData[0].bid : 0}
                            bidIncrement={bidIncrement}
                            time={timeBidIncrement}
                            onAddition={handleAddittion}
                            onSubtraction={handleSubtraction}
                            onSummitBid={handleSummitBid}
                            ref={resultBid}
                        />
                    </Box>
                </Grid>
                <ViewMode />
            </Grid>
            <ToastContainer />
        </div>
    );
};

export default RoomDetail;
