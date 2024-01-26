import { LineChart } from "@mui/x-charts";
import { LatLng } from "leaflet";
import { IElevation } from "../../../types";
import { COLORS } from "../../../shared";

interface IElevationChart {
  elevationProfile: IElevation[];
}

const ElevationChart = ({ elevationProfile }: IElevationChart) => {
  const series = elevationProfile.map((currentElevation, i) => {
    const data: number[] | null[] = Array(elevationProfile.length).fill(null);
    let color = COLORS.red;
    if (i === elevationProfile.length - 1) {
      data[i] = currentElevation.z;
    } else {
      data[i] = currentElevation.z;
      data[i + 1] = elevationProfile[i + 1].z;
      color =
        currentElevation.z - elevationProfile[i + 1].z >= 0
          ? COLORS.green
          : COLORS.red;
    }
    return {
      data,
      area: true,
      color,
    };
  });

  const xAxis: number[] = elevationProfile
    .map(({ lat, lng, z }, i) => new LatLng(lat, lng, z))
    .map((formattedPoint, i, pts) =>
      i === 0 ? 0 : Math.round(pts[0].distanceTo(formattedPoint)),
    );

  return (
    <>
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
