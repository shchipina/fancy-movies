"use client"
import Banner from "@/components/Banner";
import PopularMovies from "@/components/PopularMovies";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <main>
        <Banner />

        <div className="px-[64px]">
          <PopularMovies />
        </div>
      </main>
    </ProtectedRoute>
  );
}
