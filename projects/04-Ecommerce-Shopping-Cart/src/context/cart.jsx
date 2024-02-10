/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useCartReducer } from "../hooks/useCartReducer";

/**
 * PASOS PARA CREAR Y UTILIZAR UN USECONTEXT
 * 1.  Crear el contexto mediante el método createContext().
 * 2.  Crear el 'provider' que gestiona la porción del código con acceso al contexto.
 * 3.  Envolver la porción del código que empleará el contexto dentro del 'provider'.
 * 4.  Crear un customHook que maneje el contexto creado (en este caso CartContext)
 * 5.  Usar el customHook dentro del código.
 */

//  1. Creación del contexto: (Es Singleton)
export const CartContext = createContext();

//  2. Creación del Provider
export function CartProvider({children}) {
    
    const {state, addToCart, removeFromCart, removeOneFromCart, clearCart} = useCartReducer();
    
    /**
     * Esta sería la forma de hacerlo sin el useReducer
     */
    // const [cart, setCart] = useState([]);
    // const addToCart = product => {
    //     /**
    //      * Esta forma no vale porque solo se estaría haciendo una copia superficial
    //      * del carrito, además de que no permite acumular productos iguales. Las 
    //      * copias superficiales mantienen la referencia a memoria de los elementos esto
    //      * puede causar problemas a fututo si alguno de ellos cambia
    //      */
    //     // setCart([
    //     //     ...cart,
    //     //     product
    //     // ])

    //     /**
    //      * En su lugar debemos hacer una copia profunda que asigne nuevos espacios de
    //      * memoria tanto a los elementos del array como al array que apunta a todos ellos.
    //      */
    //     // 1. Buscar producto dentro del array
    //     const productInCart = cart.findIndex(item => item.id === product.id);

    //     // 2. Si está asignar +1 a la propiedad 'Quantity' del producto.
    //     if(productInCart >= 0){
    //         const newCart = structuredClone(cart);  // Hace copia prtofunda
    //         newCart[productInCart].quantity += 1;
    //         return setCart(newCart);
    //     }

    //     //3. Si no está en el carrito añadimos el nuevo producto y asignamos 1 a la cantidad
    //     setCart(prevState => ([
    //         ...prevState,
    //         {
    //             ...product,
    //             quantity: 1
    //         }
    //     ]))

    // };
    // const clearCart = () => {
    //     setCart([])
    // };
    // const removeFromCart = (product) => {
    //     setCart(prevState => prevState.filter(item => item.id!==product.id))
    // }
    // const removeOneFromCart = (product) => {
    //     setCart(prevState => (
    //         prevState
    //         .map(item => {
    //             if(item.id===product.id)    
    //                 item.quantity-=1
    //             return item
                
    //         })
    //         .filter(item => item.quantity!==0)
    //     ))
    // }

    return(
        <CartContext.Provider
            value={{
                cart: state,
                addToCart,
                clearCart,
                removeFromCart,
                removeOneFromCart
            }}>
            {children}
        </CartContext.Provider>
    )
}

