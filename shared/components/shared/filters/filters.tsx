// "use client"

import {Input, Title} from "@/shared/components";
import {FilterCheckbox} from "@/shared/components/shared/filter-checkbox/filter-checkbox";
import {RangeSlider} from "@/shared/components/shared/range-slider/range-slider";
import {CheckboxFiltersGroup} from "@/shared/components/shared/checkbox-filters-group/checkbox-filters-group";

interface FiltersProps {
    className?: string

}

export const Filters = ({className}: FiltersProps) => {
    return (<div>
        <Title text="Фильтрация" size="sm" className="mb-5 font-bold"/>

        {/* Верхние чекбоксы */}
        <div className={'flex flex-col gap-4'}>
            <FilterCheckbox text={'Можно собирать'} value={'1'}/>
            <FilterCheckbox text={'Новинки'} value={'2'}/>
        </div>

        {/* Фильтр цен */}
        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Цена от и до:</p>
            <div className="flex gap-3 mb-5">
                <Input
                    type="number"
                    placeholder="0"
                    min={0}
                    max={1000}
                    // value={String(filters.prices.priceFrom)}
                    // onChange={(e) => {}}
                />
                <Input
                    type="number"
                    min={100}
                    max={1000}
                    placeholder="1000"
                    // value={String(filters.prices.priceTo)}
                    // onChange={(e) => {}}
                />
            </div>

            <RangeSlider
                min={0}
                max={1000}
                step={10}
                value={[300, 700]}
                // value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
                // onValueChange={updatePrices}
            />
        </div>

        <CheckboxFiltersGroup
            title={'Ингридиенты'}
            items={[
                {text: 'Сырный соус', value: '1'},
                {text: 'Моцарелла', value: '2'},
                {text: 'Чеснок', value: '3'},
                {
                    text: 'Соленые огурчики',
                    value: '4'
                },
                {text: 'Красный лук', value: '5'},
                {text: 'Томаты', value: '6'},
                {text: 'Сырный соус', value: '1'},
                {text: 'Моцарелла', value: '2'},
                {text: 'Чеснок', value: '3'},
                {
                    text: 'Соленые огурчики',
                    value: '4'
                },
                {text: 'Красный лук', value: '5'},
                {text: 'Томаты', value: '6'},    {text: 'Сырный соус', value: '1'},
                {text: 'Моцарелла', value: '2'},
                {text: 'Чеснок', value: '3'},
                {
                    text: 'Соленые огурчики',
                    value: '4'
                },
                {text: 'Красный лук', value: '5'},
                {text: 'Томаты', value: '6'}
            ]}
            defaultItems={[
                {text: 'Сырный соус', value: '1'},
                {text: 'Моцарелла', value: '2'},
                {text: 'Чеснок', value: '3'},
                {
                    text: 'Соленые огурчики',
                    value: '4'
                },
                {text: 'Красный лук', value: '5'},
                {text: 'Томаты', value: '6'}
            ]}
            className={'mt-5'}
        />

    </div>);
}

