import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 5,
    error: false,
    building: false
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedState);

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    //[action.ingredientName] es ar aris array
                    //ES6 is syntacia mag: cheese: 0 + 1 ese gadaawers
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
                building: true
            };
        case actionTypes.SET_INGREDIENTS:
            const sum = Object.keys(action.ingredients)
                .map(igKey => {
                    return action.ingredients[igKey] * INGREDIENT_PRICE[igKey]
                }).reduce((sum, el) => {
                    return sum + el
                }, 0);
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 5 + sum,
                building: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }

};

export default reducer;