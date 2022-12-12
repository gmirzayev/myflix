import { csrfFetch } from './csrf';

const RECEIVE_WATCHINGS = 'watching/receiveWatchings';
const RECEIVE_WATCHING = 'watching/receiveWatching';
const REMOVE_WATCHING = 'watching/removeWatching';

const receiveWatchings = (watchings) => {
    return {
        type: RECEIVE_WATCHINGS,
        watchings
    }
};

const removeWatching = (watchingId) => {
    return {
        type: REMOVE_WATCHING,
        watchingId
    }
}

const receiveWatching = (watching) => {
    return {
        type: RECEIVE_WATCHING,
        watching
    }
}

export const getWatchings = (state) => {
    return state.watching ? Object.values(state.watching) : [];
}
  
export const fetchWatchings = (profileId) => async dispatch => {
    const response = await csrfFetch(`/api/profiles/${profileId}/watchings`);
    const data = await response.json();
    dispatch(receiveWatchings(data));
};

export const deleteWatching = (watchingId) => async dispatch => {
    await csrfFetch(`/api/watchings/${watchingId}`, {
        method: "DELETE"
    });
    dispatch(removeWatching(watchingId));
}

export const createWatching = ({videoId, profileId, currentTime}) => async dispatch => {
    const response = await csrfFetch(`/api/watchings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            videoId,
            profileId,
            currentTime
        })
    })
    const data = await response.json();
    dispatch(receiveWatching(data));
} 

const watchingReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_WATCHINGS:
            return {...newState, ...action.watchings};
        case RECEIVE_WATCHING:
            newState[action.watching.id] = action.watching;
            return newState;
        case REMOVE_WATCHING:
            delete newState[action.watchingId];
            return newState;
        default:
            return state;
    }
};

export default watchingReducer;

