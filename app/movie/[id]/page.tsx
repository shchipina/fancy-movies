"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { getMovieDetails, getRecommendationByMovie } from "@/lib/api/movie";
import { add } from "@/store/features/favoritesSlice";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const state = useAppSelector(state => state.favorites.favorites);
  console.log(state);

  const { data: movieDetails, isError, isLoading } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(id),
  })

  const { data: recommends } = useQuery({
    queryKey: ["recommends", id],
    queryFn: () => getRecommendationByMovie(id)
  })

  if (isError) {
    return <h1>Error</h1>
  }

  if (isLoading) {
    return <h1>Loading</h1>
  }

  const movieImagePath = process.env.NEXT_PUBLIC_IMAGE_URL + movieDetails?.details.poster_path;

  return (
    <div className="mt-[100px] mx-auto px-[68px] pb-[300px]">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="relative w-[300px] h-[450px]">
          <Image
            src={movieImagePath}
            alt={movieDetails?.details.title}
            fill
            className="object-cover rounded-[4px]"
          />
        </div>

        <div className="text-white/60">
          <h2 className="text-4xl font-medium text-white mb-4">
            {movieDetails?.details.title}
          </h2>
          <p>{movieDetails?.details.overview}</p>
          <p>Date release: {movieDetails?.details.release_date}</p>
          <p>Genre: {movieDetails?.details.genres.map(genre => (
            <span key={genre.id} className="mr-2">
              {genre.name}
            </span>
          ))}</p>
          <a
            href={movieDetails?.details.homepage}
            target="_blank"
            className="py-[6px] px-[12px] rounded-[4px] bg-red-600 text-white hover:bg-red-700 transition-colors duration-700"
          >
            Watch on Netflix
          </a>
          <button onClick={() => dispatch(add(movieDetails?.details))}>Add to Favorites</button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
