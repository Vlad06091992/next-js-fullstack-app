'use client'

import {notFound} from "next/navigation";
import {useCartStore} from "@/shared/store";
import toast from "react-hot-toast";
import {ChoosePizzaForm, ChooseProductForm} from "@/shared/components";
import {ProductWithRelations} from "@/prisma/types";

interface ProductFormProps {
    product: ProductWithRelations;
    onSubmit?: VoidFunction;
}

export const ProductForm = ({product, onSubmit:onSubmitFromProps}:ProductFormProps) => {
    const {addCartItem, loading} = useCartStore()
    const name = product?.name

    let firstItem = product?.items?.[0];
    const isPizzaForm = Boolean(firstItem?.pizzaType)


    const onSubmit = async (productItemId?: string, ingredients?: string[]) => {
        const itemId = productItemId ?? firstItem?.id
        try {
            await addCartItem({
                productItemId: itemId!,
                ingredients
            })

            toast.success(`${name} добавлена в корзину`)
            onSubmitFromProps?.();

        } catch (e) {
            toast.error(`Не удалось добавить товар в корзину`)
            console.error(e)
            onSubmitFromProps?.();
        }

    }

    if (!product) {
        return notFound();
    }

    if (isPizzaForm) {
        return (
            <ChoosePizzaForm
                imageUrl={product.imageUrl}
                size={30}
                price={300}
                name={product.name}
                ingredients={product.ingredients}
                items={product.items}
                onSubmit={onSubmit}
                loading={loading}
            />
        );
    }

    return (
        <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={onSubmit}
            price={firstItem?.price}
            loading={loading}
        />
    );
}