import { csrfFetch } from './csrf';

const RECEIVE_SAVES = 'save/receiveSaves';
const RECEIVE_SAVE = 'save/receiveSave';
const REMOVE_SAVE = 'save/removeSave';

const receiveSaves = (saves) => {
    return {
        type: RECEIVE_SAVES,
        saves
    }
};

const removeSave = (saveId) => {
    return {
        type: REMOVE_SAVE,
        saveId
    }
}

const receiveSave = (save) => {
    return {
        type: RECEIVE_SAVE,
        save
    }
}

export const getSaves = (state) => {
    return state.save ? Object.values(state.save) : [];
}
  
export const fetchSaves = (profileId) => async dispatch => {
    const response = await csrfFetch(`/api/profiles/${profileId}/saves`);
    const data = await response.json();
    dispatch(receiveSaves(data));
};

export const deleteSave = (saveId) => async dispatch => {
    await csrfFetch(`/api/saves/${saveId}`, {
        method: "DELETE"
    });
    dispatch(removeSave(saveId));
}

export const createSave = ({contentId, profileId}) => async dispatch => {
    const response = await csrfFetch(`/api/saves`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contentId,
            profileId
        })
    })
    const data = await response.json();
    dispatch(receiveSave(data));
} 

const saveReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_SAVES:
            return {...newState, ...action.saves};
        case RECEIVE_SAVE:
            newState[action.save.id] = action.save;
            return newState;
        case REMOVE_SAVE:
            delete newState[action.saveId];
            return newState;
        default:
            return state;
    }
};

export default saveReducer;

