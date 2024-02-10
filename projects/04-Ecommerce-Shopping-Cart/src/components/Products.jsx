/* eslint-disable react/prop-types */
import { useCart } from '../hooks/useCart.js'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx'
import './Products.css'

function ListOfProducts({products}){
    const {addToCart, cart, removeFromCart} = useCart();

    const checkProductInCart = product => {
        return cart.some(item => item.id===product.id)
    }

    return products.map(product => {
        const isProductInCart = checkProductInCart(product)
        
        return (
        <li key={product.id}>
            <img src={product.thumbnail} alt={product.title}/>
            <div>
                <strong>{product.title}</strong> - ${product.price}
            </div>
            <div>
                <button 
                    style={{background: isProductInCart ? 'red' : '#09f'}}
                    onClick={()=>(
                        isProductInCart 
                            ? removeFromCart(product) 
                            : addToCart(product))
                    }>
                    {
                        isProductInCart
                            ? <RemoveFromCartIcon />
                            : <AddToCartIcon />
                    }
                </button>
            </div>

        </li>
    )})
}

export function Products({products}){
    return (
        <main className='products'>
            <ul>
                <ListOfProducts products={products}/>
            </ul>
        </main>
    )
}