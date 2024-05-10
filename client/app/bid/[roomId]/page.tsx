'use client';

import _AuctionProgressData from '@/data/AuctionProgressData';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, Button, Grid, Input, TextField, Typography } from '@mui/material';
import ViewMode from '@/components/bidding/core/ViewMode';
import { ICommentItem, IProcessItem, IProductItem, ITimeStatus } from '@/types/bid.type';
import table_lamp from '../../../assets/images/table_lamp.jpg';
import ProductItem, { ProductItemSkeleton } from '@/components/bidding/ProductItem';
import { CountdownCircleTimer, TimeProps } from 'react-countdown-circle-timer';
import { formatColor, formatTime } from '@/utils/format';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/Store';
import { SocketActions } from '@/redux/socket-client/socket.slice';
import { UserState } from '@/redux/stateUser/user.state';
import { IJoinRoom, IPlaceBidResponse, IUserJoinedCallBack } from '@/types/socket.type';
const fakeTime = new Date();
fakeTime.setHours(22, 45, 0, 0);

const RoomDetail = ({ params }: { params: { roomId: string } }) => {
    const [bidIncrement, setBidIncrement] = useState<number>(5000000);
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [currentBid, setCurrentBid] = useState<number>(0);
    const [timeStart, setTimeStart] = useState<Date | null>(null);
    const [durationSession, setDurationSession] = useState<number | null>(null);
    const [isSoon, setIsSoon] = useState<ITimeStatus>(null);
    const [durationCountDown, setDurationCountDown] = useState<number | null>(null);
    const [processes, setProcesses] = useState<IProcessItem[]>([]);
    const [comments, setComments] = useState<ICommentItem[]>([]);
    const [product, setProduct] = useState<IProductItem | null>(null);
    const user: UserState = useSelector((state: RootState) => state.reducerUser);
    const dispatch = useDispatch();

    const userJoinRoomInfor: IJoinRoom = useMemo(() => {
        return {
            roomId: params?.roomId,
            user: {
                userId: user._id,
                name: user.name,
            },
        };
    }, [user]);

    useEffect(() => {
        if (!timeStart) return;
        if (!durationSession) return;
        const compareTime: number = timeStart.getTime() - new Date().getTime();
        setIsSoon(compareTime > 0 ? 'soon' : Math.abs(compareTime) < durationSession * 60 * 1000 ? 'starting' : 'late');
    }, [timeStart]);

    useEffect(() => {
        if (isSoon === null || timeStart === null) return;

        if (isSoon === 'soon') {
            setDurationCountDown((timeStart.getTime() - new Date().getTime()) / 1000);
        } else if (isSoon === 'starting') {
            if (!durationSession) return;
            setDurationCountDown(durationSession * 60 - (-timeStart.getTime() + new Date().getTime()) / 1000);
        } else {
            setDurationCountDown(0);
        }
    }, [isSoon]);

    useEffect(() => {
        if (!params?.roomId) return;
        dispatch(SocketActions.connectSocket());
        dispatch(SocketActions.onJoinRoom(userJoinRoomInfor));
        dispatch(SocketActions.onUserJoined(onUserJoindedCallback));
        dispatch(SocketActions.onBidSuccess(onBidSuccessCallback));
        return () => {
            dispatch(SocketActions.offBidSuccess());
            dispatch(SocketActions.offUserJoined());
            dispatch(SocketActions.onLeaveRoom(userJoinRoomInfor));
            dispatch(SocketActions.disconnectSocket());
        };
    }, []);

    const onUserJoindedCallback: IUserJoinedCallBack = (response) => {
        console.log(response);
        setTimeStart(new Date(response.startTime));
        setDurationSession(response.duration);
        setCurrentPrice(response.price);
        setProduct((response?.product as IProductItem) || null);
    };

    const onBidSuccessCallback = (response: IPlaceBidResponse) => {
        console.log(response);
        setCurrentPrice(response.price);
        setProcesses((prev) => [
            {
                amount: response.price,
                time: new Date(response.time),
                user: {
                    id: response.userId,
                    name: user._id === response.userId ? 'You' : response.name,
                    avatar: 'https://tq6.mediacdn.vn/133514250583805952/2021/6/9/photo-1-16232229002241474687644.jpg',
                },
            },
            ...prev,
        ]);
        toast(
            user._id === response.userId
                ? 'you have just placed bid successfully !'
                : `${response.name} have just placed bid !`,
            {
                type: user._id === response.userId ? 'success' : 'warning',
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            },
        );
    };

    const handleComment = useCallback((comment: ICommentItem) => {
        setComments((prev) => [...prev, comment]);
    }, []);

    const handleSummitBid = () => {
        dispatch(
            SocketActions.onPlaceBid({
                roomId: params?.roomId,
                user: userJoinRoomInfor.user,
                amount: currentBid,
            }),
        );
    };

    const IncreaseHandler = () => {
        setCurrentBid((prev) => prev + bidIncrement);
    };

    const DecreaseHandler = () => {
        setCurrentBid((prev) => {
            if (prev - bidIncrement < currentPrice) {
                return prev;
            }
            return prev - bidIncrement;
        });
    };

    const timeHandler = ({ remainingTime }: TimeProps) => {
        if (remainingTime === 0 && (isSoon === 'starting' || isSoon === 'late')) {
            return <div className="timer">Too lale...</div>;
        }

        if (remainingTime === 0 && isSoon === 'soon') {
            setIsSoon('starting');
        }

        return (
            <Box textAlign={'center'}>
                {isSoon === 'soon' && <Typography variant="h5">Start in</Typography>}
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
                        {product && <ProductItem {...product} />}
                        {!product && <ProductItemSkeleton />}
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
                                    {isSoon !== null && durationSession !== null && durationCountDown !== null && (
                                        <>
                                            {
                                                <CountdownCircleTimer
                                                    isPlaying
                                                    duration={durationCountDown}
                                                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                                    colorsTime={formatColor(durationCountDown, [
                                                        '#004777',
                                                        '#F7B801',
                                                        '#A30000',
                                                        '#A30000',
                                                    ])}
                                                >
                                                    {timeHandler}
                                                </CountdownCircleTimer>
                                            }
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
                                        // disabled={isSoon === 'soon' || isSoon === 'late' || currentBid <= currentPrice}
                                        disabled={currentBid <= currentPrice}
                                    >
                                        Bid
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <ViewMode comments={comments} onComment={handleComment} processes={processes} />
            </Grid>
        </div>
    );
};

export default RoomDetail;
