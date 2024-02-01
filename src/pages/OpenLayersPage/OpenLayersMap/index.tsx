import React, { useEffect, useRef } from "react";
import { useGeographic } from "ol/proj";
import { Map, View } from "ol";
import { MAP_ZOOM, OlLayers } from "../../../shared";
import TileLayer from "ol/layer/Tile";
import { OSM, XYZ } from "ol/source";

import "ol/ol.css";
import "./openLayersMap.css";
import { IPosition } from "../../../types";

interface IOpenLayersMapProps {
  mapCenter: IPosition;
  selectedLayer: OlLayers;
}

const OpenLayersMap = ({ mapCenter, selectedLayer }: IOpenLayersMapProps) => {
  const mapElt = useRef<HTMLDivElement | null>(null);

  const osmLayer = new TileLayer({
    visible: selectedLayer === OlLayers.OSM,
    preload: Infinity,
    source: new OSM(),
  });
  const otmLayer = new TileLayer({
    visible: selectedLayer === OlLayers.OTM,
    preload: Infinity,
    source: new XYZ({
      url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png",
    }),
  });

  useGeographic();

  useEffect(() => {
    if (!mapElt.current) return;
    const map = new Map({
      layers: [osmLayer, otmLayer],
      view: new View({
        center: [mapCenter.lng, mapCenter.lat],
        zoom: MAP_ZOOM,
      }),
    });
    map.setTarget(mapElt.current);
    return () => map.setTarget("");
  }, [selectedLayer]);

  return (
    <>
      <div id={"openlayers-map"} ref={mapElt} className={"map-container"}></div>
    </>
  );
};
export default OpenLayersMap;
