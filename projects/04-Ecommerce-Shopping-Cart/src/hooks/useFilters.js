/* eslint-disable no-unused-vars */
import { useCallback, useContext } from 'react' 
import { FilterContext } from '../context/filters'


export function useFilter(){
    const context = useContext(FilterContext)
    
    // Es buena práctica comprobar si el contexto es undefined porque normalmente
    // es síntoma de se está intentando emplear el 'Custom hook' que controla el 
    // contexto en un área de la aplicación no cubierta por el 'Provider'
    if(context === undefined){
      throw new Error("useFilter must be used within a FilterProvider")
    }
    
    const {filters, setFilters} = context;
  
    const filterProducts = useCallback(products => {
      return products.filter(product => {
        return (
          product.price >= filters.minPrice &&
          (
            filters.category === 'all' ||
            product.category === filters.category
          )
        )
      })
    }, [filters])
  
    return {
      filters,
      filterProducts,
      setFilters
    };
  }