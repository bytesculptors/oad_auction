'use client';
import { validatePaymentResult } from '@/api/paymetResultApi';
import { RootState } from '@/redux/Store';
import { UserState } from '@/redux/stateUser/user.state';
import { IParamsPaymentResult, IPaymentResultResponse, PaymentStatus } from '@/types/payment.type';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Link from 'next/link';

export interface IPaymentResultPageProps {
    searchParams: IParamsPaymentResult;
}

const PaymentResultPageSkeleton: FC = () => {
    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={3}>
            <Box px={8} flex={1} width={'100%'} display={'flex'} alignItems={'center'} flexDirection={'column'} gap={1}>
                <Skeleton variant="circular" width={100} height={100} />
                <Skeleton variant="rounded" width={'100%'} height={60} />
                <Skeleton variant="rounded" width={'100%'} height={60} />
            </Box>

            <Box display={'flex'} flex={1} width={'100%'} flexDirection={'column'} alignItems={'center'} px={8}>
                <Box mt={2} display={'flex'} flexDirection={'column'} gap={1} width={'100%'}>
                    <Skeleton variant="rounded" width={'100%'} height={60} />
                    <Skeleton variant="rounded" width={'100%'} height={60} />
                    <Skeleton variant="rounded" width={'100%'} height={60} />
                    <Skeleton variant="rounded" width={'100%'} height={60} />
                </Box>
            </Box>
        </Box>
    );
};

const PaymentResultPage: FC<IPaymentResultPageProps> = ({ searchParams }) => {
    const user: UserState = useSelector((state: RootState) => state.reducerUser);
    const [loading, setLoading] = useState<boolean>(true);
    const [paymentResult, setPaymentResult] = useState<IPaymentResultResponse | null>(null);

    const handlePaymentResult = async (userId: string, searchParams: IParamsPaymentResult) => {
        try {
            const response = await validatePaymentResult(userId, searchParams);
            if (response.status === 200) {
                setPaymentResult(response.data?.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!searchParams) return;
        if (!user?._id) return;

        handlePaymentResult(user._id, searchParams);
    }, [user]);
    return (
        <Box display={'flex'} width={'100%'} height={'100vh'} py={5} justifyContent={'center'} bgcolor={'#f4f4f4'}>
            <Box boxShadow={3} minWidth={'50%'} borderRadius={3} bgcolor={'white'} px={3} py={3}>
                {loading && <PaymentResultPageSkeleton />}
                {!loading && (
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={3}>
                        {(!paymentResult || paymentResult?.status !== PaymentStatus.SUCCESS) && (
                            <CancelIcon
                                color="error"
                                sx={{
                                    fontSize: 100,
                                }}
                            />
                        )}
                        {paymentResult !== null && paymentResult.status === PaymentStatus.SUCCESS && (
                            <CheckCircleIcon
                                color="success"
                                sx={{
                                    fontSize: 100,
                                }}
                            />
                        )}
                        <Typography variant="h5" fontWeight={600}>
                            Payment {paymentResult?.status === PaymentStatus.SUCCESS ? 'Success' : 'Failed'}
                        </Typography>
                        <Typography
                            variant="h5"
                            fontWeight={600}
                            color={paymentResult?.status === PaymentStatus.SUCCESS ? 'green' : 'red'}
                        >
                            {paymentResult?.order?.amount || searchParams?.vnp_Amount} VNĐ
                        </Typography>

                        <Box
                            display={'flex'}
                            flex={1}
                            width={'100%'}
                            flexDirection={'column'}
                            alignItems={'center'}
                            px={8}
                        >
                            <Typography variant="subtitle1">
                                Thank you for your payment, we have received your payment
                            </Typography>
                            <Box mt={2} display={'flex'} flexDirection={'column'} gap={1} width={'100%'}>
                                <Box display={'flex'} justifyContent={'space-between'}>
                                    <Typography variant="subtitle1">Customer</Typography>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {user?.name}
                                    </Typography>
                                </Box>

                                <Box display={'flex'} justifyContent={'space-between'}>
                                    <Typography variant="subtitle1">Cart</Typography>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {paymentResult?.cartType || searchParams?.vnp_CardType}
                                    </Typography>
                                </Box>
                                <Box display={'flex'} justifyContent={'space-between'}>
                                    <Typography variant="subtitle1">Bank Code</Typography>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {searchParams?.vnp_BankCode}
                                    </Typography>
                                </Box>
                                <Box display={'flex'} justifyContent={'space-between'}>
                                    <Typography variant="subtitle1">Transaction code</Typography>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {paymentResult?.transId || searchParams?.vnp_TransactionNo}
                                    </Typography>
                                </Box>
                                <Box display={'flex'} justifyContent={'space-between'}>
                                    <Typography variant="subtitle1">Information</Typography>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {paymentResult?.order?.infor || searchParams?.vnp_OrderInfo}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box mt={4} display={'flex'} flexDirection={'column'} gap={1} width={'100%'}>
                                <Link
                                    href={{
                                        pathname: '/home/user/deposit',
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        color={paymentResult?.status === PaymentStatus.SUCCESS ? 'success' : 'warning'}
                                        sx={{ py: '10px' }}
                                    >
                                        Comming back
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default PaymentResultPage;
