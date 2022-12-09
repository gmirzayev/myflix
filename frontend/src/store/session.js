import { csrfFetch } from './csrf';

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const SET_CURRENT_PROFILE = 'profiles/setCurrentProfile';
const REMOVE_CURRENT_PROFILE = 'profiles/removeCurrentProfile';

const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  };
};

const storeCurrentUser = user => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
}

export const setCurrentProfile = (profile) => {
  return {
    type: SET_CURRENT_PROFILE,
    profile
  };
};

export const removeCurrentProfile = () => {
  return {
      type: REMOVE_CURRENT_PROFILE
  };
};

export const storeCurrentProfile = profile => {
  if (profile) sessionStorage.setItem("currentProfile", JSON.stringify(profile));
  else sessionStorage.removeItem("currentProfile");
}

const storeCSRFToken = response => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

export const storeEmail = email => {
  if (email) sessionStorage.setItem("currentEmail", email);
}

export const login = ({ email, password }) => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const restoreSession = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { email, password } = user;
  debugger
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      email,
      password
    })
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE"
  });
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  dispatch(removeCurrentProfile());
  return response;
};

const initialState = { 
  user: JSON.parse(sessionStorage.getItem("currentUser")),
  profile: JSON.parse(sessionStorage.getItem("currentProfile"))
};

const sessionReducer = (state = initialState, action) => {
    Object.freeze(state);
    let newState = {...state};
    switch (action.type) {
        case SET_CURRENT_USER:
          return { ...newState, user: action.payload };
        case REMOVE_CURRENT_USER:
          return { ...newState, user: null };
        case SET_CURRENT_PROFILE:
          return { ...newState, profile: action.profile };
        case REMOVE_CURRENT_PROFILE:
          return { ...newState, profile: null };
        default:
          return state;
    }
};

export default sessionReducer;