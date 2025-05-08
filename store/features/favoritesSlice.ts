import { Movie } from "@/types/movie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
type favoritesState = {
  favorites: Movie[],
};

const initialState: favoritesState = {
  favorites: []
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Movie>) => {
      const index = state.favorites.findIndex(favorite => favorite.id === action.payload.id);

      if (index === -1) {
        state.favorites.push(action.payload);
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(favorite => favorite.id !== action.payload);
    }

  }
});

export const { add, remove } = favoritesSlice.actions;
export const favorites = (state: RootState) => state.favorites.favorites;
export default favoritesSlice.reducer;
