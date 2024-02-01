import React from "react";
import { MAP_ZOOM, OlLayers } from "../../../shared";

import "ol/ol.css";
import "./openLayersMap.css";
import { IPosition } from "../../../types";
import { RLayerTile, RMap, ROSM } from "rlayers";
import { useGeographic } from "ol/proj";

interface IOpenLayersMapProps {
  mapCenter: IPosition;
  selectedLayer: OlLayers;
}
const OpenLayersMap = ({ mapCenter, selectedLayer }: IOpenLayersMapProps) => {
  useGeographic();
  return (
    <RMap
      className={"map-container"}
      initial={{ center: [mapCenter.lng, mapCenter.lat], zoom: MAP_ZOOM }}
    >
      {selectedLayer === OlLayers.OSM && <ROSM />}
      {selectedLayer === OlLayers.OTM && (
        <RLayerTile
          url={"https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png"}
        />
      )}
    </RMap>
  );
};
export default OpenLayersMap;
