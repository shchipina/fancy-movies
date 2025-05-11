'use client';

import FavoriteButton from '@/ui/FavoriteButton';
import { TV } from '@/types/tv';
import Image from 'next/image';
import Link from 'next/link';

const TVCard = ({ tv }: { tv: TV }) => {
  return (
    <Link href={`/tv/${tv.id}`}>
      <article className="relative min-w-[300px] group cursor-pointer rounded-[4px] overflow-hidden shadow-lg">
        <div className="relative">
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + tv.backdrop_path}
            alt={tv.name}
            width={300}
            height={200}
            className="w-full h-[200px] object-cover rounded-[4px] transition-all duration-500 group-hover:opacity-90"
          />
          <div className="absolute bottom-0 left-0 flex justify-between items-center w-full p-2 bg-black/20 backdrop-blur-sm rounded-b-[4px] group-hover:bg-black/30 transition-all duration-300">
            <h3 className="font-medium text-white text-lg truncate">
              {tv.name}
            </h3>
            <span className="text-sm hover:text-red-600 transition-colors duration-300">Details</span>
          </div>
        </div>
        <FavoriteButton media={tv} />
      </article>
    </Link>
  );
};

export default TVCard;
