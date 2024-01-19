import { Marker } from "react-leaflet";
import React, { useMemo, useRef } from "react";
import { IPoint, IPosition } from "../../../types";

interface IDraggableMarkerProps {
  point: IPoint;
  onPositionChange: (newPoint: IPosition) => void;
}
const DraggableMarker = ({
  point,
  onPositionChange,
}: IDraggableMarkerProps) => {
  const ref = useRef(null);
  const {
    location: { lat, lng },
  } = point;
  const handleDrag = useMemo(
    () => ({
      dragend() {
        const marker: any = ref.current;
        if (marker != null) onPositionChange(marker.getLatLng());
      },
    }),
    [onPositionChange],
  );

  return (
    <Marker
      ref={ref}
      position={[lat, lng]}
      draggable
      eventHandlers={handleDrag}
    />
  );
};

export default DraggableMarker;
