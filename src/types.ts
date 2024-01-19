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

interface IElevation {
  lat: number;
  lng: number;
  z: number;
  acc: number;
}

export type { IPoint, IPosition, IElevation };
