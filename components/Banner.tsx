import { getRandomMovie } from "@/lib/api/movie";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const Banner = () => {
  const { data } = useQuery({
    queryKey: ["randomMovie"],
    queryFn: getRandomMovie,
  });

  // if (isError) return console.log("error");
  // if (isLoading) return console.log("isLoading");

  return (
    <div className="realtive inset-0 -z-10 h-screen w-full">
      <div className="relative h-screen w-full">
        <div
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL + data?.backdrop_path})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="size-full"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute z-10 flex flex-col justify-center items-start px-8 md:px-16 text-white space-y-4 bottom-10">
          <h1 className="text-4xl md:text-6xl font-bold">{data?.title}</h1>
          <p className="max-w-2xl text-base md:text-lg">{data?.overview}</p>
          <div className="flex gap-4 text-sm md:text-base">
            <p>Release: {data?.release_date}</p>
            <p>Rating: {data?.vote_average.toFixed(2)}</p>
          </div>
          <Link href={`/movie/${data?.id}`} className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded">
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
