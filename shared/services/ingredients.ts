import {ApiRoutes} from './constants';
import {Ingredient} from '@prisma/client';

export const getAll = async ():Promise<Ingredient[]> => {
    const req = fetch(`${process.env.NEXT_PUBLIC_API_URL}/${ApiRoutes.INGREDIENTS}`, {
        method: 'GET',
    })

    const result = await req
    return result.json()
};
