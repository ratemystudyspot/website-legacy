import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/users";

const rootReducer = combineReducers({
    // users: usersReducer
    users: userReducer,
})

export const store = configureStore({
    reducer: rootReducer
});