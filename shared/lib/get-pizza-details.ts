import {PizzaPriceCalculatorArgs, pizzaPriceCalculator} from "./pizza-price-calculator-args";
import {mapPizzaType} from "../constants/pizza";

export const getPizzaDetails = ({items, size, type, ingredients, selectedIngredients}:PizzaPriceCalculatorArgs) => {
    const totalPrice = pizzaPriceCalculator({items, size, type, ingredients, selectedIngredients})
    // const size = 30
    const textDetails = `${size} см,${mapPizzaType[type]} пицца`
    // const textDetails = "30 см, традионное тесто 30"

    return {textDetails,totalPrice}

}