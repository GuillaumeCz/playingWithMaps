import axios from "axios";
import { IElevation, IPosition } from "../types";

const locationsToPlayload = (
  locations: IPosition[],
): { lat: string; lng: string } =>
  locations
    .map(({ lat, lng }) => ({
      lat: lat.toString().substring(0, 7),
      lng: lng.toString().substring(0, 7),
    }))
    .reduce(
      (acc, curr, i) => ({
        lat: i === 0 ? curr.lat : acc.lat + "|" + curr.lat,
        lng: i === 0 ? curr.lng : acc.lng + "|" + curr.lng,
      }),
      { lat: "", lng: "" },
    );

const getElevations = async (
  locations: Array<IPosition>,
): Promise<number[]> => {
  const payload = locationsToPlayload(locations);

  try {
    const response = await axios.get(
      `https://wxs.ign.fr/calcul/alti/rest/elevation.json?lon=${payload.lng}&lat=${payload.lat}&zonly=true`,
    );
    return response.data.elevations;
  } catch (e) {
    return locations.map(() => -1);
  }
};

// https://geoservices.ign.fr/documentation/services/api-et-services-ogc/calcul-altimetrique-rest#1894
const getElevationProfile = async (
  locations: IPosition[],
  sampling: number = 10,
): Promise<IElevation[]> => {
  const payload = locationsToPlayload(locations);

  try {
    const response = await axios.get(
      `https://wxs.ign.fr/calcul/alti/rest/elevationLine.json?sampling=${sampling}&lon=${payload.lng}&lat=${payload.lat}&indent=true`,
    );
    return response.data.elevations.map(
      (elevation: { lat: number; z: number; lon: number }) => ({
        lat: elevation.lat,
        z: elevation.z,
        lng: elevation.lon,
      }),
    );
  } catch (e) {
    return [];
  }
};

export { getElevations, getElevationProfile };
