import { CustomFilter, Hero, SearchBar } from '@/components';
import Image from 'next/image';
import ProductData from '@/data/ProductData';

export default function Home() {
    const isDataEmpty = !Array.isArray(ProductData) || ProductData.length < 1 || !ProductData;
    return (
        // <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <main className="overflow-hidden">
            <Hero />
            <div className="mt-12 padding-x padding-y max-width" id="discover">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">Antique Catalogue</h1>
                    <p>Explore the antique that you like</p>
                </div>
                <div className="home__filters">
                    <SearchBar />
                    <div className="home__filters-container">
                        <CustomFilter />
                        <CustomFilter />
                    </div>
                </div>
                {!isDataEmpty ? (
                    <section>
                        <div className="home__cars-wrapper">
                            {ProductData.map((item) => (
                                <ProductCard item={item} />
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
