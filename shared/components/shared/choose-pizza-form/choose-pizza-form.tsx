"use client"

import {cn} from '@/shared/lib/utils';
import React, {useEffect} from 'react';
import {Title} from '../title/title';
import {Button} from '../../ui';
import {IngredientItem, PizzaImage} from "@/shared/components";
import {Ingredient, ProductItem} from "@prisma/client";
import {GroupVariants} from "@/shared/components/shared/group-variants/group-variants";
import {PizzaSize, PizzaType, pizzaTypes} from "@/shared/constants/pizza";
import {getPizzaDetails} from "@/shared/lib";
import {usePizzaOptions} from "@/shared/hooks/use-pizza-options";

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

    const {setSize,size,setType,type,selectedIngredients,addIngredient,availablePizzaSizes} = usePizzaOptions(items)
    const {totalPrice,textDetails} = getPizzaDetails({items,size,type,selectedIngredients,ingredients})


    const onClick = () => {
        console.debug({
            size, type, selectedIngredients,
        })
        onSubmit?.()
    }

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage name={name} imageUrl={imageUrl} size={size}/>
            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1"/>
                <p className="text-gray-400">{textDetails}</p>

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
