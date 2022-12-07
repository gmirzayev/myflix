import { csrfFetch } from './csrf';

const RECEIVE_PROFILES = 'profiles/receiveProfiles';
const ADD_PROFILE = 'profiles/addProfile';
const REMOVE_PROFILE = 'profiles/removeProfile';

const SET_CURRENT_PROFILE = 'profiles/setCurrentProfile';
const REMOVE_CURRENT_PROFILE = 'profiles/removeCurrentProfile';
 
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

const setCurrentProfile = (profile) => {
    return {
      type: SET_CURRENT_PROFILE,
      profile
    };
};

const removeCurrentProfile = () => {
    return {
        type: REMOVE_CURRENT_PROFILE
    };
};

const storeCurrentProfile = profile => {
    if (profile) sessionStorage.setItem("currentProfile", JSON.stringify(profile));
    else sessionStorage.removeItem("currentProfile");
}

export const getProfiles = () => async dispatch => {
    const response = await csrfFetch("/api/profiles");
    const data = await response.json();
    dispatch(receiveProfiles(data));
    return data;
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
    return data;
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
        case SET_CURRENT_PROFILE:
            return { ...newState, profile: action.profile };
        case REMOVE_CURRENT_PROFILE:
            return { ...newState, profile: null };
        default:
            return state;
    }
};

export default profileReducer;

