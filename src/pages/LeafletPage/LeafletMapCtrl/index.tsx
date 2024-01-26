import React, { Dispatch, SetStateAction } from "react";
import { IPoint } from "../../../types";

import "./leafletMapCtrl.css";
import { LatLng } from "leaflet";
import PointInfo from "./PointInfo";

interface ILeafletMapCtrlProps {
  points: Array<IPoint>;
  onPointChange: Dispatch<SetStateAction<IPoint[]>>;
  refreshKey: string;
}
const LeafletMapCtrl = ({
  points,
  onPointChange,
  refreshKey,
}: ILeafletMapCtrlProps) => {
  // Meilleur moyen pour choper la distance ? Reflechir a faire ça en 1 expression, 1 shot
  const formattedPoints: LatLng[] = points.map(
    ({ location: { lat, lng }, elevation }) => new LatLng(lat, lng, elevation),
  );
  const distance: number = formattedPoints[0].distanceTo(formattedPoints[1]);

  return (
    <div id={"leaflet-ctrl"}>
      {points.map((point: IPoint) => (
        <PointInfo
          refreshKey={refreshKey}
          point={point}
          points={points}
          onPointChange={onPointChange}
        />
      ))}
      <div>
        {distance && (
          <div>Distance: {distance.toString().substring(0, 7)} m</div>
        )}
      </div>
    </div>
  );
};

export default LeafletMapCtrl;
