/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useWatchlistReducer } from "../hooks/useWatchlistReducer";


export const WatchListContext = createContext();

export function WatchListProvider({ children }){
    const {state, addToWatchlist, removeFromWatchlist, clearWatchlist} = useWatchlistReducer()


    return(
        <WatchListContext.Provider
            value={{
                watchlist:state,
                addToWatchlist,
                removeFromWatchlist,
                clearWatchlist
            }}
        >
            {children}
        </WatchListContext.Provider>
    )
}