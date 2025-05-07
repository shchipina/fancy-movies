import { Movie } from '@/types/movie'
import Image from 'next/image';
import React from 'react'

type Props = {
  movie: Movie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  return (
    <article className="w-[300px]">
      <Image
        src={process.env.NEXT_PUBLIC_IMAGE_URL + movie.backdrop_path}
        alt={movie.title} 
        width={300}
        height={200}
      />
      {movie.title}
    </article>
  )
}

export default MovieCard;
