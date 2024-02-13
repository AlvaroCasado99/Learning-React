/* eslint-disable react/prop-types */
import { Movies } from "../components/Movies.jsx";

export function MovieResults({
  loading,
  movies,
  moviesError
}){
  return(
      <main>
      {
        (loading)
          ? <p>Cargando...</p>
          : <Movies movies={movies} />
      }
      {moviesError && <strong style={{color:'red'}}>{moviesError}</strong>}
    </main>
  )
}