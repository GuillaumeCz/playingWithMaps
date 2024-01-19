import axios from "axios";
import { IPosition } from "../types";

const getElevations = async (
  locations: Array<IPosition>,
): Promise<number[]> => {
  const payload = locations
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

  try {
    const response = await axios.get(
      `https://wxs.ign.fr/calcul/alti/rest/elevation.json?lon=${payload.lng}&lat=${payload.lat}&zonly=true`,
    );
    return response.data.elevations;
  } catch (e) {
    return locations.map(() => -1);
  }
};

export { getElevations };
