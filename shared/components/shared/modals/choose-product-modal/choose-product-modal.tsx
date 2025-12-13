"use client"

import {FC} from "react";
import {cn} from "@/shared/lib/utils";
import {ChoosePizzaForm, ChooseProductForm, Title} from "@/shared/components";
import {Dialog, DialogContent} from "@/shared/components/ui/dialog";
import {useRouter} from "next/navigation";
import {ProductWithRelations} from "@/@types/prisma";

interface ChooseProductModalProps {
    product: ProductWithRelations
    className?: string
}

export const ChooseProductModal: FC<ChooseProductModalProps> = ({className, product}) => {

    const router = useRouter()
    const isPizzaForm = Boolean(product.items?.[0]?.pizzaType)
    const backToMain = ()=>router.back();

    return (<div className={cn('', className)}>
        <Dialog open={Boolean(product)} onOpenChange={backToMain}>
            <DialogContent className={cn(
                'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                className,
            )}>

                {isPizzaForm ?
                    <ChoosePizzaForm size={30} price={300} imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} onSubmit={()=>{}}/> :
                    <ChooseProductForm imageUrl={product.imageUrl} name={product.name} onSubmit={()=>{}}/>}

            </DialogContent>
        </Dialog>
    </div>);
}