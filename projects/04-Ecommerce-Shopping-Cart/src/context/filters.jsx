/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// Los 'Providers' son Singleton, de esta forma el estado es el mismo 
// para las diferentes areas del códogo para las que se aplique el contexto

// Paso 1: Crear el 'Contexto':
//  Esto es lo que tenemos que consimir
export const FilterContext = createContext()

// Paso 2: Crear el 'Provider' para pasar el contexto:
//  Esto es lo que nos da acceso al contexto. 
export function FiltersProvider ({ children }) {
    const [filters, setFilters] = useState({
        category: 'all',
        minPrice: 0  
    })
    return (
        <FilterContext.Provider value={{
            filters,
            setFilters
        }}>
            {children}
        </FilterContext.Provider>
    )
}

// Paso 3: Usar el contexto