"use client"

import {WhiteBlock} from "@/shared/components";
import {FC} from "react";
import {FormTextarea} from "@/shared/components/shared/form-components/form-textarea/form-textarea";
import {AddressInput} from "@/shared/components/shared/address-input/address-input";

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
                <AddressInput
                    // name="address"
                    // className="text-base" placeholder="Введите адрес"
                />
                <FormTextarea
                    name="comment"
                    className="text-base"
                    placeholder="Комментарий к заказу"
                    rows={5}
                />
            </div>
        </WhiteBlock>
    )
}