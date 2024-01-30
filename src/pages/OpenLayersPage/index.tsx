import TileLayer from "ol/layer/Tile";
import React, { useEffect, useRef } from "react";
import { OSM } from "ol/source";
import { Map, View } from "ol";

import "ol/ol.css";
import { MAP_CENTER, MAP_ZOOM } from "../../shared";
import { useGeographic } from "ol/proj";

const osmLayer = new TileLayer({
  preload: Infinity,
  source: new OSM(),
});

const OpenLayersPage = () => {
  const mapElt = useRef<HTMLDivElement | null>(null);
  useGeographic();

  useEffect(() => {
    if (!mapElt.current) return;
    const m = new Map({
      layers: [osmLayer],
      view: new View({
        center: [MAP_CENTER.lng, MAP_CENTER.lat],
        zoom: MAP_ZOOM,
      }),
    });
    m.setTarget(mapElt.current);
    return () => m.setTarget("");
  }, []);

  return (
    <div
      id={"mapDiv"}
      ref={mapElt}
      style={{ height: "300px", width: "75%" }}
      className={"map-container"}
    ></div>
  );
};

export default OpenLayersPage;
