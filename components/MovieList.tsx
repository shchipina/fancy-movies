"use client"
import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowBuutons';

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
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="mt-16">
      <div className="flex justify-between">
        <h2 className="text-[26px] font-medium mb-6">{title}</h2>
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>
      </div>
      <section className="overflow-hidden">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="flex gap-3">
            {data?.map(renderItem)}
          </div>
        </div>
      </section>
    </section>
  )
}

export default MovieList;
