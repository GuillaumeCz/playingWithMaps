import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import React from "react";
import { ICoordinate } from "./types";

import "./LeafletMap.css";

interface IProps {
  coordinate: ICoordinate;
}
const LeafletMap = (props: IProps) => {
  const { lat, long } = props.coordinate;
  return (
    <>
      <MapContainer center={[lat, long]} zoom={16} id={"map"}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, long]}>
          <Popup>Maison !</Popup>
        </Marker>
      </MapContainer>
    </>
  );
};
export default LeafletMap;
