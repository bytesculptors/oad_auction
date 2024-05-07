'use client';
import React, { useState } from 'react';
import { Table } from '@mui/material';

export default function ProductMangement() {
    const [productList, setProductList] = useState([]);
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {productList.map((item) => {
                        return (
                            <tr>
                                {/* <td>{item.name}</td>
                                <td>{item.imageUrl}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>{item.description}</td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}
