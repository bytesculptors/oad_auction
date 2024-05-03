'use client';
import { Hero, ProductCard, SearchBar } from '@/components';
import Image from 'next/image';
import ProductData from '@/data/ProductData';
import { useState } from 'react';

export default function Home() {
    const [product, setProduct] = useState('');
    const isDataEmpty = !Array.isArray(ProductData) || ProductData.length < 1 || !ProductData;
    // const filterProduct = ProductData.filter()
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
                            <Image src="/car-logo.svg" width={20} height={20} className="ml-4" alt="Car Logo" />
                            <input
                                type="text"
                                name="model"
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                                placeholder="Searching..."
                                className="searchbar__input"
                            />
                        </div>
                    </form>
                </div>

                {!isDataEmpty ? (
                    <section>
                        <div className="home__cars-wrapper">
                            {/* {ProductData.map((item) => (
                                <ProductCard item={item} />
                            ))} */}
                            {}
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
