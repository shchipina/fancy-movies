import { MediaItem } from "@/types/media";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

export type WatchedState = {
  watched: MediaItem[];
};

const initialState: WatchedState = {
  watched: [],
}

export const watchedSlice = createSlice({
  name: "watched",
  initialState,
  reducers: {
    addWatched: (state, action: PayloadAction<MediaItem>) => {
      const exists = state.watched.some(item => item.id === action.payload.id);
      if (!exists) {
        state.watched.push(action.payload);
      }
    }
  }
});

export const { addWatched } = watchedSlice.actions;
export default watchedSlice.reducer;
export const watched = (state: RootState) => state.watched.watched;
