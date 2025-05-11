"use client"
import Banner from "@/components/Banner";
import MovieCard from "@/components/MovieCard";
import MovieList from "@/components/MovieList";
import ProtectedRoute from "@/components/ProtectedRoute";
import TVCard from "@/components/TVCard";
import { useAppSelector } from "@/hooks/reduxHook";
import { getPopularMovies, getUpcomingMovies } from "@/lib/api/movie";
import { getPopularTV } from "@/lib/api/tv";

export default function Home() {
  const watchedMedia = useAppSelector(state => state.watched.watched);
  console.log(watchedMedia);
  
  return (
    <ProtectedRoute>
      <main className="flex-1">
        <Banner />

        <section className="px-[64px]">
          <MovieList
            queryFn={getPopularMovies}
            queryKey={["popular-movie"]}
            title="Popular Movie"
            renderItem={(movie) => <MovieCard key={movie.id} movie={movie} />}
          />
          <MovieList
            queryFn={getUpcomingMovies}
            queryKey={["upcoming-movie"]}
            title="Upcoming Movie"
            renderItem={(movie) => <MovieCard key={movie.id} movie={movie} />}
          />
          <MovieList
            queryFn={getPopularTV}
            queryKey={["popular-tv"]}
            title="Popular TV"
            renderItem={(tv) => <TVCard key={tv.id} tv={tv} />}
          />
        </section>
      </main>
    </ProtectedRoute>
  );
}
