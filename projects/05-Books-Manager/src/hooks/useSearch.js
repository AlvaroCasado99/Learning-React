import { useEffect, useRef, useState } from "react"


export function useSearch(){
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const isFirstSearch = useRef(true)
  
    const updateSearch = (newSearch) => {
      if(newSearch.startsWith(' ')) return;
      setSearch(newSearch)
    }
  
    useEffect(()=>{
      if(isFirstSearch.current) {
        isFirstSearch.current = search==="";
        return;
      }
      
      if(search===''){
        setError('No se pueden hacer búsquedas vacías')
        return;
      } 
      if(search?.length<3){
        setError('No se pueden hacer búsquedas con menos de 3 caracteres')
        return;
      }
      setError(null)
    }, [search])
  
    return {search, error, updateSearch}
  }