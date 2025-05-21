"use client"

import TVCard from "@/components/TVCard";
import { getAllTV } from "@/lib/api/tv";
import { TVResponse } from "@/types/tv";
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react";

function TVShows() {
  const [page, setPage] = useState(1);

  const { data: tvShows, isError, isLoading } = useQuery<TVResponse>({
    queryKey: ["tv-shows", page],
    queryFn: () => getAllTV(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <h2>loading</h2>
  }

  if (isError) {
    return <h2>Error</h2>
  }
  const totalPages = Math.max(tvShows?.total_pages || 1)

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <main className="mt-[80px] mx-[68px]">
      <h2>TV Shows</h2>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tvShows?.results.map(tvShow => (
          <TVCard tv={tvShow} key={tvShow.id} />
        ))}
      </section>
      <section>
        <button onClick={handlePrev}>Prev</button>
        <span>{page}</span>
        <button onClick={handleNext}>Next</button>
      </section>
    </main>
  )
}

export default TVShows