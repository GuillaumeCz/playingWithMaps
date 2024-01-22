import {
  Circle,
  LayersControl,
  MapContainer,
  Polyline,
  TileLayer,
} from "react-leaflet";
import React, { Dispatch, SetStateAction } from "react";
import { IPoint, IPosition } from "../../../types";

import "./LeafletMap.css";
import DraggableMarker from "./DraggableMarker";
import { LatLng } from "leaflet";

interface ILayer {
  name: string;
  isDefault: boolean;
  attribution: string;
  url: string;
}

interface ILeafletMapProps {
  mapCenter: IPosition;
  points: Array<IPoint>;
  onPointsChange: Dispatch<SetStateAction<Array<IPoint>>>;
}

const LeafletMap = ({
  mapCenter,
  points,
  onPointsChange,
}: ILeafletMapProps) => {
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

  const updatePoint = (updatedPointId: number, newPosValue: IPosition) =>
    onPointsChange(
      points.map(({ id, location, ...rest }) => ({
        id,
        location: updatedPointId === id ? newPosValue : location,
        ...rest,
      })),
    );

  const { lat: mapCenterLat, lng: mapCenterLng } = mapCenter;

  const lineLocation: LatLng[] =
    points.length > 1
      ? points.map(
          ({ location: { lat, lng }, elevation }) =>
            new LatLng(lat, lng, elevation),
        )
      : [];

  return (
    <>
      <MapContainer center={[mapCenterLat, mapCenterLng]} zoom={16} id={"map"}>
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
        {points.map((point: IPoint) => {
          const {
            id,
            isRadiusVisible,
            location: { lat, lng },
            radius,
          } = point;
          return (
            <div key={id}>
              <DraggableMarker
                point={point}
                onPositionChange={(newPointLocation: IPosition) =>
                  updatePoint(id, newPointLocation)
                }
              />
              {isRadiusVisible && (
                <Circle
                  center={[lat, lng]}
                  pathOptions={{ color: "red" }}
                  radius={radius}
                />
              )}
            </div>
          );
        })}
        {lineLocation.length && <Polyline positions={lineLocation} />}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
