import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getElevationProfile, getElevations } from "../../../api/altiApi";
import { IElevation, IPoint } from "../../../types";
import { Checkbox, FormControlLabel, FormGroup, Slider } from "@mui/material";

import "./leafletMapCtrl.css";
import { LineChart } from "@mui/x-charts";

interface ILeafletMapCtrlProps {
  points: Array<IPoint>;
  onPointChange: Dispatch<SetStateAction<IPoint[]>>;
}
const LeafletMapCtrl = ({ points, onPointChange }: ILeafletMapCtrlProps) => {
  const [elevationProfile, setElevationProfile] = useState<IElevation[]>([]);

  // Pas ouf mais rien trouvé de mieux pour check si ces parametres là on changés (dans le tableau d'objets)
  const locationsTrigger = points
    .map(({ location }) => location)
    .reduce((acc, { lat, lng }) => {
      return acc + lat + lng;
    }, "");

  useEffect(() => {
    const fetchData = async () => {
      const elv: number[] = await getElevations(
        points.map(({ location }) => location),
      );
      const updatedPoints = points.map((point, i) => ({
        ...point,
        elevation: elv[i],
      }));
      onPointChange(updatedPoints);
    };

    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, [locationsTrigger, onPointChange]);

  useEffect(() => {
    const fetchData = async () => {
      setElevationProfile(
        await getElevationProfile(points.map(({ location }) => location)),
      );
    };

    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, [locationsTrigger]);

  return (
    <div id={"leaflet-ctrl"}>
      {points.map(
        ({
          id,
          elevation,
          isRadiusVisible,
          radius,
          location: { lat, lng },
        }) => (
          <div key={id}>
            <div>Point {id}</div>
            {elevation && <div>Elevation: {elevation} </div>}
            <div>
              {lat.toString().substring(0, 7)}, {lng.toString().substring(0, 7)}
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
              <Slider
                disabled={!isRadiusVisible}
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
            </div>
            {isRadiusVisible && <div>Radius: {radius} m</div>}
          </div>
        ),
      )}
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
        series={[
          {
            data: elevationProfile.map((elevation) => elevation.z),
            area: true,
          },
        ]}
        width={500}
        height={500}
      />
    </div>
  );
};

export default LeafletMapCtrl;
