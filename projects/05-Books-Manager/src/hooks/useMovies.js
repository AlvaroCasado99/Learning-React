import { useCallback, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/movies"
import debounce from "just-debounce-it"

export function useMovies( {filter, search} ){
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const prevSearch = useRef(search);
  
    // Es importante envolver este en un callback porque de lo contrario, en cada render se 
    // realizaría una petición a la API.
    const getMovies = useCallback(
      async ({search}) => {
        if(prevSearch.current===search) return;
        try{
          setError(null)
          setLoading(true)
          prevSearch.current=search;
          const newMovies = await searchMovies({search});
          setMovies(newMovies)
        }catch(err){
          setError(err)
        }finally{
          setLoading(false)
        }
      }
    , [])

    /**
     * Hay que envolverlo en un callback porque de lo contrario se volvería a crear en cada 
     * render, lanzando una nueva consulta. 
     */
    const debouncedGetMovies = useCallback(
        debounce(search => getMovies({search}), 300)
      ,[getMovies])

    const sortedMovies = useMemo(()=>{
      return (filter)
        ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
        : movies
    }, [filter, movies])
    
  
    return {
      movies: sortedMovies,
      error, 
      loading, 
      getMovies,
      debouncedGetMovies}
  }