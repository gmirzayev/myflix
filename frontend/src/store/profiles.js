import { csrfFetch } from './csrf';

const RECEIVE_PROFILES = 'profiles/receiveProfiles';
const ADD_PROFILE = 'profiles/addProfile';
const REMOVE_PROFILE = 'profiles/removeProfile';
const EDIT_PROFILE = 'profiles/editProfile';

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

const editProfile = (profile) => {
    return {
        type: EDIT_PROFILE,
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
    await csrfFetch(`/api/profiles/${profileId}`, {
        method: "DELETE"
    });
    dispatch(removeProfile(profileId));
    // const data = await response.json();
    // return data;
}

export const updateProfile = (profile) => async dispatch => {
    let res = await csrfFetch(`/api/profiles/${profile.id}`, {
        method: 'PUT',
        body: JSON.stringify(profile),
        headers: {'Content-Type': 'application/json'}
    })
    let data = await res.json();
    dispatch(editProfile(data));
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
        case EDIT_PROFILE:
            newState[action.profile.id] = action.profile;
            return newState;
        default:
            return state;
    }
};

export default profileReducer;

