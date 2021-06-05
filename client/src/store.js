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

const enhancer = composeWithDevTools(applyMiddleware(reduxThunk));

const store = createStore(rootReducer, enhancer);

export default store;
