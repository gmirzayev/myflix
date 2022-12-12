import { csrfFetch } from './csrf';

const RECEIVE_VIDEOS = 'videos/receiveVideos';
const RECEIVE_VIDEO = 'videos/receiveVideo';

const receiveVideos = (videos) => {
    return {
        type: RECEIVE_VIDEOS,
        videos
    }
};

const receiveVideo = (video) => {
    return {
        type: RECEIVE_VIDEO,
        video
    }
};

export const getVideos = (state) => {
    return state.video ? Object.values(state.video) : [];
}

export const getVideo = (videoId) => (state) => {
    return state.video ? state.video[videoId] : {};
}
  
export const fetchVideos = () => async dispatch => {
    const response = await csrfFetch(`/api/videos`);
    const data = await response.json();
    dispatch(receiveVideos(data));
};

export const fetchVideo = ({videoId}) => async dispatch => {
    const response = await csrfFetch(`/api/videos/${videoId}`);
    const data = await response.json();
    dispatch(receiveVideo(data));
};

const videoReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_VIDEOS:
            return {...newState, ...action.videos};
        case RECEIVE_VIDEO:
            newState[action.video.id] = action.video;
            return newState;
        default:
            return state;
    }
};

export default videoReducer;

