import { Checkbox, FormControlLabel, FormGroup, Slider } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { IPoint } from "../../../types";
import { getElevations } from "../../../api/IGNApi";

interface IPointInfoProps {
  point: IPoint;
  points: IPoint[];
  onPointChange: Dispatch<SetStateAction<IPoint[]>>;
  refreshKey: string;
}
const PointInfo = ({
  point: {
    id,
    location: { lat, lng },
    isRadiusVisible,
    radius,
    elevation,
  },
  refreshKey,
  points,
  onPointChange,
}: IPointInfoProps) => {
  useEffect(() => {
    const fetchData = async () => {
      const elv: number[] = await getElevations(
        points.map(({ location }) => location),
      );
      const updatedPoints = points.map((point, i) => ({
        ...point,
        elevation: elv[i],
      }));
      console.log(elv);
      onPointChange(updatedPoints);
    };

    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, [refreshKey, onPointChange]);

  return (
    <div key={id}>
      <div>{id % 2 === 0 ? "End" : "Start"}</div>
      {elevation && <div>Elevation: {elevation} </div>}
      <div>
        Position: {lat.toString().substring(0, 7)},{" "}
        {lng.toString().substring(0, 7)}
      </div>
      <div>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isRadiusVisible}
                onChange={() => {
                  const updatedPoints = points.map((p) => ({
                    ...p,
                    isRadiusVisible:
                      p.id === id ? !isRadiusVisible : p.isRadiusVisible,
                  }));
                  onPointChange(updatedPoints);
                }}
              />
            }
            label={"Show radius"}
          />
        </FormGroup>
      </div>
      <div className="leaflet-map-slider">
        {isRadiusVisible && (
          <Slider
            value={radius}
            step={10}
            marks
            min={10}
            max={200}
            valueLabelDisplay={"auto"}
            onChange={(e, value) => {
              const updatedPoints = points.map((p) => ({
                ...p,
                radius: p.id === id ? (value as number) : p.radius,
              }));
              onPointChange(updatedPoints);
            }}
          />
        )}
      </div>
      {isRadiusVisible && <div>Radius: {radius} m</div>}
    </div>
  );
};

export default PointInfo;
