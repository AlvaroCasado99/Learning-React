/* eslint-disable react/prop-types */

function MovieItem({title, year, poster}){
	return(
		<li className="movie">
			<header>
				<h3>{title}</h3>
				<p>{year}</p>
			</header>
			<img src={poster} alt={title}/>
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
						title={movie.title}
						year={movie.year}
						poster={movie.poster}
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