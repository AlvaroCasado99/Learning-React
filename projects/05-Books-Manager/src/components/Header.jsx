/* eslint-disable react/prop-types */

export function Header({
  filter,
  changeFilter,
  search, 
  searchError, 
  updateSearch, 
  getMovies, 
  debouncedMovies
}){

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch)
    debouncedMovies(newSearch)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
  }

  return(
      <header>
      <h1>Film Manager</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Avengers, Matrix..." onChange={handleChange} value={search}/>
        <input type="checkbox" onChange={changeFilter} checked={filter}/>
        <button>Buscar</button>
      </form>
      {searchError && <strong style={{color:'red'}}>{searchError}</strong>}
    </header>
  )
}