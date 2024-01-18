import React, { useState } from "react";
import "./App.css";
import LeafletMap from "./LeafletMap/LeafletMap";
import { IPosition } from "./LeafletMap/types";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

const App = () => {
  const [isLeafletChosen, setIsLeafletChosen] = useState<boolean>(true);
  const coordinate: IPosition = {
    lat: 45.55724,
    lng: 6.65187,
  };
  return (
    <div className="App">
      <header className="App-header">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={isLeafletChosen}
                onChange={() => setIsLeafletChosen(!isLeafletChosen)}
              />
            }
            label={"leaflet or other?"}
          ></FormControlLabel>
        </FormGroup>
        {isLeafletChosen ? (
          <LeafletMap coordinate={coordinate}></LeafletMap>
        ) : (
          <>yoooo</>
        )}
      </header>
    </div>
  );
};

export default App;
