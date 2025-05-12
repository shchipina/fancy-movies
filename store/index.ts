"use client"
import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./features/userSlice";
import favoritesReducer from "./features/favoritesSlice";
import watchedReducer from "./features/watchedSlice";
import { loadFromLocalStorage } from "@/utils/localStorage";
import type { FavoritesState } from "./features/favoritesSlice";
import type { WatchedState } from "./features/watchedSlice";
import { localStorageMiddleware } from "@/utils/middleware";

type RootReduser = {
  user: ReturnType<typeof userReduser>;
  favorites: FavoritesState,
  watched: WatchedState,
}

const preloadedState = {
  favorites: loadFromLocalStorage<FavoritesState>("favorites") ?? { favorites: [] },
  watched: loadFromLocalStorage<WatchedState>("watched") ?? { watched: [] },
};

export const store = configureStore({
  reducer: {
    user: userReduser,
    favorites: favoritesReducer,
    watched: watchedReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(localStorageMiddleware);
  },
});

export type RootState = RootReduser;
export type AppDispatch = typeof store.dispatch;
