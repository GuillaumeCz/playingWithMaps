import {
  CircleMarker,
  LayersControl,
  MapContainer,
  Marker,
  TileLayer,
  WMSTileLayer,
} from "react-leaflet";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { ILeafletMapProps, IPosition } from "./types";

import "./LeafletMap.css";
import { Slider } from "@mui/material";
import { getElevation } from "../api/altiApi";

interface ILayer {
  name: string;
  isDefault: boolean;
  attribution: string;
  url: string;
}

const LeafletMap = (props: ILeafletMapProps) => {
  const { coordinate } = props;

  const markerRef = useRef(null);

  const [position, setPosition] = useState<IPosition>(coordinate);
  const [radius, setRadius] = useState<number>(10);
  const [elevation, setElevation] = useState<number>(0);

  useEffect(() => {
    let ignore: boolean = false;
    getElevation(position).then((elev) => {
      if (!ignore) setElevation(elev);
    });
    return () => {
      ignore = true;
    };
  }, [position]);

  const handleMarkerDragged = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) setPosition(marker.getLatLng());
      },
    }),
    [],
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
      Elevation: {elevation} m
      <div className={"leaflet-map-slider"}>
        <div>Radius:</div>
        <Slider
          value={radius}
          step={10}
          marks
          min={10}
          max={200}
          valueLabelDisplay={"auto"}
          onChange={(e, value) => setRadius(value as number)}
        />
      </div>
      <div>Position: {`${lat}, ${lng}`}</div>
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
        <CircleMarker
          center={[lat, lng]}
          pathOptions={{ color: "red" }}
          radius={radius}
        />
      </MapContainer>
    </>
  );
};

export default LeafletMap;
