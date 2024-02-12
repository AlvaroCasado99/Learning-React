// This is the movie service
export function searchMovies({search}){
    return fetch(`http://www.omdbapi.com/?apikey=d580025e&s=${search}`)
      .then(res => {
        if (res.ok) return res.json()
        throw new Error("An error occured while searching for this movie.")
      })
      .then(data => {
        return data?.Search?.map(movie => (
          {
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
          }
        ))
      })
  }