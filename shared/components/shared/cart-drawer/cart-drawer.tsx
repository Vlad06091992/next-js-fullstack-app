"use client"

import {FC, ReactNode, useEffect} from "react";
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,} from '@/shared/components/ui/sheet';
import {Button} from "@/shared/components";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {CartDrawerItem} from "@/shared/components/shared/cart-drawer-item/cart-drawer-item";
import {getCartItemDetails} from "@/shared/lib";
import {Ingredient} from "@prisma/client";
import {useCartStore} from "@/shared/store";


interface CartDrawerProps {
    className?: string
    children?: ReactNode;
}

export const CartDrawer: FC<CartDrawerProps> = ({className, children}) => {

    const {fetchCartItems, totalAmount, items} = useCartStore()

    useEffect(() => {
        fetchCartItems()
    }, [])


    return (<Sheet>
        <SheetTrigger asChild>
            {children}
        </SheetTrigger>
        <SheetContent className={'flex flex-col justify-between pb-0 bg-[#F4F1EE]'}>
            <SheetHeader>
                <SheetTitle>
                    В корзине <span className='font-bold'>{items.length} товара</span>
                </SheetTitle>
            </SheetHeader>

            {/* Items   */}
            <div className={"-mx-6 mt-5 overflow-auto flex-1"}>
                {items.map(item => (
                    <CartDrawerItem
                        id={item.id}
                        imageUrl={item.imageUrl}
                        name={item.name}
                        details={item.pizzaSize && getCartItemDetails(item.ingredients, item.pizzaType, item.pizzaSize)}
                        price={item.price}
                        quantity={item.quantity}/>
                ))}
                <div className={'mb-2'}>

                </div>
            </div>
            <SheetFooter className={"-mx-6 bg-white p-8"}>
                <div className={'w-full'}>
                    <div className="flex mb-4">
                        <div className="flex flex-1 text-lg text-neutral-500">
                            Итого
                            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"/>
                        </div>

                        <div className="font-bold text-lg">{totalAmount} ₽</div>
                    </div>

                    <Link href="/cart">
                        <Button
                            // onClick={() => setRedirecting(true)}
                            // loading={redirecting}
                            type="submit"
                            className="w-full h-12 text-base">
                            Оформить заказ
                            <ArrowRight className="w-5 ml-2"/>
                        </Button>
                    </Link>
                </div>

            </SheetFooter>
        </SheetContent>
    </Sheet>);
}