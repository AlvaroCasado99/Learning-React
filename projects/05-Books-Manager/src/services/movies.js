// This is the movie service
export function searchMovies({search}){
    return fetch(`http://www.omdbapi.com/?apikey=d580025e&s=${search}`)
      .then(res => {
        if (res.ok) return res.json()
        throw new Error("An error occured while searching for this movie.")
      })
      .then(data => {
        const movies = data?.Search?.map(movie => (
          {
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
          }
        ))

        // Me aseguro de que si no hay películas me devuelva una Array vacío
        return (movies)
          ? movies
          : []
      })
  }