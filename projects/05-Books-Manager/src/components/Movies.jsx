/* eslint-disable react/prop-types */

import { useWatchlist } from "../hooks/useWatchList";

function MovieItem({id, title, year, poster, movie}){
	const {watchlist, addToWatchlist, removeFromWatchlist} = useWatchlist();

	const isMovieInList = watchlist.some(item => item.id===id)

	return(
		<li className="movie">
			<header>
				<h3>{title}</h3>
				<p>{year}</p>
			</header>
			<img src={poster} alt={title}/>
			<button 
				onClick={()=> {
					isMovieInList
						? removeFromWatchlist(id)
						: addToWatchlist(movie)
					}}>
						{
							isMovieInList ? "Remove" : "Add"
						}
					
			</button>
		</li>
	)
}

function ListMovies({movies}){
	return (
		<ul className="movies">
			{
				movies.map(movie => (
					<MovieItem 
						key={movie.id}
						id={movie.id}
						title={movie.title}
						year={movie.year}
						poster={movie.poster}
						movie={movie}
					/>
				))
			}
		</ul>
	)
}

export function Movies ({movies}){
	const hasMovies = movies?.length>0;
	return (
		(hasMovies) 
			? <ListMovies movies={movies} />
			: <p>No se encontraron películas</p>
	)
  
}