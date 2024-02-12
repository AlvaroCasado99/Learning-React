/* eslint-disable react/prop-types */
import { useSearch } from "./hooks/useSearch";
import { useMovies } from "./hooks/useMovies";
import { Movies } from "./components/Movies.jsx";
import { useState } from "react";

function App() {
  const [filter, setFilter] = useState(false);
  const {search, error: searchError, updateSearch} = useSearch();
  const {movies, error: moviesError, loading, getMovies, debouncedGetMovies} = useMovies({filter, search});

  /**
   * Se encarga de la comprobación del campo de búsqueda
   */
  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  /**
   * Se encarga de hacer las búsquedas
   */
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
  }

  const handleFilter = () => {
    setFilter(!filter);
  }

  return (
    <div className="page">
      <header>
        <h1>Film Manager</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Avengers, Matrix..." onChange={handleChange} value={search}/>
          <input type="checkbox" onChange={handleFilter} checked={filter}/>
          <button>Buscar</button>
        </form>
        {searchError && <strong style={{color:'red'}}>{searchError}</strong>}
      </header>
      <main>
        {
          (loading)
            ? <p>Cargando...</p>
            : <Movies movies={movies} />
        }

        {moviesError && <strong style={{color:'red'}}>{moviesError}</strong>}
      </main>
    </div>
  )
}

export default App
