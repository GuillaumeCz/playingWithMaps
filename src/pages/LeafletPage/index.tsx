import { IElevation, IPoint, IPosition } from "../../types";
import LeafletMap from "./LeafletMap";
import LeafletMapCtrl from "./LeafletMapCtrl";
import { useEffect, useState } from "react";

import "./leafletPage.css";
import { getElevationProfile } from "../../api/altiApi";

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
const LeafletMapPage = () => {
  const [points, setPoints] = useState<Array<IPoint>>(initialPoints);
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
        <LeafletMap
          points={points}
          onPointsChange={setPoints}
          mapCenter={initialLocations[0]}
          elevationProfile={elevationProfile}
        />
        <LeafletMapCtrl
          points={points}
          onPointChange={setPoints}
          elevationProfile={elevationProfile}
          sampling={sampling}
          setSampling={setSampling}
          refreshKey={refreshKey}
        />
      </div>
    </>
  );
};

export default LeafletMapPage;
