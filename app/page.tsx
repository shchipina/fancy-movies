"use client"
import Banner from "@/components/Banner";
import PopularMovies from "@/components/PopularMovies";
import ProtectedRoute from "@/components/ProtectedRoute";
// import { useAppDispatch } from "@/hooks/reduxHook";
// import { removeUser } from "@/store/features/userSlice";
// import { getAuth, signOut } from "firebase/auth";

export default function Home() {
  // const dispatch = useAppDispatch();

  // const handleLogout = async () => {
  //   try {
  //     const auth = getAuth();
  //     await signOut(auth);
  //     dispatch(removeUser());
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // <button onClick={handleLogout}>Log out</button>

  return (
    <ProtectedRoute>
      <main>
        <Banner />

        <PopularMovies />
      </main>
    </ProtectedRoute>
  );
}
