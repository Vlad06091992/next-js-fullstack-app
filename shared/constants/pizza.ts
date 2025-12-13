import {Variant} from "@/shared/components/shared/group-variants/group-variants";

export const mapPizzaSize = {
    20: 'Маленькая',
    30: 'Средняя',
    40: 'Большая',
} as const;

export const mapPizzaType = {
    1: 'традиционная',
    2: 'тонкая',
} as const;


export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;

export const pizzaSizes: Variant<PizzaSize>[] = [{value:20,name:'Маленькая'}, {value: 30, name: 'Средняя'},{value:40,name:'Большая'}]
export const pizzaTypes: Variant<PizzaType>[] = [{value:1,name:'Традиционная'},{value:2,name:'Тонкая'}]

