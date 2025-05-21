"use client"

import { getTVShowDetails } from '@/lib/api/tv';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

function TVDetails() {
  const { id } = useParams<{ id: string }>();
  const tvId = parseInt(id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tv-details', tvId],
    queryFn: () => getTVShowDetails(tvId),
    enabled: !!tvId,
  });

  if (isLoading) return <div className="mt-[80px] text-center">Loading...</div>;
  if (isError || !data) return <div className="mt-[80px] text-center">Error loading TV details</div>;

  const { details, video, credits, review } = data;
  const trailer = video.results.find(v => v.type === 'Trailer');
  const topCast = credits.cast.slice(0, 6);

  return (
    <main className="mt-[80px] px-6 lg:px-[68px] py-10">
      {/* Header section */}
      <section className="flex flex-col lg:flex-row gap-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.name}
          width={300}
          height={450}
          className="rounded-xl shadow-lg"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl lg:text-5xl font-bold">{details.name}</h1>
          <div className="flex items-center gap-4 text-yellow-500">
            <span className="text-lg font-medium">{details.vote_average.toFixed(1)} / 10</span>
            <span className="text-gray-500">({details.vote_count} votes)</span>
          </div>
          <p className="text-gray-300">{details.overview}</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="bg-gray-800 px-3 py-1 rounded-full">{details.first_air_date}</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">{details.status}</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">{details.number_of_seasons} season(s)</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">{details.number_of_episodes} episodes</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {details.genres.map(genre => (
              <span key={genre.id} className="bg-purple-700 px-3 py-1 rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>

          {trailer && (
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Watch Trailer
            </a>
          )}
        </div>
      </section>

      {/* Cast section */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Top Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {topCast.map(cast => (
            <div key={cast.id} className="text-center">
              <Image
                src={cast.profile_path ? `https://image.tmdb.org/t/p/w185${cast.profile_path}` : '/no-profile.jpg'}
                alt={cast.name}
                width={120}
                height={180}
                className="rounded-lg mx-auto"
              />
              <p className="mt-2 font-medium">{cast.name}</p>
              <p className="text-sm text-gray-400">as {cast.character}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews section */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="space-y-6">
          {review.results.length > 0 ? (
            review.results.map(r => (
              <div key={r.id} className="bg-gray-900 p-4 rounded-lg shadow">
                <p className="font-semibold mb-2">{r.author}</p>
                <p className="text-gray-300 text-sm mb-1 italic">{new Date(r.created_at).toLocaleDateString()}</p>
                <p className="text-gray-200">{r.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews available.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default TVDetails;
