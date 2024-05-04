import React from 'react';

interface InputItemProps {
    title: string;
    onChangeContent: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputItem({ title, onChangeContent }: InputItemProps) {
    const titleInLowerCase = title.toLowerCase();
    return (
        <div>
            <label htmlFor={titleInLowerCase} className="sr-only">
                {title}
            </label>
            <input
                onChange={(event) => {
                    onChangeContent(event);
                }}
                required
                id={titleInLowerCase}
                name={titleInLowerCase}
                type="text"
                autoComplete={titleInLowerCase}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={title}
            />
        </div>
    );
}
