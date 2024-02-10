/* eslint-disable react/prop-types */
import { useCart } from '../hooks/useCart';
import { useFilter } from '../hooks/useFilters'
import './Footer.css'

export function Footer() {
    const {filters} = useFilter();
    const {cart} = useCart();

    return (
        <footer className='footer'>
            <p>
                {JSON.stringify(filters, null, 2)}
            </p>
            <p>
                {JSON.stringify(cart, null, 2)}
            </p>
        </footer>
    )
}