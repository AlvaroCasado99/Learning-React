/* eslint-disable react/prop-types */
import { Filters } from '../components/Filters.jsx'

export function Header () {
    return (
        <header className='header'>
            <h1>React Shop</h1>
           <Filters /> 
        </header>
    )
}