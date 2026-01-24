"use client"
import {CheckoutItem, Container, Input, Textarea, Title, WhiteBlock} from "@/shared/components";
import {useCart} from "@/shared/hooks";
import {getCartItemDetails} from "@/shared/lib";
import {Variant} from "@/shared/components/shared/cart-item-details/types";
import {CheckoutSidebar} from "@/shared/components/shared/checkout-sidebar/checkout-sidebar";

const VAT = 15
const DELIVERY_PRICE = 260

export default function CheckoutPage() {

    const {updateItemQuantity, removeCartItem, totalAmount, items} = useCart();

    const onClickCountButton = (cartItemId: string, count: number, type: Variant) => {
        const newValue = type === 'plus' ? count + 1 : count - 1
        updateItemQuantity(cartItemId, newValue)
    };

    const onClickRemoveItem = (cartItemId: string) => {
        removeCartItem(cartItemId)
    };

    const vat_price = (totalAmount * VAT) / 100;
    const totalPrice = totalAmount + DELIVERY_PRICE + vat_price;

    return (
        <Container className={'mt-5'}>
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]"/>

            <div className={'flex gap-10'}>
                <div className={'flex flex-col gap-10 flex-1 mb-20'}>
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
                    <WhiteBlock title="2. Персональная информация">
                        <div className="grid grid-cols-2 gap-5">
                            <Input name="firstName" className="text-base" placeholder="Имя"/>
                            <Input name="lastName" className="text-base" placeholder="Фамилия"/>
                            <Input name="email" className="text-base" placeholder="E-Mail"/>
                            <Input name="phone" className="text-base" placeholder="Телефон"/>
                        </div>
                    </WhiteBlock>

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

                </div>

                <div className={'w-[450px]'}>
                    <CheckoutSidebar totalAmount={totalAmount}
                    // loading={loading || submitting}
                    />

                </div>
            </div>


        </Container>
    )
}