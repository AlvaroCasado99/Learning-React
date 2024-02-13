import { useContext } from "react";
import { WatchListContext } from "../contexts/WatchList";


export function useWatchlist(){
    const context = useContext(WatchListContext);

    if(context===undefined){
        throw new Error("Watchlist context is unavailable for this component")
    }

    return context;
}