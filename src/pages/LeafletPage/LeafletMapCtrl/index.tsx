import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IPoint } from "../../../types";

import "./leafletMapCtrl.css";
import { LatLng } from "leaflet";
import PointInfo from "./PointInfo";
import { Button } from "@mui/material";

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
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    const formattedPoints: LatLng[] = points.map(
      ({ location: { lat, lng }, elevation }) =>
        new LatLng(lat, lng, elevation),
    );
    const dist: number =
      formattedPoints.length === 2
        ? formattedPoints[0].distanceTo(formattedPoints[1])
        : 0;
    setDistance(dist);
  }, [points]);

  return (
    <div id={"leaflet-ctrl"}>
      <Button
        disabled={points.length === 0}
        onClick={() => {
          onPointChange([]);
        }}
      >
        Clear
      </Button>
      {points.map((point: IPoint, i) => (
        <PointInfo
          key={i}
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
