import { forwardRef, useRef, useState } from 'react';

type Ref = HTMLParagraphElement;

interface DummyBidProps {
    bid: number;
    bidIncrement: number;
    time: number;
    onAddition: () => void;
    onSubtraction: () => void;
    onSummitBid: () => void;
}

const DummyBid = forwardRef<Ref, DummyBidProps>((props, ref) => {
    return (
        <div className="basis-1/2 w-9/12 flex-col flex justify-between border-2 rounded-md border-gray-200  p-3 my-2">
            <div className="flex flex-row justify-around items-center  border-b-2 pb-2 ">
                <h2 className="text-xs font-semibold">Giá hiện tại</h2>
                <p className="text-xs font-semibold ">{props.bid}</p>
            </div>

            <div className="flex flex-row items-center justify-between mt-3">
                <div className=" flex flex-col">
                    <p className="text-xs text-gray-400 font-bold">Bước giá</p>
                    <p className="text-xs font-semibold">{props.bidIncrement}</p>
                </div>
                <p className="text-xs">x</p>
                <div className="flex flex-row items-center">
                    <button
                        className="px-2 bg-gray-500 text-white font-semibold rounded-md"
                        onClick={props.onSubtraction}
                    >
                        -
                    </button>
                    <p className="p-2 text-xs font-semibold">{props.time}</p>
                    <button className="px-2 bg-gray-500 text-white font-semibold rounded-md" onClick={props.onAddition}>
                        +
                    </button>
                </div>
                <p className="p-1 text-xs font-semibold">=</p>
                <p className="basis-2/5 text-xs font-semibold">{props.bidIncrement * props.time}</p>
            </div>

            <div className="text-center ">
                <button
                    onClick={props.onSummitBid}
                    type="button"
                    className="text-white bg-gray-500 hover:bg-gray-700 w-9/12 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <h1 className="flex flex-row">
                        Trả giá :{' '}
                        <p ref={ref}>
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(props.bid + props.bidIncrement * props.time)}
                        </p>
                    </h1>
                </button>
            </div>
        </div>
    );
});

export default DummyBid;
