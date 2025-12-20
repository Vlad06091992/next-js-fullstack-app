import {create} from "zustand";
import {Api} from "@/shared/services/api-client";
import {getCartDetails} from "@/shared/lib";
import {Ingredient} from "@prisma/client";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";

export type CartStateItem = {
    id: string;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    pizzaSize?: PizzaSize;
    ingredients: Array<Ingredient>;

    // disabled?: boolean;
    pizzaType?: PizzaType;
};


export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];

    /* Получение товаров из корзины */
    fetchCartItems: () => Promise<void>;

    /* Запрос на обновление количества товара */
    updateItemQuantity: (id: string, quantity: number) => Promise<void>;

    /* Запрос на добавление товара в корзину */
    addCartItem: (values: any) => Promise<void>;
    // addCartItem: (values: CreateCartItemValues) => Promise<void>;

    /* Запрос на удаление товара из корзины */
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,

    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.getCart(); //CartDTO
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    //дергает апи бэкенда,бэкенд меняет кол-во какого-то item, возвращает обновленный items,на фронте обновленный список кладётся в зустанд
    updateItemQuantity: async (id: string, quantity: number) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.updateItemQuantity(id, quantity);
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    removeCartItem: async (id: number) => {
        // try {
        //     set((state) => ({
        //         loading: true,
        //         error: false,
        //         items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
        //     }));
        //     const data = await Api.cart.removeCartItem(id);
        //     set(getCartDetails(data));
        // } catch (error) {
        //     console.error(error);
        //     set({ error: true });
        // } finally {
        //     set((state) => ({
        //         loading: false,
        //         items: state.items.map((item) => ({ ...item, disabled: false })),
        //     }));
        // }
    },

    addCartItem: async (values: any) => {
        // try {
        //     set({ loading: true, error: false });
        //     const data = await Api.cart.addCartItem(values);
        //     set(getCartDetails(data));
        // } catch (error) {
        //     console.error(error);
        //     set({ error: true });
        // } finally {
        //     set({ loading: false });
        // }
    },
}));