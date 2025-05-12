import FavoriteButton from '@/ui/FavoriteButton';
import { Movie } from '@/types/movie';
import Image from 'next/image';
import Link from 'next/link';

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <article className="relative min-w-[300px] group cursor-pointer rounded-[4px] overflow-hidden shadow-lg">
      <div className="relative">
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE_URL + movie.backdrop_path}
          alt={movie.title}
          width={300}
          height={200}
          className="w-full h-[200px] object-cover rounded-[4px] transition-all duration-500 group-hover:opacity-90"
        />
        <div className="absolute bottom-0 left-0 flex justify-between items-center w-full p-2 bg-black/20 backdrop-blur-sm rounded-b-[4px] group-hover:bg-black/30 transition-all duration-300">
          <h3 className="font-medium text-white text-lg truncate">
            {movie.title}
          </h3>
          <Link href={`/movie/${movie.id}`} className="text-sm  hover:text-red-600 transition-colors duration-300">Details</Link>
        </div>
      </div>
      <FavoriteButton media={movie} />
    </article>
  )
}

export default MovieCard;
