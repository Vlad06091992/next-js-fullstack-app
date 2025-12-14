import {useEffect, useState} from "react";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";
import {Variant} from "@/shared/components/shared/group-variants/group-variants";
import {useSet} from "react-use";
import {getAvailablePizzaSizes} from "@/shared/lib";
import {ProductItem} from "@prisma/client";

export interface PizzaOptions {
    size: PizzaSize;
    type: PizzaType;
    selectedIngredients:Set<string>;
    setSize: (size: PizzaSize) => void;
    addIngredient: (ingredientId: string) => void;
    setType: (type: PizzaType) => void;
    availablePizzaSizes:Variant<PizzaSize>[]
}

export const usePizzaOptions = (  items: ProductItem[]):PizzaOptions => {

    const [size, setSize] = useState<PizzaSize>(20)
    const [type, setType] = useState<PizzaType>(1)
    const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<string>([]));

    const availablePizzaSizes = getAvailablePizzaSizes(items, type)

    useEffect(() => {
        const isAvailableSize = availablePizzaSizes?.find(item => Number(item.value) === size && !item.disabled)
        const availableSize = availablePizzaSizes?.find(item => !item.disabled)

        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize)
        }

    }, [type])

    return {size,type, setSize,setType,selectedIngredients,addIngredient,availablePizzaSizes}

}