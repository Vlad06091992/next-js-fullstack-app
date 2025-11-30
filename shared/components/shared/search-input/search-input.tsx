"use client"

import {ChangeEvent, FC, useRef, useState} from "react";
import {cn} from "@/shared/lib/utils";
import {Search} from "lucide-react";
import {useDebounce} from "@/shared/utils/useDebounce";
import {useClickAway} from "react-use";
import Link from "next/link";
import {Api} from "@/shared/services/api-client";
import {Product} from "@prisma/client";

interface SearchInputProps {
    className?: string
}

export const SearchInput: FC<SearchInputProps> = ({className}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [focused, setFocused] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const ref = useRef(null);

    useClickAway(ref, () => {
        setFocused(false);
    });

    useDebounce(async () => {
            const result = await Api.products.search(searchQuery)
            setProducts(result)
        }, 700,[searchQuery])

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)
    }

    const onClickItem = () => {
        setSearchQuery('')
        setFocused(false)
        setProducts([])
    }

    return (

        <>
            {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"/>}


            <div
                ref={ref}
                className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}>
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400"/>
                <input
                    onChange={inputHandler}
                    onFocus={() => setFocused(true)}
                    className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
                    type="text"
                    placeholder="Найти пиццу..."
                    value={searchQuery}
                />
                {products.length > 0 && (
                    <div
                        className={cn(
                            'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                            focused && 'visible opacity-100 top-12',
                        )}>
                        {products.map((product: any) => (
                            <Link
                                onClick={onClickItem}
                                key={product.id}
                                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                                href={`/product/${product.id}`}>
                                <img className="rounded-sm h-8 w-8"
                                     src={"https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"}
                                     alt={'Пицца 1'}/>
                                <span>{product.name}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>);
}