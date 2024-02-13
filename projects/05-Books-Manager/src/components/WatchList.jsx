/* eslint-disable react/prop-types */
import { useId } from "react";
import { MenuIcon } from "./Icons";

import './WatchList.css'
import { useWatchlist } from "../hooks/useWatchList";

function WatchListItem({ id, title, year, poster, remove}){
    return(
        <li className="movie">
			<header>
				<h3>{title}</h3>
				<p>{year}</p>
			</header>
			<img src={poster} alt={title}/>
            <button onClick={()=>remove(id)}>Eliminar</button>
		</li>
    )
}

function WatchListList({watchList, remove, clear}){
    return(
        <ul>
            {
                watchList.map(item => (
                    <WatchListItem 
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        poster={item.poster}
                        year={item.year}
                        remove={remove}
                    />
                ))
            }
            <button onClick={()=>clear()}>Limpiar</button>
        </ul>
    )
}

export function WatchList(){
    const {watchlist, removeFromWatchlist, clearWatchlist} = useWatchlist();
    const watchListButtonId = useId();

    return(
        <>
            <label className="watchlist-button" htmlFor={watchListButtonId}>
                <MenuIcon />
            </label>

            <input type='checkbox' id={watchListButtonId} hidden/>

            <aside className="watchlist">
                <WatchListList 
                    watchList={watchlist}
                    remove={removeFromWatchlist}
                    clear={clearWatchlist}
                />
            </aside>
        </>
    )
}