import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";

import "./Template.css";

const Template = () => {
  const pages = [
    {
      route: "/",
      title: "home",
    },
    {
      route: "leaflet",
      title: "Leaflet",
    },
  ];
  return (
    <>
      <AppBar position={"static"}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(({ route, title }) => (
                <Link to={route}>
                  <Button
                    key={title}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {title}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={"content"}>
        <Outlet />
      </div>
    </>
  );
};

export default Template;
