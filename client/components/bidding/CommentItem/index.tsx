'use client';
import { ICommentItem } from '@/types/bid.type';
import { Avatar, Box, Skeleton, Typography } from '@mui/material';
import { FC, FunctionComponent, memo } from 'react';

export const CommentItemSkeleton: FunctionComponent = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
            }}
        >
            <Skeleton variant="circular" width={40} height={40} animation="pulse" />
            <Skeleton variant="rectangular" sx={{ flexGrow: 1 }} height={60} />
        </Box>
    );
};

const CommentItem: FunctionComponent<ICommentItem> = ({ content, time, user }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
            }}
        >
            <Avatar sx={{ width: 44, height: 44 }} src={user.avatar} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                }}
            >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {user.name}
                </Typography>
                <Typography variant="body2">{content}</Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'gray', ml: 'auto', px: 2 }}>
                {time.toLocaleTimeString()}
            </Typography>
        </Box>
    );
};

export default memo(CommentItem);
