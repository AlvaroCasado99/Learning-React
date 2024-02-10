/* eslint-disable react/prop-types */
import { useId } from 'react'
import { useFilter } from '../hooks/useFilters';

import './Filters.css'

export function Filters() {
    // const [price, setPrice] = useState(0);
    // const [category, setCategory] = useState('all')
    const {filters, setFilters: changeFilter} = useFilter()

    /**
     * En aplicaciones de gran tamaño es posible que elementos HTML por su parecido
     * y sin querer se les asigne un mismo ID. Esto se puede resolver con el hook 
     * 'useId' que retorna un identificador único y se asegura de que lo sea en toda
     * la aplicación de React; tnato en el frontend como en el backend. 
     */
    const minPriceFilterId = useId();
    const categoryFilterId = useId();

    const handlePrice = (event) => {
        const newPrice = event.target.value;
        // setPrice(newPrice)   // Para evitar tener dos fuentes de la verdad
        changeFilter(prevState => ({
            ...prevState,
            minPrice: newPrice
        }))
    }

    const handleCategory = (event) => {
        const newCategory = event.target.value;
        // setCategory(newCategory)   // Para evitar tener dos fuentes de la verdad
        changeFilter(prevState => ({
            ...prevState,
            category: newCategory
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Precio</label>
                <input 
                    type="range"
                    value={filters.minPrice}
                    id={minPriceFilterId}
                    min="0"
                    max="1000"
                    onChange={handlePrice}
                />
                <strong>${filters.minPrice}</strong>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Categoría</label>
                <select 
                    id={categoryFilterId} 
                    defaultValue={filters.category} 
                    onChange={handleCategory}
                >
                    <option value="all" >Todas</option>
                    <option value="home-decoration" >Decoración</option>
                    <option value="smartphones" >Móviles</option>
                    <option value="fragrances" >Perfumes</option>
                    <option value="laptops" >Portátiles</option>
                </select>
            </div>
        </section>
    )
}