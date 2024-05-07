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
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { BidViewMode, ICommentItem, fakecomments } from '@/types/bid.type';
import CommentItem from '@/components/bidding/CommentItem';
import { Input, TextField } from '@mui/material';

const RoomDetail = () => {
    const [auctionProgreeData, setAuctionProgreeData] = useState<IDataAuctionProgress[]>([]);
    const [bidIncrement, setBidIncrement] = useState(5000000);
    const [timeBidIncrement, setTimeBidIncrement] = useState(1);
    const [viewMode, setViewMode] = useState<BidViewMode>('comment');
    const resultBid = useRef<HTMLParagraphElement>(null);
    const [comments, setComments] = useState<ICommentItem[]>([]);
    const handleChangeView = (event: React.SyntheticEvent, newValue: string) => {
        setViewMode(newValue as BidViewMode);
    };

    const handleSummitBid = () => {
        toast.success(resultBid ? 'Success ' + resultBid.current?.textContent : 'Fault', {
            position: 'top-center',
        });
    };

    useEffect(() => {
        setAuctionProgreeData(_AuctionProgressData);
        setComments(fakecomments);
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
            <div className="flex flex-row  justify-between gap-8 h-screen">
                <div className="basis-3/5 flex flex-col justify-center h-full overflow-hidden items-center bg-white border-2  rounded-md border-gray-200">
                    <p className="mt-6 hover:text-gray-500 text-sl font-semibold cursor-pointer text-black p-1">
                        Đấu giá viên : Trần Thị Nga
                    </p>
                    <div className="mt-4 cursor-text text-xl flex flex-col justify-center items-center bg-blue-950 rounded-md border-green-400 border-2  text-center p-2 text-lime-600 ">
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
                    </div>

                    <Image
                        className="my-10 p-2 h-auto max-w-sm rounded-lg bg-sky-50 shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                        src={ProductData[0].imageUrl}
                        width={250}
                        height={250}
                        alt="Picture of the author"
                    />
                    <DummyBid
                        bid={auctionProgreeData[0] ? auctionProgreeData[0].bid : 0}
                        bidIncrement={bidIncrement}
                        time={timeBidIncrement}
                        onAddition={handleAddittion}
                        onSubtraction={handleSubtraction}
                        onSummitBid={handleSummitBid}
                        ref={resultBid}
                    />
                </div>

                <div className="basis-2/5 flex flex-col h-full bg-white border-2  rounded-md border-gray-200 view-mode">
                    {/* <AuctionProgress data={auctionProgreeData} /> */}

                    <TabContext value={viewMode}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChangeView} aria-label="lab API tabs example" variant="fullWidth">
                                <Tab label="Comment" value="comment" />
                                <Tab label="Process" value="process" />
                            </TabList>
                        </Box>
                        <TabPanel
                            value="comment"
                            sx={{
                                height: '100%',
                                overflowY: 'hidden',
                                padding: 0,
                            }}
                            // className="bg-red-400"
                        >
                            <Box px={4} display={'flex'} flexDirection={'column-reverse'} gap={2} height={'100%'}>
                                <Box width={'100%'} py={1}>
                                    <TextField
                                        id="filled-basic"
                                        label="Comment"
                                        variant="outlined"
                                        sx={{ width: '100%' }}
                                    />
                                </Box>
                                <Box
                                    display={'flex'}
                                    flexDirection={'column-reverse'}
                                    overflow={'auto'}
                                    gap={2}
                                    pt={2}
                                    mr={-2}
                                    pr={2}
                                >
                                    {comments.map((comment, index) => (
                                        <CommentItem key={index} {...comment} />
                                    ))}
                                </Box>
                            </Box>
                        </TabPanel>
                        <TabPanel value="process">Process</TabPanel>
                    </TabContext>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default RoomDetail;
