import { LineChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import { LatLng } from "leaflet";
import { IElevation, IPoint } from "../../../types";
import { getElevationProfile } from "../../../api/altiApi";
import { TextField } from "@mui/material";

interface IElevationChart {
  points: IPoint[];
  refreshKey: string;
}

const ElevationChart = ({ points, refreshKey }: IElevationChart) => {
  const [elevationProfile, setElevationProfile] = useState<IElevation[]>([]);
  const [sampling, setSampling] = useState<number>(10);

  const series = elevationProfile.map((currentElevation, i) => {
    const data: number[] | null[] = Array(elevationProfile.length).fill(null);
    if (i === elevationProfile.length - 1) {
      data[i] = currentElevation.z;
    } else {
      data[i] = currentElevation.z;
      data[i + 1] = elevationProfile[i + 1].z;
    }
    return {
      data,
      area: true,
    };
  });

  const xAxis: number[] = elevationProfile
    .map(({ lat, lng, z }, i) => new LatLng(lat, lng, z))
    .map((formattedPoint, i, pts) =>
      i === 0 ? 0 : Math.round(pts[0].distanceTo(formattedPoint)),
    );

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
        series={series}
        width={500}
        height={500}
      />
    </>
  );
};

export default ElevationChart;
