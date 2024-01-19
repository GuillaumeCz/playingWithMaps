import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getElevation } from "../../../api/altiApi";
import { IPosition } from "../LeafletMap/types";
import { Slider } from "@mui/material";

import "./leafletMapCtrl.css";

interface ILeafletMapCtrlProps {
  position: IPosition;
  radius: number;
  onRadiusChange: Dispatch<SetStateAction<number>>;
}
const LeafletMapCtrl = ({
  position,
  radius,
  onRadiusChange,
}: ILeafletMapCtrlProps) => {
  const { lat, lng } = position;
  const [elevation, setElevation] = useState<number>(0);

  useEffect(() => {
    let ignore: boolean = false;
    getElevation(position).then((elev) => {
      if (!ignore) setElevation(elev);
    });
    return () => {
      ignore = true;
    };
  }, [position]);
  return (
    <div id={"leaflet-ctrl"}>
      Elevation: {elevation} m
      <div className={"leaflet-map-slider"}>
        <div>Radius: {radius} m</div>
        <Slider
          value={radius}
          step={10}
          marks
          min={10}
          max={200}
          valueLabelDisplay={"auto"}
          onChange={(e, value) => onRadiusChange(value as number)}
        />
      </div>
      <div>Position: {`${lat}, ${lng}`}</div>
    </div>
  );
};

export default LeafletMapCtrl;
