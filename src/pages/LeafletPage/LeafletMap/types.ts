import { Dispatch, SetStateAction } from "react";

interface IPosition {
  lat: number;
  lng: number;
}

interface ILeafletMapProps {
  coordinate: IPosition;
  onPositionChange: Dispatch<SetStateAction<IPosition>>;
  radius: number;
}

export type { ILeafletMapProps, IPosition };
