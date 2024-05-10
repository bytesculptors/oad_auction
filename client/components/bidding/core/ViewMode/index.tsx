import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Tab, TextField } from '@mui/material';
import CommentItem from '../../CommentItem';
import { memo, useRef, useState } from 'react';
import { BidViewMode, ICommentItem, IProcessItem } from '@/types/bid.type';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ProcessItem from '../../ProcessItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/Store';
import { UserState } from '@/redux/stateUser/user.state';
export interface IViewModeProps {
    comments: ICommentItem[];
    processes: IProcessItem[];
    onComment: (comment: ICommentItem) => void;
}
const ViewMode: React.FC<IViewModeProps> = ({ comments, processes, onComment }) => {
    const [viewMode, setViewMode] = useState<BidViewMode>('comment');
    const [commentInput, setCommentInput] = useState<string>('');
    const commentRef = useRef<HTMLInputElement>(null);
    const user: UserState = useSelector((state: RootState) => state.reducerUser);
    const handleChangeView = (event: React.SyntheticEvent, newValue: string) => {
        setViewMode(newValue as BidViewMode);
    };

    const commentHandler = () => {
        onComment({
            content: commentInput,
            time: new Date(),
            user: {
                id: user._id,
                name: user.name,
                avatar: 'https://tq6.mediacdn.vn/133514250583805952/2021/6/9/photo-1-16232229002241474687644.jpg',
            },
        });
        setCommentInput('');
    };
    return (
        <Grid item xs={4} className="flex flex-col h-full bg-white border-2 rounded-md border-gray-200 view-mode">
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
                >
                    <Box px={3} display={'flex'} flexDirection={'column-reverse'} gap={2} height={'100%'}>
                        <Box width={'100%'} py={1} display={'flex'} gap={2} alignItems={'center'}>
                            <TextField
                                id="filled-basic"
                                label="Comment"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                ref={commentRef}
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        commentHandler();
                                    }
                                }}
                            />
                            <SendRoundedIcon
                                sx={{
                                    cursor: 'pointer',
                                    color: commentInput ? 'primary.main' : 'gray',
                                    fontSize: '32px',
                                    pointerEvents: commentInput ? 'auto' : 'none',
                                }}
                                onClick={commentHandler}
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
                {/* process */}
                <TabPanel
                    sx={{
                        height: '100%',
                        overflowY: 'hidden',
                        padding: 0,
                    }}
                    value="process"
                >
                    <Box px={4} display={'flex'} flexDirection={'column-reverse'} gap={2} height={'100%'}>
                        <Box
                            display={'flex'}
                            flexDirection={'column-reverse'}
                            overflow={'auto'}
                            gap={2}
                            pt={2}
                            pb={3}
                            mr={-2}
                            pr={2}
                        >
                            {processes.map((comment, index) => (
                                <ProcessItem key={index} {...comment} />
                            ))}
                        </Box>
                    </Box>
                </TabPanel>
            </TabContext>
        </Grid>
    );
};
export default memo(ViewMode);
