/* eslint-disable react/prop-types */
import { useSearch } from "./hooks/useSearch.js";
import { useMovies } from "./hooks/useMovies.js";
import { useFilter } from "./hooks/useFilter.js";
import { Header } from "./components/Header.jsx";
import { MovieResults } from "./components/MovieResults.jsx";
import { WatchList } from "./components/WatchList.jsx";
import { WatchListProvider } from "./contexts/WatchList.jsx";

function App() {
  const {filter, changeFilter} = useFilter()
  const {search, error: searchError, updateSearch} = useSearch();
  const {movies, error: moviesError, loading, getMovies, debouncedGetMovies} = useMovies({filter, search});


  return (
    <div className="page">

      <Header
        filter={filter}
        changeFilter={changeFilter}
        search={search} 
        searchError={searchError} 
        updateSearch={updateSearch} 
        getMovies={getMovies} 
        debouncedMovies={debouncedGetMovies}     
      />

      <WatchListProvider>
        <WatchList />
        <MovieResults 
          loading={loading}
          movies={movies}
          moviesError={moviesError}
        />
      </WatchListProvider>
      
    </div>
  )
}

export default App
