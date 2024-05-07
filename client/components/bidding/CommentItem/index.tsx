'use client';
import { ICommentItem } from '@/types/bid.type';
import { Avatar, Box, Typography } from '@mui/material';
import React, { FC, FunctionComponent } from 'react';

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

export default CommentItem;
