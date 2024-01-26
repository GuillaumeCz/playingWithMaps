import {
  Circle,
  LayersControl,
  MapContainer,
  Polyline,
  TileLayer,
} from "react-leaflet";
import React, { Dispatch, SetStateAction } from "react";
import { IElevation, IPoint, IPosition } from "../../../types";

import "./LeafletMap.css";
import DraggableMarker from "./DraggableMarker";
import { LatLng } from "leaflet";
import { COLORS } from "../../../shared";

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
  elevationProfile: IElevation[];
}

const LeafletMap = ({
  mapCenter,
  points,
  onPointsChange,
  elevationProfile,
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
        {elevationProfile
          .map((elevation: IElevation, i) => {
            if (i !== elevationProfile.length - 1) {
              const nextPoint = elevationProfile[i + 1];
              const startPoint: LatLng = new LatLng(
                elevation.lat,
                elevation.lng,
              );
              const endPoint: LatLng = new LatLng(nextPoint.lat, nextPoint.lng);

              return (
                <Polyline
                  positions={[startPoint, endPoint]}
                  pathOptions={{
                    color:
                      elevation.z - nextPoint.z >= 0
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              );
            }
            return null;
          })
          .filter((elt) => elt !== null)}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
