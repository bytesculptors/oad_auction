'use client';
import { Hero, ProductCard, SearchBar } from '@/components';
import Image from 'next/image';
import ProductData from '@/data/ProductData';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/Store';
import { searchProductsApi } from '@/api/searchApi';
import IProduct from '@/api/searchApi';
import { redirect } from 'next/navigation';
import { biddingProduct } from '@/api/userApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const [keyWord, setKeyWord] = useState('');
    const [searchResults, setSearchResults] = useState<IProduct[]>([]);
    const isDataEmpty = !Array.isArray(ProductData) || ProductData.length < 1 || !ProductData;
    // const filterProduct = ProductData.filter((item) => {
    //     const productName = item.name.toLowerCase();
    //     return productName.includes(keyWord.toLowerCase());
    // });
    const stateUser = useSelector((state: RootState) => state.reducerUser);

    const handleSearch = async () => {
        try {
            const response = await searchProductsApi(keyWord);
            if (response.status === 200) {
                console.log(response.data);
                setSearchResults(response.data);
            } else {
                console.error('Error fetching products:', response.status);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        handleSearch();
    }, [keyWord]);
    useEffect(() => {
        console.log('Search results updated:', searchResults);
    }, [searchResults]);

    // useEffect(() => {
    //     if (stateUser._id === '') {
    //         redirect('/login');
    //     }
    // }, []);

    useEffect(() => {
        console.log(stateUser);
    }, [stateUser]);

    const handleApply = async (productId: string, userId: string) => {
        const response = await biddingProduct({
            productId: productId,
            userId: userId,
        });

        if (response.status === 201) {
            toast.success('Success', {
                position: 'top-center',
            });
        } else {
            toast.error(response.data.message, {
                position: 'top-center',
            });
        }
    };

    return (
        // <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <main className="overflow-hidden">
            <Hero />
            <div className="mt-12 padding-x padding-y max-width" id="discover">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">Antique Catalogue</h1>
                    <p>Explore the antique that you like</p>
                </div>

                <div className="home__filter">
                    {/* <SearchBar /> */}
                    <form className="searchbar">
                        <div className="searchbar__item">
                            <Image
                                src="/icon-search.svg"
                                onClick={handleSearch}
                                width={20}
                                height={20}
                                className="ml-4"
                                alt="Car Logo"
                            />
                            <input
                                type="text"
                                name="model"
                                value={keyWord}
                                onChange={(e) => setKeyWord(e.target.value)}
                                placeholder="Searching..."
                                className="searchbar__input"
                            />
                        </div>
                    </form>
                </div>

                {!isDataEmpty ? (
                    <section>
                        <div className="home__cars-wrapper">
                            {searchResults.map((item) => (
                                <div>
                                    <div>{item.status} </div>
                                    <ProductCard
                                        key={item.product._id}
                                        item={item.product}
                                        onhandleButton2={async () => {
                                            await handleApply(item.product._id, stateUser._id);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                ) : (
                    <div>
                        <h2 className="text-black text-xl font-bold">Oops, no results!!</h2>
                    </div>
                )}
            </div>
        </main>
    );
}
