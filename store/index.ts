"use client"
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReduser from "./features/userSlice";
import favoritesReducer from "./features/favoritesSlice";
import watchedReducer from "./features/watchedSlice";
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const rootReduser = combineReducers({
  user: userReduser,
  favorites: favoritesReducer,
  watched: watchedReducer,
})

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReduser)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
