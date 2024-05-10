import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loading() {
    return (
        <SkeletonTheme baseColor="#f0f0f0" highlightColor="#e0e0e0">
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}
            >
                <Skeleton height={100} width={200} />

                <Skeleton height={20} width={150} style={{ marginTop: '10px' }} />

                <Skeleton height={20} width={100} style={{ marginTop: '5px' }} />
            </div>
        </SkeletonTheme>
    );
}
