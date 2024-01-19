import { IPosition } from "./LeafletMap/types";
import LeafletMap from "./LeafletMap";
import LeafletMapCtrl from "./LeafletMapCtrl";
import { useState } from "react";

import "./leafletPage.css";

const LeafletMapPage = () => {
  const initialPosition: IPosition = {
    lat: 45.55724,
    lng: 6.65187,
  };

  const [position, setPosition] = useState<IPosition>(initialPosition);
  const [radius, setRadius] = useState<number>(10);

  return (
    <>
      <h1>Leaflet</h1>
      <div id={"leaflet"}>
        <LeafletMap
          coordinate={position}
          onPositionChange={setPosition}
          radius={radius}
        />
        <LeafletMapCtrl
          position={position}
          radius={radius}
          onRadiusChange={setRadius}
        />
      </div>
    </>
  );
};

export default LeafletMapPage;
