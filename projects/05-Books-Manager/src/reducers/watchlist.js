export const watchlistInitialState = JSON.parse(window.localStorage.getItem('watchlist')) || [];

export const ACTIONS_WATCHLIST = {
    ADD_TO_WATCHLIST: 'ADD_TO_WATCHLIST',
    REMOVE_FROM_WATCHLIST: 'REMOVE_FROM_WATCHLIST',
    CLEAR_WATCHLIST: 'CLEAR_WATCHLIST'
}

function updateLocalStorage(watchlist){
    window.localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

export function reducer(state, action){
    const {payload: actionPayload, type: actionType} = action;

    switch(actionType){
        case ACTIONS_WATCHLIST.ADD_TO_WATCHLIST: {
            const newState = [
                ...state,
                actionPayload
            ]
            updateLocalStorage(newState)
            return newState;
        }
        case ACTIONS_WATCHLIST.REMOVE_FROM_WATCHLIST:{
            const newState = state.filter(item => item.id!==actionPayload)
            updateLocalStorage(newState)
            return newState;
        }
        case ACTIONS_WATCHLIST.CLEAR_WATCHLIST:{
            updateLocalStorage([])
            return [];
        }
    }
}