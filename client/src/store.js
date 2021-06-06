import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    postCreateReducer,
    postDeleteReducer,
    postDetailsReducer,
    postListMyReducer,
    postListReducer,
    postUpdateReducer,
} from "./reducers/postReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const rootReducer = combineReducers({
    postList: postListReducer,
    postListMy: postListMyReducer,
    postDetails: postDetailsReducer,
    postCreate: postCreateReducer,
    postUpdate: postUpdateReducer,
    postDelete: postDeleteReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
});

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

let initialState = null;
if ([userInfoFromLocalStorage].every((item) => item !== null)) {
    initialState = {
        userLogin: {
            userInfo: userInfoFromLocalStorage,
        },
    };
}

const enhancer = composeWithDevTools(applyMiddleware(reduxThunk));

let store = null;
if (initialState) {
    store = createStore(rootReducer, initialState, enhancer);
} else {
    store = createStore(rootReducer, enhancer);
}

export default store;
