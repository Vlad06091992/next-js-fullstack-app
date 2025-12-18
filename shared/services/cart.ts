import { axiosInstance } from './instance';
import { CartDTO, CreateCartItemValues } from './dto/cart.dto';
import {Ingredient} from "@prisma/client";
import {ApiRoutes} from "@/shared/services/constants";

// export const getCart = async (): Promise<CartDTO> => {
//   return (await axiosInstance.get<CartDTO>('/cart')).data;
// };

export const getCart = async ():Promise<CartDTO> => {
    const req = fetch(`${process.env.NEXT_PUBLIC_API_URL}/${ApiRoutes.CART}`, {
        method: 'GET',
    })

    const result = await req
    return result.json()
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
  return (await axiosInstance.patch<CartDTO>('/cart/' + itemId, { quantity })).data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  return (await axiosInstance.delete<CartDTO>('/cart/' + id)).data;
};

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
  return (await axiosInstance.post<CartDTO>('/cart', values)).data;
};


export const getAll = async ():Promise<Ingredient[]> => {
    const req = fetch(`${process.env.NEXT_PUBLIC_API_URL}/${ApiRoutes.INGREDIENTS}`, {
        method: 'GET',
    })

    const result = await req
    return result.json()
};
