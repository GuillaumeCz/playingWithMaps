import { Circle, Marker, Tooltip } from "react-leaflet";
import React, { useMemo, useRef } from "react";
import { IPoint, IPosition } from "../../../types";

interface IDraggableRadiusMarkerProps {
  point: IPoint;
  onPositionChange: (newPoint: IPosition) => void;
}
const DraggableRadiusMarker = ({
  point: {
    location: { lat, lng },
    id,
    radius,
    isRadiusVisible,
  },
  onPositionChange,
}: IDraggableRadiusMarkerProps) => {
  const ref = useRef(null);
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
    <>
      <Marker
        ref={ref}
        position={[lat, lng]}
        draggable
        eventHandlers={handleDrag}
      >
        <Tooltip>{id % 2 === 0 ? "End" : "Start"}</Tooltip>
      </Marker>
      {isRadiusVisible && (
        <Circle
          center={[lat, lng]}
          pathOptions={{ color: "red" }}
          radius={radius}
        />
      )}
    </>
  );
};

export default DraggableRadiusMarker;
