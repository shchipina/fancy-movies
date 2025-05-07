"use client"
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAppDispatch } from "@/hooks/reduxHook";
import { getPopularMovies } from "@/lib/api/movie";
import { removeUser } from "@/store/features/userSlice";
import { useQuery } from "@tanstack/react-query";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";

export default function Home() {
  const dispatch = useAppDispatch();

  const { data: popularMovies, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: getPopularMovies,
  });

  if (isError) return console.log("error");
  if (isLoading) return console.log("isLoading");


  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      dispatch(removeUser());
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ProtectedRoute>
      <Header />
      <button onClick={handleLogout}>Log out</button>

      <div>
        {popularMovies?.map(movie => (
          <div key={movie.id}>
            <p>{movie.title}</p>
            <Image
              src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
              alt={movie.title}
              title={movie.title}
              width={200}
              height={300}
            />
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
}
