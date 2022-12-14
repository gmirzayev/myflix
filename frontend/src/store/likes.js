import { csrfFetch } from './csrf';

const RECEIVE_LIKES = 'like/receiveLikes';
const RECEIVE_LIKE = 'like/receiveLike';
const REMOVE_LIKE = 'like/removeLike';

const receiveLikes = (likes) => {
    return {
        type: RECEIVE_LIKES,
        likes
    }
};

const removeLike = (likeId) => {
    return {
        type: REMOVE_LIKE,
        likeId
    }
}

const receiveLike = (like) => {
    return {
        type: RECEIVE_LIKE,
        like
    }
}

export const getLikes = (state) => {
    return state.like ? Object.values(state.like) : [];
}

export const fetchLikes = (profileId) => async dispatch => {
    const response = await csrfFetch(`/api/profiles/${profileId}/likes`);
    const data = await response.json();
    dispatch(receiveLikes(data));
};

export const deleteLike = (likeId) => async dispatch => {
    await csrfFetch(`/api/likes/${likeId}`, {
        method: "DELETE"
    });
    dispatch(removeLike(likeId));
}

export const createLike = ({contentId, profileId}) => async dispatch => {
    const response = await csrfFetch(`/api/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({like:{
            contentId,
            profileId
        }})
    })
    const data = await response.json();
    dispatch(receiveLike(data.like));
} 

const likeReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_LIKES:
            return {...newState, ...action.likes};
        case RECEIVE_LIKE:
            newState[action.like.id] = action.like;
            return newState;
        case REMOVE_LIKE:
            delete newState[action.likeId];
            return newState;
        default:
            return state;
    }
};

export default likeReducer;

