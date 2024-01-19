import axios from "axios";
import { IPosition } from "../types";
const getElevation = async (position: IPosition): Promise<number> => {
  const { lat, lng }: IPosition = position;
  try {
    const response = await axios.get(
      `https://data.geopf.fr/altimetrie/1.0/calcul/alti/rest/elevation.json?lon=${lng}&lat=${lat}&resource=ign_rge_alti_wld&delimiter=;&indent=true&measures=true&zonly=false`,
    );
    return response.data.elevations[0].z;
  } catch (e) {
    return -1;
  }
};

export { getElevation };
