import { IPosition } from "../LeafletMap/types";
import LeafletMap from "../LeafletMap/LeafletMap";

const LeafletMapPage = () => {
  const coordinate: IPosition = {
    lat: 45.55724,
    lng: 6.65187,
  };
  return (
    <div>
      <h1>Leaflet</h1>
      <LeafletMap coordinate={coordinate}></LeafletMap>
    </div>
  );
};

export default LeafletMapPage;
