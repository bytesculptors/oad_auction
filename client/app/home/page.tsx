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

export default function Home() {
    const [keyWord, setKeyWord] = useState('');
    const [searchResults, setSearchResults] = useState<IProduct[]>([]);
    const isDataEmpty = !Array.isArray(ProductData) || ProductData.length < 1 || !ProductData;
    const filterProduct = ProductData.filter((item) => {
        const productName = item.name.toLowerCase();
        return productName.includes(keyWord.toLowerCase());
    });
    const stateUser = useSelector((state: RootState) => state.reducerUser);

    const handleSearch = async () => {
        try {
            const response = await searchProductsApi(keyWord);
            console.log(response.data);
            if (response.status === 200) {
                setSearchResults(response.data);
                console.log(searchResults);
            } else {
                console.error('Error fetching products:', response.status);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // useEffect(() => {
    //     if (stateUser._id === '') {
    //         redirect('/login');
    //     }
    // }, []);

    useEffect(() => {
        console.log(stateUser);
    }, [stateUser]);

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

                {/* {!isDataEmpty ? (
                    <section>
                        <div className="home__cars-wrapper">
                            {searchResults.map((item) => (
                                <ProductCard item={item} />
                            ))}
                        </div>
                    </section>
                ) : (
                    <div>
                        <h2 className="text-black text-xl font-bold">Oops, no results!!</h2>
                    </div>
                )} */}
            </div>
        </main>
    );
}
