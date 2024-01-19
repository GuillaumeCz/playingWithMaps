interface IPosition {
  lat: number;
  lng: number;
}

interface IPoint {
  id: number;
  location: IPosition;
  isRadiusVisible: boolean;
  radius: number;
  elevation?: number;
}

export type { IPoint, IPosition };
