import { csrfFetch } from './csrf';

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
    const response = await csrfFetch(`/api/profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            picture
        })
    })
    const data = await response.json();
    dispatch(receiveProfile(data));
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

