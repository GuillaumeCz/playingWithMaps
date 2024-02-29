import React, { Dispatch, RefObject, SetStateAction, useRef } from "react";
import { MAP_ZOOM } from "../../../shared";

import "ol/ol.css";
import "./openLayersMap.css";
import "rlayers/control/layers.css";
import { IPoint, IPosition } from "../../../types";
import {
  RControl,
  RFeature,
  RLayerTile,
  RLayerVector,
  RMap,
  ROSM,
} from "rlayers";
import { useGeographic } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";

interface IOpenLayersMapProps {
  mapCenter: IPosition;
  points: IPoint[];
  setPoints: Dispatch<SetStateAction<IPoint[]>>;
}
const OpenLayersMap = ({
  mapCenter,
  points,
  setPoints,
}: IOpenLayersMapProps) => {
  useGeographic();

  const vectorRef = useRef() as RefObject<RLayerVector>;

  const features = points.map(
    (point) =>
      new Feature({
        geometry: new Point([point.location.lng, point.location.lat]),
        name: point.id,
        uid: point.id,
      }),
  );

  return (
    <RMap
      className={"map-container"}
      initial={{ center: [mapCenter.lng, mapCenter.lat], zoom: MAP_ZOOM }}
      onClick={(e) => {
        if (points.length < 2) {
          const coords = e.map.getCoordinateFromPixel(e.pixel);
          const newPoint = {
            location: {
              lat: coords[1],
              lng: coords[0],
            },
            id: points.length,
            isRadiusVisible: false,
            radius: 0,
          };
          setPoints([...points, newPoint]);
        }
      }}
    >
      <RControl.RScaleLine />
      <RControl.RLayers className={"map-controls ol-layers-control"}>
        <ROSM properties={{ label: "OpenStreetMap" }} />
        <RLayerTile
          properties={{ label: "OpenTopoMap" }}
          url={"https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png"}
        />
      </RControl.RLayers>
      <RLayerVector ref={vectorRef}>
        {features.map((feature) => (
          <RFeature key={feature.get("uid")} feature={feature} />
        ))}
      </RLayerVector>
    </RMap>
  );
};
export default OpenLayersMap;
