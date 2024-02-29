import React, { useState } from "react";
import OpenLayersMap from "./OpenLayersMap";
import { MAP_CENTER } from "../../shared";
import OpenLayersCtrl from "./OpenLayersCtrl";
import { IPoint } from "../../types";

const OpenLayersPage = () => {
  const [points, setPoints] = useState<IPoint[]>([]);

  return (
    <>
      <h1>OpenLayers</h1>
      <OpenLayersMap
        mapCenter={MAP_CENTER}
        points={points}
        setPoints={setPoints}
      />
      <OpenLayersCtrl />
    </>
  );
};

export default OpenLayersPage;
