"use client"

import {cn} from '@/shared/lib/utils';
import React, {useEffect, useState} from 'react';
import {Title} from '../title/title';
import {Button} from '../../ui';
import {IngredientItem, PizzaImage} from "@/shared/components";
import {Ingredient, ProductItem} from "@prisma/client";
import {GroupVariants, Variant} from "@/shared/components/shared/group-variants/group-variants";
import {mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes} from "@/shared/constants/pizza";
import {useSet} from "react-use";

interface Props {
    imageUrl: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    size: 20 | 30 | 40;
    name: string;
    price: number;
    loading?: boolean;
    onSubmit?: VoidFunction;
    className?: string;
}

/**
 * Форма выбора Пиццы
 */
export const ChoosePizzaForm: React.FC<Props> = (
    {
        name,
        // size,
        imageUrl,
        ingredients,
        items,
        price,
        onSubmit,
        className,
        loading,
    }) => {
    const [size, setSize] = useState<PizzaSize>(20)
    const [type, setType] = useState<PizzaType>(1)
    const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<string>([]));

    const ingredientsTotalPrice = ingredients.reduce((total, ingredient) => {

        if (selectedIngredients.has(ingredient.id)) {
            total = total + ingredient.price;
        }

        return total;
    }, 0);

    const pizzaPrice = items.find(item => item.pizzaType === type && item.size === size)

    const totalPrice = (pizzaPrice?.price || 0) + ingredientsTotalPrice
    // const size = 30
    const textDetaills = `${size} см,${mapPizzaType[type]} пицца`
    // const textDetaills = "30 см, традионное тесто 30"

    const filteredPizzasByType = items.filter(item => item.pizzaType === type)
    const availablePizzaSizes = pizzaSizes.map(item =>
        ({
            disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
            name: item.name,
            value: item.value
        }))

    const onClick = () => {
        console.debug({
            size, type, selectedIngredients,
        })
        onSubmit?.()
    }

    useEffect(() => {
        const isAvailableSize = availablePizzaSizes?.find(item => Number(item.value) === size && !item.disabled)
        const availableSize = availablePizzaSizes?.find(item => !item.disabled)

        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize)
        }

    }, [type])

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage name={name} imageUrl={imageUrl} size={size}/>
            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1"/>
                <p className="text-gray-400">{textDetaills}</p>

                <div className={'flex flex-col gap-4 mt-5'}>
                    <GroupVariants<PizzaSize> items={availablePizzaSizes} value={size}
                                              onClick={(value) => setSize(value)}/>
                    <GroupVariants<PizzaType> items={pizzaTypes} value={type} onClick={(value) => setType(value)}/>
                </div>


                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
                    <div className={'grid grid-cols-3 gap-5'}>
                        {ingredients.map(ingredient => (
                            <IngredientItem
                                imageUrl={ingredient.imageUrl}
                                name={ingredient.name}
                                price={ingredient.price}
                                active={selectedIngredients.has(ingredient.id)}
                                onClick={() => addIngredient(ingredient.id)}
                            />

                        ))}
                    </div>
                </div>


                <Button
                    // loading={true}
                    onClick={onClick}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
