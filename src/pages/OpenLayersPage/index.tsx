import React, { useState } from "react";

import OpenLayersMap from "./OpenLayersMap";
import { MAP_CENTER, OlLayers } from "../../shared";
import OpenLayersCtrl from "./OpenLayersCtrl";

const OpenLayersPage = () => {
  const [selectedLayer, setSelectedLayer] = useState<OlLayers>(OlLayers.OSM);
  return (
    <>
      <h1>OpenLayers</h1>
      <OpenLayersMap mapCenter={MAP_CENTER} selectedLayer={selectedLayer} />
      <OpenLayersCtrl
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
      />
    </>
  );
};

export default OpenLayersPage;
