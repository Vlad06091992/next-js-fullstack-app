import {cn} from "@/shared/lib/utils";


interface CategoriesProps {
    className?:string

}

const cats = ['Пицца',"Комбо","Закуски","Коктейли","Кофе","Напитки","Десерты"]
const activeIndex= 0;

export const Categories = ({ className }:CategoriesProps) => {
    return (<div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl",className)}>
        {cats.map((cat, index) => (
            <a key={index} className={cn('flex items-center font-bold h-11 rounded-2xl px-5',{'bg-white shadow-md shadow-gray-200 text-primary':activeIndex === index})}>
                <button>{cat}</button>
            </a>
        ))}
    </div>);
}

