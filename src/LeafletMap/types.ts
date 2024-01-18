interface IPosition {
  lat: number;
  lng: number;
}

interface ILeafletMapProps {
  coordinate: IPosition;
}

export type { ILeafletMapProps, IPosition };
