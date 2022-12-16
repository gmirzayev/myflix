import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import contentReducer from "./contents";
import likeReducer from "./likes";
import profileReducer from "./profiles";
import saveReducer from "./saves";
import sessionReducer from "./session";
import userReducer from "./users";
import videoReducer from "./videos";
import watchingReducer from "./watchings";
import modalContentReducer from "./modalContent";

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const rootReducer = combineReducers({
    user: userReducer,
    session: sessionReducer,
    profile: profileReducer,
    like: likeReducer,
    watching: watchingReducer,
    save: saveReducer,
    video: videoReducer,
    content: contentReducer,
    modalContent: modalContentReducer
});

const configureStore = (preloadedState={}) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

export default configureStore;