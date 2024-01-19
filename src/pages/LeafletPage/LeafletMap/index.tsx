import {
  Circle,
  LayersControl,
  MapContainer,
  Marker,
  TileLayer,
} from "react-leaflet";
import React, { useRef, useMemo, Dispatch, SetStateAction } from "react";
import { IPosition } from "../../../types";

import "./LeafletMap.css";

interface ILayer {
  name: string;
  isDefault: boolean;
  attribution: string;
  url: string;
}

interface ILeafletMapProps {
  position: IPosition;
  onPositionChange: Dispatch<SetStateAction<IPosition>>;
  radius: number;
  isRadiusVisible: boolean;
}

const LeafletMap = ({
  position,
  onPositionChange,
  radius,
  isRadiusVisible,
}: ILeafletMapProps) => {
  const markerRef = useRef(null);

  const handleMarkerDragged = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) onPositionChange(marker.getLatLng());
      },
    }),
    [onPositionChange],
  );

  const { lat, lng }: IPosition = position;

  const layers: ILayer[] = [
    {
      name: "OpenStreetMap",
      isDefault: true,
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
    {
      name: "OpenTopoMap",
      isDefault: false,
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenTopoMap</a> contributors`,
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    },
  ];

  return (
    <>
      <MapContainer center={[lat, lng]} zoom={16} id={"map"}>
        <LayersControl>
          {layers.map(
            ({ name, attribution, url, isDefault }: ILayer, index: number) => (
              <LayersControl.BaseLayer
                name={name}
                checked={isDefault}
                key={index}
              >
                <TileLayer attribution={attribution} url={url} />
              </LayersControl.BaseLayer>
            ),
          )}
        </LayersControl>
        <Marker
          ref={markerRef}
          position={[lat, lng]}
          draggable
          eventHandlers={handleMarkerDragged}
        />
        {isRadiusVisible && (
          <Circle
            center={[lat, lng]}
            pathOptions={{ color: "red" }}
            radius={radius}
          />
        )}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
