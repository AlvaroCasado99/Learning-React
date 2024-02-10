import { useReducer } from "react"
import { reducer, cartInitialState, CART_ACTIONS_TYPES } from "../reducers/cart.js"

export function useCartReducer(){
    /**
     * -> El dispatch será el elemento que se encargue de enviar las acciones al reducer
     * 
     * Vale la pena emplear un useReducer en lugar de un useState porque:
     * 1. Toda la lógica de actualizar el estado se encuentra en una función 
     * separada.
     * 2. Al tener la lógica separada es más fácil testearla, pues no se necesita
     * renderizar nada. Otra razón por la que el initialState y el reducen deven 
     * crearse fuera del componente.
     */
    const [state, dispatch] = useReducer(reducer, cartInitialState)

    const addToCart = product => dispatch({
        type: CART_ACTIONS_TYPES.ADD_TO_CART,
        payload: product
    })

    const removeFromCart = product => dispatch({
        type: CART_ACTIONS_TYPES.REMOVE_FROM_CART,
        payload: product
    })

    const removeOneFromCart = product => dispatch({
        type: CART_ACTIONS_TYPES.REMOVE_ONE_FROM_CART,
        payload: product
    })

    const clearCart = () => dispatch({
        type: CART_ACTIONS_TYPES.CLEAR_CART
    })

    return {state, addToCart, removeFromCart, removeOneFromCart, clearCart}
}