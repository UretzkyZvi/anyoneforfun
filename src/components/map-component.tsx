import React, { FC, useEffect } from "react";
import { Icon, LatLngExpression } from "leaflet";
import { MapContainer, Popup, TileLayer, useMap, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { House } from "~/lib/data";
import { AspectRatio } from "./ui/aspect-ratio";

import FallbackImage from "./ui/fallback-image";
import { BedDouble, Ruler, Trees } from "lucide-react";

const InvalidateSizeComponent = () => {
  const map = useMap();

  useEffect(() => {
    // Delay to ensure the CSS transition has completed
    const resizeTimer = setTimeout(() => {
      map.invalidateSize();
    }, 300); // Adjust the timing if needed
    return () => clearTimeout(resizeTimer);
  }, [map]);

  return null;
};

interface MapComponentProps {
  houses: House[];
}

const MapComponent: FC<MapComponentProps> = ({ houses }) => {
  const position: LatLngExpression = [52.35, 4.9166];

  const fallbackImageUrl =
    "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const houseIcon = new Icon({
    iconUrl:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhvbWUiPjxwYXRoIGQ9Im0zIDkgOS03IDkgN3YxMWEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnoiLz48cG9seWxpbmUgcG9pbnRzPSI5IDIyIDkgMTIgMTUgMTIgMTUgMjIiLz48L3N2Zz4=",
    iconSize: [25, 25], // Size of the icon
  });
  return (
    <>
      {/* Map Container - Adjust based on sidebar state */}
      <div
        className={`transition-margin relative top-16 z-10   flex-grow duration-300 ease-in-out`}
        style={{ height: "100%" }}
      >
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          doubleClickZoom={false}
          closePopupOnClick={false}
          dragging={true}
          zoomControl={false}
          scrollWheelZoom={true}
          attributionControl={false}
          zoomAnimation={true}
          easeLinearity={0.35}
        >
          {/* Custom hook to manage the map instance for resizing */}
          <InvalidateSizeComponent />
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" />
          {houses.map((house, index) => (
            <Marker
              key={index}
              position={house.lat_long}
              icon={houseIcon}
              interactive={true}
            >
              <Popup>
                <div className="inline-flex space-x-2 ">
                  <div className="relative w-24">
                    <AspectRatio ratio={4 / 3}>
                      <FallbackImage
                        src={house.imageUrl}
                        fallbackSrc={fallbackImageUrl}
                        alt="House Image"
                      />
                    </AspectRatio>
                  </div>

                  <div className="flex    flex-col space-y-2">
                    <div className="text-base font-bold">{house.location}</div>
                    <div className="text-sm">
                      {house.formattedPrice} / {house.monthlyPrice}
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex items-center space-x-2">
                        <BedDouble className="size-4" />
                        <div className="text-sm">{house.beds}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Ruler className="size-4" />
                        <div className="text-sm">{house.livingArea} m2</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Trees className="size-4" />
                        <div className="text-sm">{house.plotSize} m2</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default MapComponent;
