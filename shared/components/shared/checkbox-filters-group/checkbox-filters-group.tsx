"use client"

import {cn} from "@/shared/lib/utils";
import {FilterChecboxProps, FilterCheckbox} from "../filter-checkbox/filter-checkbox";
import {Input} from "@/shared/components";
import {FC, useState} from "react";
import {Skeleton} from "@/shared/components/ui";

interface CheckboxFiltersGroupProps {
    className?: string
    title?: string
    items: FilterChecboxProps[]
    limit?: number
    loading?: boolean,
    searchInputPlaceholder?: string
    selectedItems: Set<string>
    defaultItems?: FilterChecboxProps[]
    defaultValue?: string[]
    onChange?: (values: string[]) => void,
    onClickCheckbox?: (id: string) => void,
}

export const CheckboxFiltersGroup: FC<CheckboxFiltersGroupProps> = (
    {
        title,
        items,
        defaultItems,
        limit = 5,
        loading,
        searchInputPlaceholder = 'Поиск...',
        className,
        onClickCheckbox,
        selectedItems,
    }) => {

    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    if(loading){

        const array = new Array(limit).fill(null)
        return (
            <div className={className}>
                <p className={'font-bold mb-3'}>{title}</p>
                {array.map(_ =>(<Skeleton className={'mb-5 h-4 rounded-[8px]'}  />))}
            </div>
        )
    }


    const list = showAll
        ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase()))
        : (defaultItems || items).slice(0, limit);

    return (<div className={cn('', className)}>
        <p className="font-bold mb-3">{title}</p>

        {showAll &&
            <div className="mb-5">
                <Input
                    onChange={onChangeSearchInput}
                    placeholder={searchInputPlaceholder}
                    className="bg-gray-50 border-none"/>
            </div>
        }


        <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
            {list.map((item, index) => (
                    <FilterCheckbox
                        name={item.text}
                        key={item.value}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={selectedItems.has(item.value)}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                    />
                )
            )}
        </div>

        {items.length > limit && (
            <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                    {showAll ? 'Скрыть' : '+ Показать все'}
                </button>
            </div>
        )}

    </div>);
}

