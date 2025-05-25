import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "./slices/authSlice";
import todoSlice from "./slices/todoSlice";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    todo: todoSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

