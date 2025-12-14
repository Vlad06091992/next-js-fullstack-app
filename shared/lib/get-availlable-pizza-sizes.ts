import {PizzaSize, pizzaSizes, PizzaType} from "@/shared/constants/pizza";
import {ProductItem} from "@prisma/client";
import {Variant} from "@/shared/components/shared/group-variants/group-variants";

export const getAvailablePizzaSizes = (items:ProductItem[],type:PizzaType):Variant<PizzaSize>[] => {
    const filteredPizzasByType = items.filter(item => item.pizzaType === type)
    return pizzaSizes.map(item =>
        ({
            disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
            name: item.name,
            value: item.value
        }))
}