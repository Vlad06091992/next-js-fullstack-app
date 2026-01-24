import {useCartStore} from "@/shared/store";
import {useEffect} from "react";
import {CartStateItem} from "@/shared/store/cart";
import {CreateCartItemValues} from "@/shared/services/dto/cart.dto";

type ReturnProps = {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
    updateItemQuantity: (id: string, quantity: number) => void;
    removeCartItem: (id: string) => void;
    addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = ():ReturnProps => {
    // const {fetchCartItems, updateItemQuantity, removeCartItem, totalAmount, items} = useCartStore()

    //вариант в конкретной выборкой из стейта
    const [fetchCartItems, updateItemQuantity, removeCartItem, addCartItem, totalAmount, items,loading] = useCartStore((state =>([
        state.fetchCartItems,
        state.updateItemQuantity,
        state.removeCartItem,
        state.addCartItem,
        state.totalAmount,
        state.items,
        state.loading,
    ])))

    useEffect(() => {
        fetchCartItems()
    }, [])

    return {
        loading,
        addCartItem,
        // fetchCartItems,
        updateItemQuantity,
        removeCartItem,
        totalAmount,
        items,
    }
}