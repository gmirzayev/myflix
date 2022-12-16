const RECEIVE_MODAL = 'modalContent/receiveModal';
const REMOVE_MODAL = 'modalContent/removeModal';

export const removeModal = () => {
    return {
        type: REMOVE_MODAL
    }
}

export const receiveModal = (content) => {
    return {
        type: RECEIVE_MODAL,
        content
    }
}

// export const getLikes = (state) => {
//     return state.like ? Object.values(state.like) : [];
// }

// export const fetchLikes = (profileId) => async dispatch => {
//     const response = await csrfFetch(`/api/profiles/${profileId}/likes`);
//     const data = await response.json();
//     dispatch(receiveLikes(data));
// };

// export const deleteLike = (likeId) => async dispatch => {
//     await csrfFetch(`/api/likes/${likeId}`, {
//         method: "DELETE"
//     });
//     dispatch(removeLike(likeId));
// }

// export const createLike = ({contentId, profileId}) => async dispatch => {
//     const response = await csrfFetch(`/api/likes`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({like:{
//             contentId,
//             profileId
//         }})
//     })
//     const data = await response.json();
//     dispatch(receiveLike(data.like));
// } 

const modalContentReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_MODAL:
            return action.content;
        case REMOVE_MODAL:
            return {};
        default:
            return state;
    }
};

export default modalContentReducer;

