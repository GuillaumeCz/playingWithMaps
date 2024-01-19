import React from "react";
import "./App.css";
import Template from "./ template/Template";
import { RouteObject, useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LeafletMapPage from "./pages/LeafletPage";

const App = () => {
  const pages: RouteObject[] = [
    {
      path: "/",
      element: <Template />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "leaflet",
          element: <LeafletMapPage />,
        },
      ],
    },
  ];

  const elements = useRoutes(pages);
  return <div className="App">{elements}</div>;
};

export default App;
