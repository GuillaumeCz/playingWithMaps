import { IElevation, IPoint } from "../../types";
import LeafletMap from "./LeafletMap";
import LeafletMapCtrl from "./LeafletMapCtrl";
import React, { useEffect, useState } from "react";

import "./leafletPage.css";
import { getElevationProfile } from "../../api/IGNApi";
import ElevationChart from "./ElevationChart";

const MAP_CENTER = { lat: 45.55724, lng: 6.65187 };

const LeafletMapPage = () => {
  const [points, setPoints] = useState<Array<IPoint>>([]);
  const [elevationProfile, setElevationProfile] = useState<IElevation[]>([]);
  const [sampling, setSampling] = useState<number>(10);
  const [refreshKey, setRefreshKey] = useState<string>("");

  useEffect(() => {
    setRefreshKey(
      points
        .map(({ location }) => location)
        .reduce((acc, { lat, lng }) => {
          return acc + lat + lng;
        }, ""),
    );
  }, [points, sampling]);

  useEffect(() => {
    const fetchData = async () => {
      setElevationProfile(
        await getElevationProfile(
          points.map(({ location }) => location),
          sampling,
        ),
      );
    };

    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, [refreshKey, sampling]);

  return (
    <>
      <h1>Leaflet</h1>
      <div id={"leaflet"}>
        <div className="ctrl">
          <LeafletMap
            points={points}
            onPointsChange={setPoints}
            mapCenter={MAP_CENTER}
            elevationProfile={elevationProfile}
          />
          <LeafletMapCtrl
            points={points}
            onPointChange={setPoints}
            refreshKey={refreshKey}
          />
        </div>
        <ElevationChart
          elevationProfile={elevationProfile}
          sampling={sampling}
          setSampling={setSampling}
        />
      </div>
    </>
  );
};

export default LeafletMapPage;
