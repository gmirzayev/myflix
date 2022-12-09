import { csrfFetch } from './csrf';

const RECEIVE_PROFILES = 'profiles/receiveProfiles';
const ADD_PROFILE = 'profiles/addProfile';
const REMOVE_PROFILE = 'profiles/removeProfile';

const receiveProfiles = (profiles) => {
    return {
        type: RECEIVE_PROFILES,
        profiles
    }
};

const removeProfile = (profileId) => {
    return {
        type: REMOVE_PROFILE,
        profileId
    }
}

const addProfile = (profile) => {
    return {
        type: ADD_PROFILE,
        profile
    }
}

export const getProfiles = (state) => {
    return state.profile ? Object.values(state.profile) : [];
}
// export const getPost = (postId) => (state) => state.posts ? state.posts[postId] : null;
  
export const fetchProfiles = () => async dispatch => {
    const response = await csrfFetch("/api/profiles");
    const data = await response.json();
    dispatch(receiveProfiles(data));
};

export const deleteProfile = (profileId) => async dispatch => {
    const response = await csrfFetch(`/api/profiles/${profileId}`, {
        method: "DELETE"
    });
    dispatch(removeProfile(profileId));
    // const data = await response.json();
    // return data;
}

export const createProfile = ({name, picture}) => async dispatch => {
    const response = await csrfFetch(`/api/profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            picture
        })
    })
    const data = await response.json();
    dispatch(addProfile(data));
} 

const profileReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_PROFILES:
            return {...newState, ...action.profiles};
        case REMOVE_PROFILE:
            delete newState[action.profileId];
            return newState;
        default:
            return state;
    }
};

export default profileReducer;

