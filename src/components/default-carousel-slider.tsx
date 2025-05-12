import { ReactNode, useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useQueryClient } from "@tanstack/react-query";
import { WalletQueries } from "@/features/wallets/api/query-keys";

/**
 * @note : This got a bit out of hand! Know that currently it is tied to the WalletQueries.
 *
 * Refactor and abstract when you have time
 */

interface CarouselItemData {
  name: string;
  id: string;
  content: ReactNode;
}

interface DefaultCarouselSliderProps {
  variant: "full-width";
  items: CarouselItemData[];
}

export const DefaultCarouselSlider = ({
  variant,
  items,
}: DefaultCarouselSliderProps) => {
  const width = variant === "full-width" ? "w-full" : "w-full";
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTitle =
    items && items.length > 0 ? items[currentIndex]?.name : "Carousel";
  const client = useQueryClient();

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
      client.invalidateQueries({
        queryKey: WalletQueries.Wallet(items[currentIndex].id),
      });
    };

    api.on("select", handleSelect);

    handleSelect();

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <div className={`${width} relative mt-6`}>
      <Carousel className={`${width}`} setApi={setApi}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[#0C2134] text-[18px] font-light">
            {currentTitle}
          </h3>
          <div className="flex space-x-2">
            <CarouselPrevious className="relative static transform-none h-8 w-8" />
            <CarouselNext className="relative static transform-none h-8 w-8" />
          </div>
        </div>
        <CarouselContent>
          {items?.map((item, index) => (
            <CarouselItem key={index}>{item.content}</CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
