import { csrfFetch } from './csrf';

const RECEIVE_VIDEOS = 'videos/receiveVideos';

const receiveVideos = (videos) => {
    return {
        type: RECEIVE_VIDEOS,
        videos
    }
};

export const getVideos = (state) => {
    return state.video ? Object.values(state.video) : [];
}
  
export const fetchVideos = () => async dispatch => {
    const response = await csrfFetch(`/api/videos`);
    const data = await response.json();
    dispatch(receiveVideos(data));
};

const videoReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_VIDEOS:
            return {...newState, ...action.videos};
        default:
            return state;
    }
};

export default videoReducer;

