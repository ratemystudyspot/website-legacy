import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/users";
import reviewsReducer from "./Slices/reviews.ts";
import studySpotsReducer from "./Slices/studySpots.ts";

const rootReducer = combineReducers({
  users: userReducer,
  reviews: reviewsReducer,
  studySpots: studySpotsReducer
})

export const store = configureStore({
  reducer: rootReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;