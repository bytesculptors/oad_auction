/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'thanhnien.mediacdn.vn',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
