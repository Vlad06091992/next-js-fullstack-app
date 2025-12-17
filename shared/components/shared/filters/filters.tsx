"use client"

import {Input, Title} from "@/shared/components";
import {RangeSlider} from "@/shared/components/shared/range-slider/range-slider";
import {CheckboxFiltersGroup} from "@/shared/components/shared/checkbox-filters-group/checkbox-filters-group";
import {useFiltersCommon} from "@/shared/hooks";
import {useEffect} from "react";
import qs from "qs";
import {useRouter} from "next/navigation";

interface FiltersProps {
    className?: string
}

export const Filters = ({className}: FiltersProps) => {
    const {
        //loading
        loading,

        //filter data
        ingredients,
        prices: {priceTo = null, priceFrom = null},
        selectedIds,
        selectedSizes,
        selectedPizzaTypes,

        // controls
        toggleSetItem,
        updatePrice,
        setPrices,
        toggleSizes,
        togglePizzaTypes
    } = useFiltersCommon();

    const router = useRouter();
    const defaultIngredients = ingredients.slice(0, 6);


    useEffect(() => {


        const data = {
            ingredients: Array.from(selectedIds),
            sizes: Array.from(selectedSizes),
            pizzaTypes: Array.from(selectedPizzaTypes),
            priceFrom,
            priceTo
        }

        const query = qs.stringify(data, {arrayFormat: "comma", skipNulls:true});
        router.push(`?${query}`, {
            scroll: false,
        });

    }, [ingredients, selectedIds, priceTo, selectedSizes, priceFrom, selectedPizzaTypes])

    return (<div>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold"/>

            {/* Верхние чекбоксы */}
            {/*<div className={'flex flex-col gap-4'}>*/}
            {/*    <FilterCheckbox text={'Можно собирать'} value={'1'}/>*/}
            {/*    <FilterCheckbox text={'Новинки'} value={'2'}/>*/}
            {/*</div>*/}

            <CheckboxFiltersGroup
                onClickCheckbox={togglePizzaTypes}
                selectedItems={selectedPizzaTypes}
                loading={loading}
                title={'Тип теста'}
                items={[
                    {text: 'Тонкое', value: '1'},
                    {text: 'Традиционное', value: '2'}
                ]}
                className={'mt-5'}
            />

            <CheckboxFiltersGroup
                onClickCheckbox={toggleSizes}
                selectedItems={selectedSizes}
                loading={loading}
                title={'Размеры'}
                items={[
                    {text: '20см', value: '20'},
                    {text: '30см', value: '30'},
                    {text: '40см', value: '40'},
                ]}
                className={'mt-5'}
            />

            {/* Фильтр цен */}
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        value={String(priceFrom)}
                        onChange={(e) => {
                            updatePrice("priceFrom", +e.target.value)
                        }}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={1000}
                        placeholder="1000"
                        value={String(priceTo)}
                        onChange={(e) => {
                            updatePrice("priceTo", +e.target.value)
                        }}
                    />
                </div>

                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[priceFrom || 0, priceTo || 1000]}
                    onValueChange={([priceFrom, priceTo]) => {
                        setPrices({priceFrom, priceTo});
                    }}
                />
            </div>

            <CheckboxFiltersGroup
                onClickCheckbox={toggleSetItem}
                selectedItems={selectedIds}
                loading={loading}
                title={'Ингридиенты'}
                items={ingredients}
                defaultItems={defaultIngredients}
                className={'mt-5'}
            />

        </div>
    );
}

