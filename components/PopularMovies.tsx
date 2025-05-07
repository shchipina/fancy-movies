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
    <div>
      <h2>Popular Movies</h2>
      <div className="overflow-scroll w-full px-12 flex">
        <div className="">
          {popularMovies?.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularMovies;
