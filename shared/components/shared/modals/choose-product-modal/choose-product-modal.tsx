"use client"

import {FC} from "react";
import {cn} from "@/shared/lib/utils";
import {ChoosePizzaForm, ChooseProductForm, Title} from "@/shared/components";
import {Dialog, DialogContent} from "@/shared/components/ui/dialog";
import {useRouter} from "next/navigation";
import {ProductWithRelations} from "@/prisma/types";
import {useCartStore} from "@/shared/store";
import toast from "react-hot-toast";

interface ChooseProductModalProps {
    product: ProductWithRelations
    className?: string
}

export const ChooseProductModal: FC<ChooseProductModalProps> = ({className, product}) => {

    const router = useRouter()
    const isPizzaForm = Boolean(product.items?.[0]?.pizzaType)
    const firstItem = product.items[0]
    const backToMain = () => router.back();

    // const {addCartItem} = useCartStore()
    // const [addCartItem,loading]  = useCartStore(state => [state.addCartItem,state.loading])
    const {addCartItem, loading} = useCartStore()
    const name = product.name

    const onSubmit = async (productItemId?: string, ingredients?: string[]) => {
        const itemId = productItemId ?? firstItem.id
        try {
            await addCartItem({
                productItemId: itemId!,
                ingredients
            })

            toast.success(`${name} добавлена в корзину`)
            router.back()

        } catch (e) {
            toast.error(`Не удалось добавить товар в корзину`)
            console.error(e)
            router.back()
        }

    }


    return (<div className={cn('', className)}>
        <Dialog open={Boolean(product)} onOpenChange={backToMain}>
            <DialogContent className={cn(
                'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                className,
            )}>

                {isPizzaForm ?
                    <ChoosePizzaForm
                        loading={loading}
                        size={30}
                        price={300}
                        imageUrl={product.imageUrl}
                        name={product.name}
                        ingredients={product.ingredients}
                        items={product.items}
                        onSubmit={onSubmit}/> :
                    <ChooseProductForm
                        loading={loading}
                        price={firstItem.price}
                        imageUrl={product.imageUrl}
                        name={product.name}
                        onSubmit={onSubmit}/>}
            </DialogContent>
        </Dialog>
    </div>);
}