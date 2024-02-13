import { useReducer } from "react";
import { reducer, watchlistInitialState, ACTIONS_WATCHLIST} from "../reducers/watchlist";

export function useWatchlistReducer(){
    const [state, dispatch] = useReducer(reducer, watchlistInitialState);

    const addToWatchlist = movie => dispatch({
        type: ACTIONS_WATCHLIST.ADD_TO_WATCHLIST,
        payload: movie
    }) 

    const removeFromWatchlist = movieId => dispatch({
        type: ACTIONS_WATCHLIST.REMOVE_FROM_WATCHLIST,
        payload: movieId
    }) 

    const clearWatchlist = () => dispatch({
        type: ACTIONS_WATCHLIST.CLEAR_WATCHLIST
    })

    return {
        state,
        addToWatchlist,
        removeFromWatchlist,
        clearWatchlist
    }
}