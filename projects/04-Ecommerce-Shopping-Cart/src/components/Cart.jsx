import { useId } from "react";
import { CartIcon, ClearCartIcon } from "./Icons";
import { useCart } from "../hooks/useCart";

import './Cart.css'

function CartList({cart, addToCart, removeFromCart}){
    return cart.map( product => (
        <li key={product.id}>
            
            <img 
                src={product.thumbnail}
                alt={product.title}
            />
            <div>
                <strong>{product.title}</strong> - ${product.price}
            </div>

            <footer>
                <small>Qty: {product.quantity}</small>
                <button onClick={()=>addToCart(product)}>+</button>
                <button onClick={()=>removeFromCart(product)}>-</button>
            </footer>
        </li>
    ))
}

export function Cart() {
    const {cart, addToCart, clearCart, removeOneFromCart} = useCart()
    const cartCheckBoxId = useId()

    return (
        <>
            <label className="cart-button" htmlFor={cartCheckBoxId}>
                <CartIcon />
            </label>

            <input id={cartCheckBoxId} type="checkbox" hidden/>

            <aside className="cart">
                <ul>
                    <CartList 
                        cart={cart} 
                        addToCart={addToCart} 
                        removeFromCart={removeOneFromCart}
                    />
                </ul>
                <button onClick={()=>clearCart()}>
                    <ClearCartIcon/>
                </button>
            </aside>
        </>
    )
}