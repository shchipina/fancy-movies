"use client"

import MovieCard from "@/components/MovieCard";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { getMovieDetails, getRecommendationByMovie } from "@/lib/api/movie";
import { add } from "@/store/features/favoritesSlice";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.favorites);

  const { data: movieDetails, isError, isLoading } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(id),
  });

  const { data: recommends } = useQuery({
    queryKey: ["recommends", id],
    queryFn: () => getRecommendationByMovie(id)
  });

  if (isError) return <h1>Error loading movie</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  const { details, credits, video, review } = movieDetails!;
  const movieImagePath = process.env.NEXT_PUBLIC_IMAGE_URL + details.poster_path;

  return (
    <main className="mt-[100px] mx-[68px] pb-[150px] text-white/60 max-w-7xl">
      <article className="flex flex-col gap-6 md:flex-row" aria-labelledby="movie-title">
        <figure className="relative w-full max-w-xs h-[450px] mx-auto md:mx-0">
          <Image
            src={movieImagePath}
            alt={details.title}
            fill
            className="object-cover rounded-[4px]"
          />
        </figure>

        <section className="w-full">
          <header>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-4 text-center md:text-left">
              {details.title}
            </h1>
          </header>
          <p className="mb-4">{details.overview}</p>
          <p className="mb-2"><strong>Release date:</strong> {details.release_date}</p>
          <p className="mb-2">
            <strong>Genres:</strong>{" "}
            {details.genres.map(genre => (
              <span key={genre.id} className="mr-2">{genre.name}</span>
            ))}
          </p>
          <a
            href={details.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 py-2 px-4 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Watch on Netflix
          </a>
          <button
            onClick={() => dispatch(add(details))}
            className="block mt-3 px-4 py-2 border border-white/20 rounded hover:bg-white/10 transition"
          >
            Add to Favorites
          </button>
        </section>
      </article>

      <section className="mt-10" aria-label="Trailer">
        <div className="w-full aspect-video max-w-4xl mx-auto">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.results[0]?.key}`}
            title="YouTube trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section className="mt-10" aria-label="Trailer">
        <h2 className="text-xl sm:text-2xl text-white mb-4 text-center sm:text-left">
          You may also like
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth">
          {recommends?.results.slice(0, 10).map(recommend => (
            <div key={recommend.id} className="flex-shrink-0 w-[150px] sm:w-[180px]">
              <MovieCard movie={recommend} />
            </div>
          ))}
        </div>
      </section>


      <section className="mt-10" aria-labelledby="top-cast">
        <h2 className="text-xl sm:text-2xl text-white mb-4 text-center sm:text-left">Top Cast</h2>
        <div className="flex overflow-x-auto gap-4">
          {credits.cast.slice(0, 10).map(actor => (
            <figure key={actor.name} className="w-[100px] sm:w-[120px] text-center text-white/60 flex-shrink-0">
              {actor.profile_path ? (
                <Image
                  src={process.env.NEXT_PUBLIC_IMAGE_URL + actor.profile_path}
                  alt={actor.name}
                  width={120}
                  height={180}
                  className="rounded w-full h-auto"
                />
              ) : (
                <div className="w-full h-[180px] bg-gray-800 flex items-center justify-center rounded">
                  No image
                </div>
              )}
              <figcaption className="mt-2 text-sm">
                <p>{actor.name}</p>
                <p className="text-xs text-white/40">{actor.character}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="reviews">
        <h2 className="text-xl sm:text-2xl text-white mb-4 text-center sm:text-left">Reviews</h2>
        {review.results.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          review.results.slice(0, 3).map((rev, index) => (
            <article key={index} className="mb-6 p-4 border border-white/10 rounded">
              <header>
                <p className="text-white font-semibold">@{rev.author_details.username}</p>
                <p className="text-white/40 text-sm">{new Date(rev.created_at).toLocaleDateString()}</p>
              </header>
              <p className="text-white/70 mt-2 line-clamp-2">{rev.content}</p>
            </article>
          ))
        )}
      </section>
    </main>

  );
}

export default MovieDetails;
