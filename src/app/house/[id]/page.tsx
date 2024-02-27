"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Heart, Ruler, Share2, Trees } from "lucide-react";
import FallbackImage from "~/components/ui/fallback-image";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { fallbackImageUrl, getHousesData } from "~/lib/data";

export default function House({ params }: { params: { id: number } }) {
  const houses = getHousesData();
  const house = houses[params.id];

  if (!house) {
    return <div>House not found</div>;
  }

  return (
    <div className="flex h-svh flex-1 flex-col pt-3">
      <ScrollArea className="mx-auto max-w-full rounded-md  ">
        <div className="  grid auto-cols-max  grid-flow-col  gap-4">
          <div className="col-span-6">
            <div className="  w-[720px]">
              <AspectRatio ratio={4 / 3}>
                <FallbackImage
                  src={house.imageUrl}
                  fallbackSrc={fallbackImageUrl}
                  alt="House Image"
                />
              </AspectRatio>
            </div>
          </div>
          <div className="col-span-3 flex flex-col space-y-4">
            <div className="relative  w-[400px]">
              <AspectRatio ratio={4 / 3}>
                <FallbackImage
                  src={house.imageUrl}
                  fallbackSrc={fallbackImageUrl}
                  alt="House Image"
                />
              </AspectRatio>
            </div>
            <div className="relative w-[400px]">
              <AspectRatio ratio={16 / 9}>
                <FallbackImage
                  src={house.imageUrl}
                  fallbackSrc={fallbackImageUrl}
                  alt="House Image"
                />
              </AspectRatio>
            </div>
          </div>
          <div className="col-span-3">
            <div className="  w-[720px]">
              <AspectRatio ratio={4 / 3}>
                <FallbackImage
                  src={house.imageUrl}
                  fallbackSrc={fallbackImageUrl}
                  alt="House Image"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="container flex flex-col  pt-4">
        <div className="  flex items-center justify-between ">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="flex size-8 rounded-full bg-zinc-200">
                <div className="m-auto text-sm text-zinc-500">24</div>
              </div>
              <div className="text-base">Photos</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex size-8 rounded-full bg-zinc-200">
                <div className="m-auto text-sm text-zinc-500">1</div>
              </div>
              <div className="text-base">Video</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex size-8 rounded-full bg-zinc-200">
                <div className="m-auto text-sm text-zinc-500">3</div>
              </div>
              <div className="text-base">Floor plans</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 ">
            <div className="flex items-center space-x-2 *:hover:cursor-pointer *:hover:text-zinc-500">
              <Heart className="size-8" />
              <div className="text-base">Like</div>
            </div>
            <div className="flex items-center space-x-2 *:hover:cursor-pointer *:hover:text-zinc-500">
              <Share2 className="size-8" />
              <div className="text-base">Share</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col pt-20">
          <div className="text-3xl font-bold">{house.location}</div>
          <div className="text-lg">
            {house.formattedPrice} / {house.monthlyPrice}
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Heart className="size-6" />
              <div className="text-sm">{house.beds}</div>
            </div>
            <div className="flex items-center space-x-2">
              <Ruler className="size-6" />
              <div className="text-sm">{house.livingArea} m2</div>
            </div>
            <div className="flex items-center space-x-2">
              <Trees className="size-6" />
              <div className="text-sm">{house.plotSize} m2</div>
            </div>
          </div>
          <div className="pt-8">
            <div className="text-lg font-bold">Description</div>
            <p className="text-base font-light">{house.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
