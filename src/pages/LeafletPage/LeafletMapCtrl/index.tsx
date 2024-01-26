import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getElevationProfile, getElevations } from "../../../api/altiApi";
import { IElevation, IPoint } from "../../../types";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  TextField,
} from "@mui/material";

import "./leafletMapCtrl.css";
import { LineChart } from "@mui/x-charts";
import { LatLng } from "leaflet";

interface ILeafletMapCtrlProps {
  points: Array<IPoint>;
  onPointChange: Dispatch<SetStateAction<IPoint[]>>;
}
const LeafletMapCtrl = ({ points, onPointChange }: ILeafletMapCtrlProps) => {
  const [elevationProfile, setElevationProfile] = useState<IElevation[]>([]);
  const [sampling, setSampling] = useState<number>(10);

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
        await getElevationProfile(
          points.map(({ location }) => location),
          sampling,
        ),
      );
    };

    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, [locationsTrigger, sampling]);

  const xAxis: number[] = elevationProfile
    .map(({ lat, lng, z }, i) => new LatLng(lat, lng, z))
    .map((formattedPoint, i, pts) =>
      i === 0 ? 0 : Math.round(pts[0].distanceTo(formattedPoint)),
    );

  // Meilleur moyen pour choper la distance ? Reflechir a faire ça en 1 expression, 1 shot
  const formattedPoints: LatLng[] = points.map(
    ({ location: { lat, lng }, elevation }) => new LatLng(lat, lng, elevation),
  );
  const distance: number = formattedPoints[0].distanceTo(formattedPoints[1]);

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
        ),
      )}
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
      <LineChart
        xAxis={[{ data: xAxis }]}
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
