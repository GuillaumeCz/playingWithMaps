import { IPoint, IPosition } from "../../types";
import LeafletMap from "./LeafletMap";
import LeafletMapCtrl from "./LeafletMapCtrl";
import { useState } from "react";

import "./leafletPage.css";

const LeafletMapPage = () => {
  const initialPosition: IPosition = {
    lat: 45.55724,
    lng: 6.65187,
  };

  const initialPoint: IPoint = {
    id: 1,
    location: initialPosition,
    isRadiusVisible: false,
    radius: 10,
    elevation: 0,
  };

  const [points, setPoints] = useState<Array<IPoint>>([
    initialPoint,
    {
      ...initialPoint,
      id: 2,
    },
  ]);

  return (
    <>
      <h1>Leaflet</h1>
      <div id={"leaflet"}>
        <LeafletMap
          points={points}
          onPointsChange={setPoints}
          mapCenter={initialPosition}
        />
        <LeafletMapCtrl points={points} onPointChange={setPoints} />
      </div>
    </>
  );
};

export default LeafletMapPage;
