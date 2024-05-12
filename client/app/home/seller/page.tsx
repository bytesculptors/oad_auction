'use client';
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function DashBoardSeller() {
    return (
        <div>
            <BarChart
                series={[
                    { data: [10, 6, 11, 8, 6, 7, 9], label: 'Product created' },
                    { data: [5, 4, 9, 3, 5, 5, 7], label: 'Product approved' },
                ]}
                height={400}
                width={1000}
                xAxis={[
                    {
                        data: ['8/5/2024', '9/5/2024', '10/5/2024', '11/5/2024', '12/5/2024', '13/5/2024', '14/5/2024'],
                        scaleType: 'band',
                    },
                ]}
                margin={{ top: 100, bottom: 30, left: 40, right: 10 }}
            />
        </div>
    );
}
