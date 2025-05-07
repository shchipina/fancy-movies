import { getPopularMovies } from '@/lib/api/movie';
import { useQuery } from '@tanstack/react-query';
import MovieCard from './MovieCard';

const PopularMovies = () => {
  const { data: popularMovies, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: getPopularMovies,
  });

  if (isError) return console.log("error");
  if (isLoading) return console.log("isLoading");

  return (
    <div className="mt-16">
      <h2 className="text-[26px] font-medium mb-6">Popular Movies</h2>
      <div className="custom-scroll  cursor-pointer overflow-auto flex gap-4">
          {popularMovies?.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  )
}

export default PopularMovies;
