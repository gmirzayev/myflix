import userReducer from "./usersReducer";

const rootReducer = combineReducers({
    user: userReducer
});