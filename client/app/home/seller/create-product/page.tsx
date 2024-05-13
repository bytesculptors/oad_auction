'use client';
import { createProductApi, ICreateProduct } from '@/api/productApi';
import InputItem from '@/components/InputItem';
import { RootState } from '@/redux/Store';
import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';

export default function createProduct() {
    const [valueDate, setValueDate] = useState<Dayjs | null>();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [deposit, setDeposit] = useState('');
    const [file, setFile] = useState<File | undefined>();
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');
    const [material, setMaterial] = useState('');
    const [dimension, setDimension] = useState('');
    const [color, setColor] = useState('');
    const [weight, setWeight] = useState('');
    const [condition, setCondition] = useState('');
    const [style, setStyle] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [year, setYear] = useState('');
    const [origin, setOrigin] = useState('');
    const stateUser = useSelector((state: RootState) => state.reducerUser);

    const handleSubmitForm = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const response = await createProductApi({
            material: material,
            name: name,
            origin: origin,
            price: parseFloat(price),
            sellerId: stateUser._id,
            style: style,
            weight: parseFloat(weight),
            year: year,
            category: category,
            color: color,
            condition: condition,
            deposit: parseInt(deposit),
            description: description,
            dimension: dimension,
            duration: parseInt(duration),
            image: file + '',
            manufacturer: manufacturer,
        });
        console.log(response.status);

        if (response.status === 201) {
            toast.success('Create success', {
                position: 'top-center',
            });
        } else {
            toast.error(response.data.message, {
                position: 'top-center',
            });
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('image'));
        data.append('sellerId', stateUser._id);
        console.log(data.get('startTime'));
        if (valueDate) {
            console.log(valueDate.toISOString());
        }

        const response = await createProductApi(data);
        if (response.status === 201) {
            toast.success('Create success', {
                position: 'top-center',
            });
        } else {
            toast.error(response.data.message, {
                position: 'top-center',
            });
        }
    };

    return (
        <div className=" flex items-center justify-center w-full mx-auto bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className=" w-full space-y-8 bg-white shadow-md rounded-lg p-6">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Product</h2>
                </div>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                    className="mt-8 h-80  space-y-6 overflow-auto "
                >
                    <div className="rounded-md shadow-sm -space-y-px">
                        <InputItem title="Name" onChangeContent={(event) => setName(event.target.value)} />
                        <InputItem
                            title="Price"
                            onChangeContent={(e) => {
                                setPrice(e.target.value);
                            }}
                        />
                        <InputItem
                            title="Deposit"
                            onChangeContent={(e) => {
                                setDeposit(e.target.value);
                            }}
                        />
                        {file && <img width={350} height={350} src={URL.createObjectURL(file)} alt="Uploaded" />}
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
                                accept="image/png, image/gif, image/jpeg, image/webp"
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
                        <InputItem
                            title="Duration"
                            onChangeContent={(e) => {
                                setDuration(e.target.value);
                            }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker
                                    name="startTime"
                                    label="startTime"
                                    value={valueDate}
                                    ampm={false}
                                    onChange={(newValue) => setValueDate(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <InputItem
                            title="Dimension"
                            onChangeContent={(e) => {
                                setDimension(e.target.value);
                            }}
                        />

                        <InputItem
                            title="Color"
                            onChangeContent={(e) => {
                                setColor(e.target.value);
                            }}
                        />
                        <InputItem
                            title="Weight"
                            onChangeContent={(e) => {
                                setWeight(e.target.value);
                            }}
                        />
                        <InputItem
                            title="Material"
                            onChangeContent={(e) => {
                                setMaterial(e.target.value);
                            }}
                        />
                        <InputItem
                            title="Category"
                            onChangeContent={(e) => {
                                setCategory(e.target.value);
                            }}
                        />
                        <InputItem
                            title="Condition"
                            onChangeContent={(e) => {
                                setCondition(e.target.value);
                            }}
                        />
                        <InputItem
                            title="Style"
                            onChangeContent={(e) => {
                                setStyle(e.target.value);
                            }}
                        />
                        <InputItem
                            title="Manufacturer"
                            onChangeContent={(e) => {
                                setManufacturer(e.target.value);
                            }}
                        />
                        <InputItem
                            title="Year"
                            onChangeContent={(e) => {
                                setYear(e.target.value);
                            }}
                        />
                        <InputItem
                            title="Origin"
                            onChangeContent={(e) => {
                                setOrigin(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <button
                            // onClick={handleSubmitForm}
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Product
                        </button>
                    </div>
                </Box>
            </div>
        </div>
    );
}
