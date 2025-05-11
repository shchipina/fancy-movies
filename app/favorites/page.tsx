"use client";
import MovieCard from "@/components/MovieCard";
import { useAppSelector } from "@/hooks/reduxHook";

function Favorites() {
  const favorites = useAppSelector(state => state.favorites.favorites);
  console.log(favorites);

  return (
    <main className="mt-[100px] mx-[68px] text-white">
      <h2 className="text-3xl sm:text-4xl font-semibol mb-8">Your Favorites</h2>

      {!favorites.length ? (
        <div className="flex flex-col items-center justify-center text-white/60 mt-20">
          <p className="text-lg">You have no favorites yet.</p>
          <p className="text-sm mt-2 text-white/40">Start adding some movies you like!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {favorites.map(favoriteMovie => (
            <MovieCard key={favoriteMovie.id} movie={favoriteMovie} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites;
