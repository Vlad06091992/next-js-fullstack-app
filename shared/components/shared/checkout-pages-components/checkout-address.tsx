import {CheckoutItem, FormInput, Input, Textarea, WhiteBlock} from "@/shared/components";
import {getCartItemDetails} from "@/shared/lib";
import {CartStateItem} from "@/shared/store/cart";
import {FC} from "react";

// interface Props {
//     items: CartStateItem[];
//     onClickCountButton: (id: string, quantity: number, type: 'plus' | 'minus') => void;
//     onClickRemoveItem: (id: string) => void;
//     loading?: boolean;
//     className?: string;
// }

export const CheckoutAddress:FC<any> = () => {
    return (
        <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
                <Input name="address" className="text-base" placeholder="Введите адрес"/>
                <Textarea
                    name="comment"
                    className="text-base"
                    placeholder="Комментарий к заказу"
                    rows={5}
                />
            </div>
        </WhiteBlock>
    )
}