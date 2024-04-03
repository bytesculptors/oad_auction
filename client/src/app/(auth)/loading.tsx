import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const LoadingAuth = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >
            <CircularProgress size={60} />
        </Box>
    );
};

export default LoadingAuth;
