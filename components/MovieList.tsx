"use client"
import { useQuery } from '@tanstack/react-query';

type Props<T> = {
  title: string,
  queryKey: string[],
  queryFn: () => Promise<T[]>,
  renderItem: (item: T) => React.ReactNode,
}

const MovieList = <T,>({ title, queryKey, queryFn, renderItem }: Props<T>) => {
  const { data } = useQuery({
    queryKey,
    queryFn,
  });


  return (
    <div className="mt-16">
      <h2 className="text-[26px] font-medium mb-6">{title}</h2>
      <div className="custom-scroll  cursor-pointer overflow-auto flex gap-4">
        {data?.map(renderItem)}
      </div>
    </div>
  )
}

export default MovieList;
