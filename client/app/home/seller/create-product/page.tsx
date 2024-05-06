'use client';
import InputItem from '@/components/InputItem';
import React, { useState } from 'react';

export default function createProduct() {
    const [name, setName] = useState('');
    const [file, setFile] = useState<File | undefined>();
    const [description, setDescription] = useState('');

    const handleSubmitForm = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log('Submitted form data:', { name, file, description });
    };

    return (
        <div className="min-h-screen flex items-center justify-center max-w-6xl mx-auto bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className=" w-full space-y-8 bg-white shadow-md rounded-lg p-6">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Product</h2>
                </div>
                <form className="mt-8 space-y-6 " action="#" method="POST">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <InputItem title="Name" onChangeContent={(event) => setName(event.target.value)} />
                        <div>
                            <label htmlFor="description" className="sr-only">
                                Image
                            </label>
                            <input
                                onChange={(event) => {
                                    setFile(event.target.files?.[0]);
                                }}
                                id="image"
                                name="image"
                                type="file"
                                accept="image/png, image/gif, image/jpeg"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Description"
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="description" className="sr-only">
                                Description
                            </label>
                            <textarea
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                                id="description"
                                name="description"
                                rows={3}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Description"
                            ></textarea>
                        </div>
                        {/* <InputItem title="Category" />
                        <InputItem title="Dimensions" />
                        <InputItem title="Color" />
                        <InputItem title="Weight" />
                        <InputItem title="Condition" />
                        <InputItem title="Style" />
                        <InputItem title="Manufacturer" />
                        <InputItem title="Year" />
                        <InputItem title="Origin" /> */}
                    </div>
                    <div>
                        <button
                            onClick={handleSubmitForm}
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
