"use client";

import { BedDouble, Heart, Ruler, Trees } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AspectRatio } from "~/components/ui/aspect-ratio";
import FallbackImage from "~/components/ui/fallback-image";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { House, getHousesData } from "~/lib/data";

const MapComponent = dynamic(() => import("~/components/map-component"), {
  ssr: false,
  loading: () => <div className="m-auto">Loading...</div>,
});

export default function Home() {
  const [houses, setHouses] = useState<House[]>([]);
  const router = useRouter();
  useEffect(() => {
    const houses = getHousesData();
    setHouses(houses);
  }, []);
  const fallbackImageUrl =
    "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  return (
    <div className="flex h-[90svh] ">
      {/* Side Panel */}
      <div
        className={`bg-background dark:bg-background absolute left-0 top-16 z-20 h-[93svh] w-[40svw] flex-1 transform shadow-md  shadow-zinc-500  `}
      >
        <div className="flex flex-col px-4 pt-4">
          <div className="flex flex-1 items-center justify-between ">
            <div className="text-sm font-bold">{houses.length} houses</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label htmlFor="sort-by">Sort by:</Label>
                <Select>
                  <SelectTrigger
                    id="sort-by"
                    className="w-[180px] border-none shadow-none"
                  >
                    <SelectValue placeholder="Relevancy" />
                  </SelectTrigger>
                  <SelectContent className="border-none">
                    <SelectGroup>
                      <SelectItem value="relevancy">Relevancy</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="size">Size</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="airplane-mode">Show Map</Label>
                <Switch id="airplane-mode" defaultChecked />
              </div>
            </div>
          </div>
          <div className=" pt-4">
            <ScrollArea className="h-[88svh] rounded-md   p-4">
              <div className=" flex flex-1 flex-col space-y-2 *:hover:cursor-pointer border border-transparent   ">
                {houses.map((house, index) => (
                  <div key={index} className="flex-1 hover:border hover:border-primary hover:rounded-lg hover:bg-secondary" onClick={()=>router.push(`house/${index}`)}>
                    <div className="grid grid-cols-3">
                      <div className="col-span-1">
                        <div className="relative w-[240px]">
                          <AspectRatio ratio={4 / 3}>
                            <FallbackImage
                              src={house.imageUrl}
                              fallbackSrc={fallbackImageUrl}
                              alt="House Image"
                            />
                          </AspectRatio>
                          <Heart
                            className={`absolute right-1 top-1 size-6 ${house.favorite ? "fill-primary text-primary-foreground" : "fill-zinc-800/30"} `}
                          />
                        </div>
                      </div>
                      <div className="col-span-2 h-full  p-8">
                        <div className=" flex flex-col space-y-1">
                          <div className="text-sm font-light">Amsterdam</div>
                          <div className="text-xl font-semibold">
                            {house.location}
                          </div>
                          <div className="text-sm">
                            {house.formattedPrice} / {house.monthlyPrice}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-2">
                              <BedDouble />
                              <div className="text-sm">{house.beds}</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Ruler />
                              <div className="text-sm">
                                {house.livingArea} m2
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Trees />
                              <div className="text-sm">{house.plotSize} m2</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
      {/* Map */}
      <MapComponent houses={houses} />
    </div>
  );
}
