import { useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/movies"
import debounce from "just-debounce-it"

export function useMovies( {filter, search} ){
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const prevSearch = useRef(search);
  
    const getMovies = async ({search}) => {
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

    const debouncedGetMovies = debounce(search => getMovies({search}), 500)

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