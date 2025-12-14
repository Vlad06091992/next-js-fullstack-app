import {Ingredient, ProductItem} from "@prisma/client";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";

export interface PizzaPriceCalculatorArgs {
    ingredients: Ingredient[];
    selectedIngredients: Set<string>;
    items: ProductItem[];
    type: PizzaType;
    size: PizzaSize;
}

/**
 * Вычисляет общую стоимость пиццы на основе выбранных параметров
 *
 * @function pizzaPriceCalculator
 * @description Функция рассчитывает финальную стоимость пиццы, складывая базовую стоимость
 *              пиццы выбранного типа и размера с дополнительной стоимостью выбранных ингредиентов.
 *
 * @param {PizzaPriceCalculatorArgs} params - Объект с параметрами для расчета стоимости
 * @param {Ingredient[]} params.ingredients - Массив всех доступных ингредиентов с их ценами
 * @param {Set<string>} params.selectedIngredients - Set идентификаторов выбранных пользователем ингредиентов
 * @param {ProductItem[]} params.items - Массив продуктов (пицц) с базовыми ценами для разных типов и размеров
 * @param {PizzaType} params.type - Тип пиццы (например, "тонкое тесто", "традиционное")
 * @param {PizzaSize} params.size - Размер пиццы (например, "маленькая", "средняя", "большая")
 *
 * @returns {number} Общая стоимость пиццы в числовом формате. Возвращает 0, если не найдена базовая цена пиццы.
 *
 * @example
 * // Пример использования функции
 * const totalPrice = pizzaPriceCalculator({
 *   ingredients: [
 *     { id: "1", name: "Сыр", price: 50 },
 *     { id: "2", name: "Пепперони", price: 80 }
 *   ],
 *   selectedIngredients: new Set(["1", "2"]),
 *   items: [
 *     { pizzaType: "thin", size: "medium", price: 300 },
 *     { pizzaType: "traditional", size: "medium", price: 350 }
 *   ],
 *   type: "thin",
 *   size: "medium"
 * });
 * // totalPrice = 300 + 50 + 80 = 430
 *
 * @throws {TypeError} Если параметры имеют неверный тип (неявно, через операции JavaScript)
 *
 * @remarks
 * - Функция использует Set для выбранных ингредиентов для оптимальной проверки наличия O(1)
 * - Если базовая пицца не найдена в массиве items, её цена считается равной 0
 * - Функция не учитывает скидки или промокоды - это должно быть обработано на более высоком уровне
 *
 * @see {@link PizzaPriceCalculatorArgs} Интерфейс параметров функции
 * @see {@link Ingredient} Модель ингредиента из Prisma
 * @see {@link ProductItem} Модель продукта из Prisma
 * @see {@link PizzaType} Типы пиццы
 * @see {@link PizzaSize} Размеры пиццы
 */
export const pizzaPriceCalculator = (
    {
        ingredients,
        selectedIngredients,
        items,
        type,
        size
    }: PizzaPriceCalculatorArgs): number => {

    const ingredientsTotalPrice = ingredients.reduce((total, ingredient) => {
        if (selectedIngredients.has(ingredient.id)) {
            total = total + ingredient.price;
        }
        return total;
    }, 0);

    const pizzaPrice = items.find(item => item.pizzaType === type && item.size === size);

    return (pizzaPrice?.price || 0) + ingredientsTotalPrice;
}