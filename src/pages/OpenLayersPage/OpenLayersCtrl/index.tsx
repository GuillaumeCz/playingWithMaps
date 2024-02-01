import { OlLayers } from "../../../shared";
import { Dispatch, SetStateAction } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface IOpenLayersCtrl {
  selectedLayer: OlLayers;
  setSelectedLayer: Dispatch<SetStateAction<OlLayers>>;
}
const OpenLayersCtrl = ({
  selectedLayer,
  setSelectedLayer,
}: IOpenLayersCtrl) => {
  return (
    <>
      Ctrl
      <FormControl>
        <InputLabel id={"layerSelect"}>Layer</InputLabel>
        <Select
          labelId={"layerSelect"}
          value={selectedLayer}
          label={"Layer"}
          onChange={(e) => {
            // Probleme avec les enums
            console.log(e.target.value as OlLayers);
            setSelectedLayer(e.target.value as OlLayers);
          }}
        >
          <MenuItem value={OlLayers.OSM}>OSM</MenuItem>
          <MenuItem value={OlLayers.OTM}>OTM</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default OpenLayersCtrl;
