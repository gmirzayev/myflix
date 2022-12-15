import { csrfFetch } from './csrf';
import { setCurrentProfile, storeCurrentProfile } from './session';

const RECEIVE_PROFILES = 'profiles/receiveProfiles';
const RECEIVE_PROFILE = 'profiles/receiveProfile';
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

const receiveProfile = (profile) => {
    return {
        type: RECEIVE_PROFILE,
        profile
    }
}

export const getProfiles = (state) => {
    return state.profile ? Object.values(state.profile) : [];
}

export const getProfile = (profileId) => (state) => {
    return state.profile ? state.profile[profileId] : {};
}
  
export const fetchProfiles = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/profiles`);
    const data = await response.json();
    dispatch(receiveProfiles(data));
};

export const fetchProfile = (profileId) => async dispatch => {
    const response = await csrfFetch(`/api/profiles/${profileId}`);
    const data = await response.json();
    dispatch(receiveProfile(data[profileId]));
};

export const deleteProfile = (profileId) => async dispatch => {
    await csrfFetch(`/api/profiles/${profileId}`, {
        method: "DELETE"
    });
    dispatch(removeProfile(profileId));
}

export const updateProfile = (profile) => async dispatch => {
    let res = await csrfFetch(`/api/profiles/${profile.id}`, {
        method: 'PUT',
        body: JSON.stringify(profile),
        headers: {'Content-Type': 'application/json'}
    })
    let data = await res.json();
    dispatch(receiveProfile(data));
}

export const createProfile = ({name, picture}) => async dispatch => {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    const response = await csrfFetch(`/api/users/${user.id}/profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            picture
        })
    })
    const data = await response.json();
    setCurrentProfile(data.profile);
    dispatch(receiveProfile(data.profile));
} 

const profileReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_PROFILES:
            return {...newState, ...action.profiles};
        case RECEIVE_PROFILE:
            newState[action.profile.id] = action.profile;
            return newState;
        case REMOVE_PROFILE:
            delete newState[action.profileId];
            return newState;
        default:
            return state;
    }
};

export default profileReducer;

