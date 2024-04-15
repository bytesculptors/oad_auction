'use client';
import { useState } from 'react';
import { SearchProduct } from './';

const SearchBar = () => {
    const [products, setProducts] = useState('');
    const handleSearch = () => {};
    return (
        <form className="searchbar" onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchProduct product={products} setProduct={setProducts} />
            </div>
        </form>
    );
};

export default SearchBar;
