import {ApiRoutes} from './constants';
import { Product } from '@prisma/client';


export const search = async (query: string):Promise<Product[]> => {
    const req = fetch(`${process.env.NEXT_PUBLIC_API_URL}/${ApiRoutes.SEARCH_PRODUCTS}?query=${query}`, {
        method: 'GET',
    })

    const result = await req
    return result.json()
};