import {FC} from 'react'
import {cn} from '@/shared/lib/utils';
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";
import {Ingredient} from "@prisma/client";

interface CartItemInfoProps {
    name: string;
    details?: string;
    pizzaSize?:PizzaSize
    type?: PizzaType;
    ingredients?: Ingredient[];
}

export const CartItemInfo: FC<CartItemInfoProps> = ({ name, details }) => {

    return (
        <div>
            <div className={cn('flex items-center justify-between')}>
                <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
            </div>
            {details && <p className="text-xs text-gray-400 w-[90%]">{details}</p>}
        </div>
    );
};

