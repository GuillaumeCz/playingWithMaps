import React, { useEffect, useRef } from "react";
import { useGeographic } from "ol/proj";
import { Map, View } from "ol";
import { MAP_CENTER, MAP_ZOOM } from "../../../shared";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";

import "ol/ol.css";
import "./openLayersMap.css";

const osmLayer = new TileLayer({
  preload: Infinity,
  source: new OSM(),
});
const OpenLayersMap = () => {
  const mapElt = useRef<HTMLDivElement | null>(null);

  useGeographic();

  useEffect(() => {
    if (!mapElt.current) return;
    const map = new Map({
      layers: [osmLayer],
      view: new View({
        center: [MAP_CENTER.lng, MAP_CENTER.lat],
        zoom: MAP_ZOOM,
      }),
    });
    map.setTarget(mapElt.current);
    return () => map.setTarget("");
  }, []);

  return (
    <>
      <div id={"openlayers-map"} ref={mapElt} className={"map-container"}></div>
    </>
  );
};
export default OpenLayersMap;
