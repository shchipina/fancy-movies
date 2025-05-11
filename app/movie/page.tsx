"use client"

import MovieCard from "@/components/MovieCard";
import { getMoviesList } from "@/lib/api/movie";
import { MovieResponse } from "@/types/movie";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Movies = () => {
  const [page, setPage] = useState(1);

  const { data: movies, isError, isLoading } = useQuery<MovieResponse>({
    queryKey: ["movies", page],
    queryFn: () => getMoviesList(page),
    placeholderData: keepPreviousData,
  });

  const totalPages = Math.min(movies?.total_pages || 1, 50);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <main className="mt-[80px] mx-[68px]">
      <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading movies</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies?.results.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Prev
        </button>

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Movies;
