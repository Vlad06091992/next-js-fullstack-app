import {CheckoutItem, WhiteBlock} from "@/shared/components";
import {getCartItemDetails} from "@/shared/lib";
import {CartStateItem} from "@/shared/store/cart";
import {FC} from "react";

interface Props {
    items: CartStateItem[];
    onClickCountButton: (id: string, quantity: number, type: 'plus' | 'minus') => void;
    onClickRemoveItem: (id: string) => void;
    loading?: boolean;
    className?: string;
}

export const CheckoutCart:FC<Props> = ({items,onClickCountButton,onClickRemoveItem,className}) => {
    return (
        <WhiteBlock  title="1. Корзина">
            <div className={'flex flex-col gap-5'}>
                {items.map((item) => (
                    <CheckoutItem
                        disabled={item.disabled}
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        name={item.name}
                        price={item.price}
                        details={getCartItemDetails(item.ingredients, item.pizzaType, item.pizzaSize)}
                        quantity={item.quantity}
                        onClickRemove={() => onClickRemoveItem(item.id)}
                        onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                    />
                ))}
            </div>

        </WhiteBlock>
    )
}