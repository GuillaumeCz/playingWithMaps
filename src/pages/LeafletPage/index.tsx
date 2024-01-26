import { IPoint, IPosition } from "../../types";
import LeafletMap from "./LeafletMap";
import LeafletMapCtrl from "./LeafletMapCtrl";
import { useState } from "react";

import "./leafletPage.css";

const LeafletMapPage = () => {
  const initialLocations: IPosition[] = [
    {
      lat: 45.55724,
      lng: 6.65187,
    },
    {
      lat: 45.5564,
      lng: 6.65973,
    },
  ];

  const initialPoints: IPoint[] = [
    {
      id: 1,
      location: initialLocations[0],
      isRadiusVisible: false,
      radius: 10,
    },
    {
      id: 2,
      location: initialLocations[1],
      isRadiusVisible: false,
      radius: 10,
    },
  ];

  const [points, setPoints] = useState<Array<IPoint>>(initialPoints);

  return (
    <>
      <h1>Leaflet</h1>
      <div id={"leaflet"}>
        <LeafletMap
          points={points}
          onPointsChange={setPoints}
          mapCenter={initialLocations[0]}
        />
        <LeafletMapCtrl points={points} onPointChange={setPoints} />
      </div>
    </>
  );
};

export default LeafletMapPage;
