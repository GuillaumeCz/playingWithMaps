import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import LeafletMap from "./LeafletMap/LeafletMap";
import { ICoordinate } from "./LeafletMap/types";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

const App = () => {
  const [isLeafletChosen, setIsLeafletChosen] = useState<boolean>(true);
  const coordinate: ICoordinate = {
    lat: 45.55724,
    long: 6.65187,
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
