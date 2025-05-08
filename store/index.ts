import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./features/userSlice";
import favoritesReducer from "./features/favoritesSlice"

export const store = configureStore({
  reducer: {
    user: userReduser,
    favorites: favoritesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
