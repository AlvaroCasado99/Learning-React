/**
 * CREACIÓN DEL REDUCER ----
 * El termino 'reducer' proviene de la idea de reducir en cocina, es decir, 
 * concentrar algo para volverlo más puro.
 * 
 * En el reducer es importante saber que lo que se devuelve es el nuevo estado
 * que pasa a tener.
 */
export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const CART_ACTIONS_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    REMOVE_ONE_FROM_CART: 'REMOVE_ONE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART' 
}


export function updateLocalStorage(cart){
    window.localStorage.setItem('cart', JSON.stringify(cart));
}

export const reducer = (state, action) => {
    const {payload: actionPayload, type: actionType} = action;
    switch(actionType){
        case CART_ACTIONS_TYPES.ADD_TO_CART: {
            const {id} = actionPayload
            const productInCart = state.findIndex(item => item.id === id);

            if(productInCart >= 0){
                const newState = structuredClone(state);  // Hace copia prtofunda
                newState[productInCart].quantity += 1;
                return newState; // Siempre devuelve el nuevo estado
            }

            const newState = [
                ...state,
                {
                    ...actionPayload,
                    quantity: 1
                }
            ]
            updateLocalStorage(newState);
            return newState;

        }

        case CART_ACTIONS_TYPES.REMOVE_FROM_CART: {
            const {id} = actionPayload
            const newState = state.filter(item => item.id!==id)
            updateLocalStorage(newState);
            return newState;
        }

        case CART_ACTIONS_TYPES.REMOVE_ONE_FROM_CART: {
            const {id} = actionPayload
            const newState = state
            .map(item => {
                if(item.id===id)    
                    item.quantity-=1
                return item
                
            })
            .filter(item => item.quantity!==0)

            updateLocalStorage(newState);
            return newState;
        }

        case CART_ACTIONS_TYPES.CLEAR_CART: {
            updateLocalStorage([]);
            return [];    // Tambien se puede devolver el initial storage si no se hace con localStorage
        }
    }
}