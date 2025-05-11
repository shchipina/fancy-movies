"use client"

import { addWatched } from "@/store/features/watchedSlice";
import { useAppDispatch, useAppSelector } from "./reduxHook"
import { MediaItem } from "@/types/media";

export const useWatched = (media: MediaItem) => {
  const dispatch = useAppDispatch();
  const watched = useAppSelector(state => state.watched.watched);

  const isWatched = watched.some(item => item.id === media.id);

  const markAsWatched = () => {
    if (!isWatched) {
      dispatch(addWatched(media));
    } 
  };

  return {watched, markAsWatched, isWatched};
}