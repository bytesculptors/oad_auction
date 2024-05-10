'use client';
import { getCreateOrder } from '@/api/paymentApi';
import { RootState } from '@/redux/Store';
import { ThemeProvider } from '@emotion/react';
import { Box, Button, Container, Fade, Modal, Paper, Slide, TextField, Typography, createTheme } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultTheme = createTheme();

export default function Wallet() {
    const stateUser = useSelector((state: RootState) => state.reducerUser);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <ThemeProvider theme={defaultTheme}>
            <div className="min-w-screen min-h-screen bg-gray-200 w-5/6 flex items-center justify-center px-5 py-5">
                <div className="bg-white flex-col text-gray-800 rounded-xl h-full w-1/2 shadow-lg overflow-hidden relative flex">
                    <div className="w-full">
                        <div
                            id="empty-cover-art"
                            className="mx-auto mt-20 shadow-md py-5 h-28 rounded w-56 bg-blue-100 text-center opacity-50 md:border-solid md:border-2 md:border-blue-800"
                        >
                            <center>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png"
                                    className="h-16 "
                                />
                            </center>
                        </div>
                    </div>

                    <div className="w-full mt-3 flex flex-col justify-center items-center">
                        <Typography component="p" variant="h6">
                            Thông tin tài khoản
                        </Typography>
                        <Typography component="p">Balance : {stateUser.balance}</Typography>
                        <div className="mt-4">
                            <Button onClick={handleOpen} type="submit" variant="contained">
                                Nạp lần đầu
                            </Button>
                            <ModalComponent handleClose={handleClose} open={open} />
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

interface ModalComponentProps {
    open: boolean;
    handleClose: () => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const ModalComponent = ({ handleClose, open }: ModalComponentProps) => {
    const [money, setMoney] = useState<string>('0');
    const router = useRouter();

    const handleSummit = async () => {
        setMoney(parseInt(money.trim(), 10).toString());
        const response = await getCreateOrder({
            amount: parseInt(money) || 0,
            language: 'vn',
            orderDescription: '2 kem chong nang',
            orderType: '100000',
        });

        if (response.status === 200) {
            window.open(response.data.url, '_blank');
            // router.push(response.data.url);
        } else {
            toast.error(response.data.message, {
                position: 'top-center',
            });
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Số tiền bạn muốn nạp
                </Typography>
                <div className="flex flex-col gap-2">
                    <TextField
                        className="mt-2"
                        id="money"
                        label="money"
                        variant="outlined"
                        onChange={(e) => {
                            setMoney(e.target.value);
                        }}
                    />
                    <div className="flex flex-row gap-2 mt-3">
                        <LogoComponent
                            onClick={handleSummit}
                            src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png"
                            active={true}
                        />
                        <LogoComponent
                            src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay.png"
                            active={false}
                            onClick={() => {}}
                        />
                        <LogoComponent
                            onClick={() => {}}
                            src="https://cdn.iconscout.com/icon/free/png-512/free-paypal-5-226456.png?f=webp&w=512"
                            active={false}
                        />
                    </div>
                </div>
                <ToastContainer />
            </Box>
        </Modal>
    );
};

const LogoComponent = ({ src, active, onClick }: { src: string; active: boolean; onClick: () => void }) => {
    return (
        <button
            style={{
                display: 'flex',
                width: 60,
                height: 60,
                borderRadius: 15,
                background: 'linear-gradient(145deg, #ffffff, #e0e0e0)',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Shadow
                border: '1px solid rgba(0, 0, 0, 0.1)', // Border
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                opacity: active ? 1 : 0.5,
                cursor: 'pointer',
            }}
            className="hover: bg-slate-600"
            onClick={onClick}
        >
            <div className="m-2">
                <img src={src} />
            </div>
        </button>
    );
};
