import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./features/userSlice";
import favoritesReducer from "./features/favoritesSlice";
import watchedReducer from "./features/watchedSlice";

export const store = configureStore({
  reducer: {
    user: userReduser,
    favorites: favoritesReducer,
    watched: watchedReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
