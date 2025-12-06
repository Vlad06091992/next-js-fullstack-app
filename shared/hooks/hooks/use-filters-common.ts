import {Api} from '@/shared/services/api-client';
import {useEffect, useState} from 'react';
import {useSet} from "react-use";
import {useSearchParams} from "next/navigation";

interface IngredientItem {
    value: string;
    text: string;
}

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface ReturnProps {
    selectedIds: Set<string>,
    selectedSizes: Set<string>,
    selectedPizzaTypes: Set<string>,
    ingredients: IngredientItem[],
    loading: boolean,
    toggleSetItem: (id: string) => void,
    toggleSizes: (id: string) => void,
    togglePizzaTypes: (id: string) => void,
    prices: PriceProps,
    updatePrice: (name: keyof PriceProps, value: number) => void
    setPrices: (prices: PriceProps) => void
}

interface QueryFilters {
    ingredients: string;
    sizes: string,
    pizzaTypes: string,
    priceFrom?: string,
    priceTo?: string,
}

const getDataOrUndefined = (data: keyof QueryFilters, params: Map<keyof QueryFilters, string>): string[] | undefined => {
    return params.get(`${data}`) ? params.get(`${data}`)?.split(',') : undefined;

}

//TODO Декомпозировать
export const useFiltersCommon = (): ReturnProps => {
    const params = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
    let pizzaTypesFromUrl = getDataOrUndefined('pizzaTypes',params);
    let sizesFromUrl = getDataOrUndefined('sizes',params);
    let ingredientsFromUrl = getDataOrUndefined('ingredients',params);

    const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [prices, setPrices] = useState<PriceProps>(
        {
            priceFrom: Number(params.get('priceFrom')) ?? undefined,
            priceTo: Number(params.get('priceTo')) ?? undefined
        }
    );
    const [set, {toggle: toggleSetItem}] = useSet<string>(new Set(ingredientsFromUrl))
    const [sizes, {toggle: toggleSizes}] = useSet<string>(new Set(sizesFromUrl));
    const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet<string>(new Set(pizzaTypesFromUrl))

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices(prev => ({...prev, [name]: value}))
    }


    useEffect(() => {
        (async function fetchIngredients() {
            try {
                setLoading(true);
                const ingredients = await Api.ingredients.getAll();
                const map = ingredients.map(item => ({value: item.id, text: item.name}));

                setIngredients(map);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        })()
    }, []);

    return {
        toggleSetItem,
        togglePizzaTypes,
        toggleSizes,
        selectedIds: set,
        selectedSizes: sizes,
        selectedPizzaTypes: pizzaTypes,
        ingredients,
        loading,
        prices,
        setPrices,
        updatePrice
    };
};
