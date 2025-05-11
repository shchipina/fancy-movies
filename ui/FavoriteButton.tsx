import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { add, remove } from '@/store/features/favoritesSlice';
import { MediaItem } from '@/types/media';

function FavoriteButton({ media }: { media: MediaItem }) {
  const favorites = useAppSelector(state => state.favorites.favorites);
  const dispatch = useAppDispatch();

  const isFavorite = favorites.some(favorite => favorite.id === media.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(remove(media.id));
    } else {
      dispatch(add(media));
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="absolute top-[10px] right-[10px] p-2 rounded-full bg-white/30 transition-transform duration-200 hover:scale-105 cursor-pointer will-change-transform"
      aria-label="Add to favorites"
    >
      {isFavorite ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" className="opacity-100">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="red" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" className="">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#333" strokeWidth="2" />
        </svg>
      )}
    </button>
  );
}

export default FavoriteButton;
