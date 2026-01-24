"use client"

import {FC, ReactNode, useState} from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/shared/components/ui/sheet';
import {Button, Title} from "@/shared/components";
import Link from "next/link";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {CartDrawerItem} from "@/shared/components/shared/cart-drawer-item/cart-drawer-item";
import {getCartItemDetails} from "@/shared/lib";
import {Variant} from "@/shared/components/shared/cart-item-details/types";
import Image from "next/image";
import EmptyBox from '@/public/assets/images/empty-box.png'
import {useCart} from "@/shared/hooks";


interface CartDrawerProps {
    className?: string
    children?: ReactNode;
}

export const CartDrawer: FC<CartDrawerProps> = ({className, children}) => {

    const {updateItemQuantity, removeCartItem, totalAmount, items} = useCart();
    const [redirecting,setRedirecting] = useState(false);


    const onClickCountButton = (cartItemId: string, count: number, type: Variant) => {
        const newValue = type === 'plus' ? count + 1 : count - 1
        updateItemQuantity(cartItemId, newValue)
    };

    const onClickRemoveItem = (cartItemId: string) => {
        removeCartItem(cartItemId)
    };

    return (<Sheet>
        <SheetTrigger asChild>
            {children}
        </SheetTrigger>
        <SheetContent className={'flex flex-col justify-between pb-0 bg-[#F4F1EE]'}>


            {!totalAmount && <div className={'flex flex-col justify-center items-center w-72 my-auto'}>
                <Image src={EmptyBox} alt={"Empty card"} width={120} height={120}/>
                <Title size="sm" text="Корзина пустая" className="text-center font-bold my-2"/>
                <p className="text-center text-neutral-500 mb-5">
                    Добавьте хотя бы одну пиццу, чтобы совершить заказ
                </p>

                <SheetClose>
                    <Button className="w-56 h-12 text-base" size="lg">
                        <ArrowLeft className="w-5 mr-2" />
                        Вернуться назад
                    </Button>
                </SheetClose>
            </div>}

            {totalAmount > 0 && <SheetHeader>
                <SheetTitle>
                    В корзине <span className='font-bold'>{items.length} товара</span>
                </SheetTitle>
            </SheetHeader>}


            {totalAmount > 0 && <>
                {/* Items   */}
                <div className={"-mx-6 mt-5 overflow-auto flex-1"}>
                    {items.map(item => {
                        return (
                            <CartDrawerItem
                                disabled={item.disabled}
                                className={'mb-2'}
                                key={item.id}
                                onClickRemove={() => onClickRemoveItem(item.id)}
                                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                id={item.id}
                                imageUrl={item.imageUrl}
                                name={item.name}
                                details={getCartItemDetails(item.ingredients, item.pizzaType, item.pizzaSize)}
                                price={item.price}
                                quantity={item.quantity}/>
                        );
                    })}

                </div>
                <SheetFooter className={"-mx-6 bg-white p-8"}>
                    <div className={'w-full'}>
                        <div className="flex mb-4">
                            <div className="flex flex-1 text-lg text-neutral-500">
                                Итого
                                <div
                                    className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"/>
                            </div>

                            <div className="font-bold text-lg">{totalAmount} ₽</div>
                        </div>

                        <Link href="/checkout">
                            <Button
                                onClick={() => setRedirecting(true)}
                                loading={redirecting}
                                // type="submit"
                                className="w-full h-12 text-base">
                                Оформить заказ
                                <ArrowRight className="w-5 ml-2"/>
                            </Button>
                        </Link>
                    </div>

                </SheetFooter>
            </>

            }


        </SheetContent>
    </Sheet>);
}