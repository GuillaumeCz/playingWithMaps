const COLORS = {
  red: "#e15759",
  green: "#59a14f",
};
const MAP_CENTER = { lat: 45.55724, lng: 6.65187 };
const MAP_ZOOM: number = 16;

enum OlLayers {
  OSM = "OSM",
  OTM = "OTM",
}
// type OlLayers = "OSM" | "OTM";

export { COLORS, MAP_CENTER, MAP_ZOOM, OlLayers };
