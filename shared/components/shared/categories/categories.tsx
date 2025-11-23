"use client"

import {cn} from "@/shared/lib/utils";
import {useCategoryStore} from "@/shared/store";


interface CategoriesProps {
    className?:string

}

const cats = [
    { id: 1, name: 'Пицца' },
    { id: 2, name: 'Комбо' },
    { id: 3, name: 'Закуски' },
    { id: 4, name: 'Коктейли' },
    { id: 5, name: 'Кофе' },
    { id: 6, name: 'Напитки' },
    { id: 7, name: 'Десерты' }
]
// const activeIndex= 0;

export const Categories = ({ className }:CategoriesProps) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId);
// debugger

    console.debug("categoryActiveId", categoryActiveId);

    return (<div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl",className)}>
        {cats.map(({name,id}, index) => (
            <a key={index}
               href={`#${name}`}
               className={cn('flex items-center font-bold h-11 rounded-2xl px-5',{'bg-white shadow-md shadow-gray-200 text-primary':categoryActiveId === id})}>
                <button>{name}</button>
            </a>
        ))}
    </div>);
}

