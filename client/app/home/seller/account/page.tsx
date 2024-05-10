'use client';
import { RootState } from '@/redux/Store';
import { ThemeProvider } from '@emotion/react';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Paper,
    TextField,
    Typography,
    createTheme,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const defaultTheme = createTheme();

export default function AccountSeller() {
    const stateUser = useSelector((state: RootState) => state.reducerUser);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('name'));
        console.log(data.get('email'));
        // console.log(stateUser);
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex', width: '50%', mx: 'auto' }}>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <Paper>
                        <Box
                            noValidate
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                mt: 1,
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 4,
                            }}
                        >
                            <Typography component="p" variant="h5">
                                Thông tin tài khoản
                            </Typography>
                            <TextField id="name" name="name" label="name" value={stateUser.name} variant="outlined" />
                            <TextField
                                id="email"
                                name="email"
                                label="email"
                                value={stateUser.email}
                                variant="outlined"
                            />
                            <Typography component="p">Role : {stateUser.role}</Typography>
                            <Typography component="p">Balance : {stateUser.balance}</Typography>
                            {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
                            <Button type="submit" variant="contained">
                                Save
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
