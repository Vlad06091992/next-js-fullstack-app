import { axiosInstance } from './instance';
import { CartDTO, CreateCartItemValues } from './dto/cart.dto';
import {Ingredient} from "@prisma/client";
import {ApiRoutes} from "@/shared/services/constants";
// функционал обращения к ендпоинтам бэка. Хочет рефакторинга, для исключения дублирования кода

const url = `${process.env.NEXT_PUBLIC_API_URL}/${ApiRoutes.CART}`

export const getCart = async ():Promise<CartDTO> => {
    const req = fetch(url, {
        method: 'GET',
    })

    const result = await req
    return result.json()
};

export const updateItemQuantity = async (itemId: string, quantity: number):Promise<CartDTO> => {
    const req = fetch(`${url}/${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity })
    })

    const result = await req
    return result.json()
};


export const removeCartItem = async (itemId: string):Promise<CartDTO> => {
    const req = fetch(`${url}/${itemId}`, {
        method: 'DELETE',
    })

    const result = await req
    return result.json()
};

export const addCartItem = async ({productItemId,ingredients}: CreateCartItemValues): Promise<CartDTO> => {
    const req = fetch(`${url}`, {
        method: 'POST',
        body: JSON.stringify({ productItemId, ingredients }),
    })

    const result = await req
    return result.json()
};


export const getAll = async ():Promise<Ingredient[]> => {
    const req = fetch(`${process.env.NEXT_PUBLIC_API_URL}/${ApiRoutes.INGREDIENTS}`, {
        method: 'GET',
    })

    const result = await req
    return result.json()
};
