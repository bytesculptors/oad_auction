'use client';
import { getCreateOrder } from '@/api/paymentApi';
import { getBalance } from '@/api/userApi';
import { RootState, store } from '@/redux/Store';
import { setBalanceUser } from '@/redux/stateUser/user.state';
import { ThemeProvider } from '@emotion/react';
import { Box, Button, Input, Modal, Typography, createTheme } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultTheme = createTheme();

export default function Wallet() {
    const stateUser = useSelector((state: RootState) => state.reducerUser);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleGetBalance = async () => {
        const response = await getBalance(stateUser._id);
        if (response.status === 200) {
            console.log(response.data.balance);
            store.dispatch(setBalanceUser(response.data.balance));
        }
    };

    const formatMoney = useMemo(() => {
        if (!stateUser?.balance) return '0';
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stateUser?.balance);
    }, [stateUser?.balance]);

    useEffect(() => {
        console.log('stateUser', stateUser);
        if (stateUser?._id) {
            handleGetBalance();
        }
    }, [stateUser]);

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
                                {' '}
                                <FiRefreshCcw onClick={handleGetBalance} className="hover:opacity-80 cursor-pointer" />
                            </center>
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
                            Current Balance
                        </Typography>
                        <Typography component="p">{formatMoney}</Typography>
                        <div className="mt-4">
                            <Button onClick={handleOpen} type="submit" variant="contained" sx={{ minWidth: '120px' }}>
                                Nạp
                            </Button>
                            <ModalComponent handleClose={handleClose} open={open} userId={stateUser?._id} />
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
    userId: string;
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
const ModalComponent = ({ handleClose, open, userId }: ModalComponentProps) => {
    const [money, setMoney] = useState<number>(0);
    const router = useRouter();

    const handleSummit = async () => {
        const response = await getCreateOrder(
            {
                amount: money || 0,
                language: 'vn',
                orderDescription: '2 kem chong nang',
                orderType: '100000',
            },
            userId,
        );

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
                    {/* <TextField
                        className="mt-2"
                        id="money"
                        label="money"
                        variant="outlined"
                        onChange={(e) => {
                            setMoney(e.target.value);
                        }}
                    /> */}
                    <Input
                        size="medium"
                        type="number"
                        onChange={(e) => setMoney(Number(e.target.value))}
                        inputProps={{ min: 5000 }}
                    />
                    <div className="flex flex-col gap-2 mt-3">
                        <Typography variant="body1">Select your payment method *</Typography>
                        <LogoComponent
                            method="VNPay"
                            onClick={handleSummit}
                            src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
                            active={true}
                        />
                        <LogoComponent
                            method="ZaloPay"
                            src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay.png"
                            active={false}
                        />
                        <LogoComponent
                            method="Paypal"
                            src="https://cdn.iconscout.com/icon/free/png-512/free-paypal-5-226456.png?f=webp&w=512"
                            active={false}
                        />
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

const LogoComponent = ({
    src,
    active,
    onClick = () => {},
    method,
}: {
    src: string;
    active: boolean;
    onClick?: () => void;
    method: string;
}) => {
    return (
        <Button
            variant="outlined"
            size="medium"
            startIcon={
                <Image
                    alt="pay"
                    src={src}
                    width={40}
                    height={40}
                    className="object-cover w-[40px] h-[40px] opacity-70"
                />
            }
            className="flex flex-row justify-start gap-8"
            onClick={onClick}
            disabled={!active}
        >
            {method + (active ? '' : ' developing')}
        </Button>
    );
};
