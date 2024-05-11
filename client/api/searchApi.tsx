import request from '@/lib/axios';

export default interface IProduct {
    _id: string;
    name: string;
    price: number;
    deposit: number;
    description: string;
    image: string;
    category: string;
    material: string;
    dimension: string;
    color: string;
    weight: number;
    condition: string;
    style: string;
    manufacturer: string;
    year: number;
    origin: string;
}

interface IResponseGetProducts {
    data: IProduct[];
    status: number;
}

const searchProductsApi = async (keyword: string) => {
    const _response: IResponseGetProducts = {
        data: [],
        status: 0,
    };
    // await request.get<IResponseGetProducts>(`/v1/user/find-product?keyword=${keyword}`)
    await request
        .get<IResponseGetProducts>(`/v1/user/find-product?page=0`)
        .then((response) => {
            _response.data = response.data.data;
            _response.status = response.status;
        })
        .catch((error) => {
            if (error.response) {
                _response.data = error.response.data;
                _response.status = error.response.status;
            }
        });
    console.log(_response);
    return _response;

    // try {
    //     const response = await request.get<IResponseGetProducts>(`/v1/products?keyword=${keyword}`);
    //     _response.data = response.data.data;
    //     _response.status = response.status;
    // } catch (error) {
    //     if (error.response) {
    //         _response.data = error.response.data;
    //         _response.status = error.response.status;
    //     }
    // }
};
export { searchProductsApi };
// export interface ISearchApiProps {
//     keyWord: string;
//     limit: number;
//     page: number;
// }
// export interface IResponseSearchApiProps {
//     data: {
//         _id: string;
//         duration: number;
//         status: number;
//         startTime: string;
//         message?: string;
//         product: {
//             _id: string;
//             name: string;
//             price: number;
//             deposit: number;
//             description: string;
//             image: string;
//             category: string;
//             material: string;
//             dimension: string;
//             color: string;
//             weight: number;
//             condition: string;
//             style: string;
//             manufacturer: string;
//             year: number;
//             origin: string;
//         };
//     }
// }

// const searchProductApi = async (data: ISearchApiProps) => {
//     var _response: IResponseSearchApiProps = {
//         data : {
//             _id:
//         }
//     }
// }
