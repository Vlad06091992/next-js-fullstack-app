"use client"

import {FC} from "react";
import {Button, CartDrawer} from "@/shared/components";
import {ArrowRight, ShoppingCart} from "lucide-react";
import {useCartStore} from "@/shared/store";
import {cn} from "@/shared/lib/utils";

interface CartButtonProps {
    className?: string
}

export const CartButton: FC<CartButtonProps> = ({className}) => {

    const {totalAmount,loading,items} = useCartStore()

    return (
        <CartDrawer>
        <Button disabled={loading} loading={loading} className={cn("group relative", {'w-[105px]':loading}, className)}>
            <b>{totalAmount} р</b>
            <span className="h-full w-[1px] bg-white/30 mx-3"/>
            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart size={16} className="relative" strokeWidth={2}/>
                <b>{items.length}</b>
            </div>
            <ArrowRight
                size={20}
                className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
            />
        </Button>
        </CartDrawer>
    );
}

// export const CartButton: FC<CartButtonProps> = ({className}) => {
//     return (<div className={cn('group relative', className)}>
//         <Button className={"group relative"}>
//             <b>520 р</b>
//             <span className="h-full w-[1px] bg-white/30 mx-3"/>
//             <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
//                 <ShoppingCart size={16} className="relative" strokeWidth={2}/>
//                 <b>3</b>
//             </div>
//             <ArrowRight
//                 size={20}
//                 className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
//             />
//         </Button>
//     </div>);
// }