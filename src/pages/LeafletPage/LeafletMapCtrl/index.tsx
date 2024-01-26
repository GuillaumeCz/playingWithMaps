import React, { Dispatch, SetStateAction } from "react";
import { IElevation, IPoint } from "../../../types";
import { TextField } from "@mui/material";

import "./leafletMapCtrl.css";
import { LatLng } from "leaflet";
import ElevationChart from "./ElevationChart";
import PointInfo from "./PointInfo";

interface ILeafletMapCtrlProps {
  points: Array<IPoint>;
  onPointChange: Dispatch<SetStateAction<IPoint[]>>;
  elevationProfile: IElevation[];
  sampling: number;
  setSampling: Dispatch<SetStateAction<number>>;
  refreshKey: string;
}
const LeafletMapCtrl = ({
  points,
  onPointChange,
  elevationProfile,
  sampling,
  setSampling,
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
      <div>
        <TextField
          id={"sampling"}
          label={"Sampling"}
          type={"number"}
          value={sampling}
          onChange={(event) => setSampling(Number(event.target.value))}
        />
      </div>

      <ElevationChart elevationProfile={elevationProfile} />
    </div>
  );
};

export default LeafletMapCtrl;
