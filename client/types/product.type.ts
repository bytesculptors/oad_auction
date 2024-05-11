export interface IProduct {
    _id: string;
    duration: number;
    status: number;
    startTime: string;
    product: {
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
    };
}
