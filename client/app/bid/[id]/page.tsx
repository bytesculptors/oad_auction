'use client';
import AuctionProgress from '@/components/AuctionProgress';
import DummyBid from '@/components/DummyBid';
import TimeCountDown from '@/components/TimeCountDown';
import _AuctionProgressData from '@/data/AuctionProgressData';
import ProductData from '@/data/ProductData';
import { IAuctionProgress, IDataAuctionProgress } from '@/types/AuctionProgress.type';
import { ITime } from '@/types/Time.type';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, Grid, Input, TextField, Typography } from '@mui/material';
import ViewMode from '@/components/bidding/core/ViewMode';
import { IProductItem } from '@/types/bid.type';
import table_lamp from '../../../assets/images/table_lamp.jpg';
import ProductItem from '@/components/bidding/ProductItem';
import { CountdownCircleTimer, TimeProps } from 'react-countdown-circle-timer';
import { formatColor, formatTime } from '@/utils/format';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/Store';
import { Socket } from 'socket.io-client';
import { SocketActions } from '@/redux/socket-client/socket.slice';
const fakeTime = new Date();
fakeTime.setHours(22, 45, 0, 0);
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
    duration: 10,
    timeStart: fakeTime,
};
const RoomDetail = () => {
    const [auctionProgreeData, setAuctionProgreeData] = useState<IDataAuctionProgress[]>([]);
    const [bidIncrement, setBidIncrement] = useState<number>(5000000);
    const [timeBidIncrement, setTimeBidIncrement] = useState(1);
    const [isSoon, setIsSoon] = useState<boolean | null>(null);
    const [currentPrice, setCurrentPrice] = useState<number>(product.deposit);
    const [currentBid, setCurrentBid] = useState<number>(product.deposit);
    const socket: Socket = useSelector((state: RootState) => state.reducerSocket.socket);
    const dispatch = useDispatch();
    const resultBid = useRef<HTMLParagraphElement>(null);

    const duration: number = useMemo(() => {
        if (isSoon) return (product.timeStart.getTime() - new Date().getTime()) / 1000;
        return product.duration * 60;
    }, [isSoon]);

    const handleSummitBid = () => {
        toast.success(resultBid ? 'Success ' + resultBid.current?.textContent : 'Fault', {
            position: 'top-center',
        });
    };

    useEffect(() => {
        dispatch(SocketActions.connectSocket());
        if (product.timeStart.getTime() - new Date().getTime() > 0) {
            setIsSoon(true);
        } else {
            setIsSoon(false);
        }
        setAuctionProgreeData(_AuctionProgressData);
        return () => {
            dispatch(SocketActions.disconnectSocket());
        };
    }, []);

    const IncreaseHandler = () => {
        setCurrentBid((prev) => prev + bidIncrement);
    };

    const DecreaseHandler = () => {
        setCurrentBid((prev) => {
            if (prev - bidIncrement < currentPrice) {
                return currentPrice;
            }
            return prev - bidIncrement;
        });
    };

    const timeHandler = ({ remainingTime }: TimeProps) => {
        if (remainingTime === 0 && isSoon === false) {
            return <div className="timer">Too lale...</div>;
        }
        if (remainingTime === 0 && isSoon === true) {
            setIsSoon(false);
        }

        return (
            <Box textAlign={'center'}>
                {isSoon && <Typography variant="h5">Remaining</Typography>}
                <Typography variant="h5">{formatTime(remainingTime)}</Typography>
            </Box>
        );
    };

    return (
        <div className="w-screen overflow-x-hidden bg-slate-100">
            <Grid container className="h-screen justify-between">
                <Grid
                    item
                    xs={8}
                    className="flex flex-col h-full overflow-hidden bg-white border-2  rounded-md border-gray-200"
                >
                    <Box display={'flex'} flexDirection={'column'} height={'100%'} gap={1} bgcolor={'#f5f5f5'}>
                        <ProductItem {...product} />
                        <Box
                            display={'flex'}
                            mx={2}
                            my={1}
                            py={2}
                            px={2}
                            gap={4}
                            bgcolor={'white'}
                            borderRadius={3}
                            boxShadow={2}
                            flex={1}
                        >
                            <Box display={'flex'} flex={1} justifyContent={'space-between'} px={2} py={1}>
                                <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    gap={2}
                                >
                                    {isSoon !== null && (
                                        <>
                                            <CountdownCircleTimer
                                                isPlaying
                                                duration={duration}
                                                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                                colorsTime={formatColor(duration, [
                                                    '#004777',
                                                    '#F7B801',
                                                    '#A30000',
                                                    '#A30000',
                                                ])}
                                            >
                                                {timeHandler}
                                            </CountdownCircleTimer>
                                            <Typography variant="h6">Current Price: {currentPrice} VNĐ</Typography>
                                        </>
                                    )}
                                </Box>
                                <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    gap={6}
                                >
                                    <Typography variant="h6">Bid Increment: {bidIncrement} VNĐ</Typography>
                                    <Box
                                        display={'flex'}
                                        flexDirection={'row'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        gap={2}
                                    >
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            endIcon={<AddRoundedIcon />}
                                            onClick={IncreaseHandler}
                                        >
                                            Increase
                                        </Button>
                                        <Input
                                            size="medium"
                                            type="number"
                                            value={currentBid}
                                            onChange={(e) => setCurrentBid(Number(e.target.value))}
                                            inputProps={{ min: currentPrice, step: bidIncrement }}
                                        />
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            endIcon={<RemoveRoundedIcon />}
                                            onClick={DecreaseHandler}
                                            color="error"
                                        >
                                            Decrease
                                        </Button>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        sx={{ minWidth: 150 }}
                                        onClick={handleSummitBid}
                                        disabled={isSoon === true || currentBid <= currentPrice}
                                    >
                                        Bid
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <ViewMode />
            </Grid>
            <ToastContainer />
        </div>
    );
};

export default RoomDetail;
