import { csrfFetch } from './csrf';

const RECEIVE_CONTENTS = 'contents/receiveContents';

const receiveContents = (contents) => {
    return {
        type: RECEIVE_CONTENTS,
        contents
    }
};

export const getContents = (state) => {
    return state.content ? Object.values(state.content) : [];
}

export const getContentsByCategory = (category) => (state) => {
    let content = [];
    for(let i = 1; i <= Object.keys(state.content).length; i++) {
        if(state.content[i].category === category) {
            content.push(state.content[i]);
        }
    }
    return state.content ? content : [];
}

export const fetchContents = () => async dispatch => {
    const response = await csrfFetch(`/api/contents`);
    const data = await response.json();
    dispatch(receiveContents(data));
};

const contentReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_CONTENTS:
            return {...newState, ...action.contents};
        default:
            return state;
    }
};

export default contentReducer;

