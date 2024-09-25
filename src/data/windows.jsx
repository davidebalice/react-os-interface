import browser from "../assets/icons/browser.png";
import calc from "../assets/icons/calc.png";
import codeEditor from "../assets/icons/codeEditor.png";
import db from "../assets/icons/db.png";
import explorer from "../assets/icons/explorer.png";
import gear from "../assets/icons/gear.png";
import github from "../assets/icons/github.png";
import note from "../assets/icons/note.png";
import pc from "../assets/icons/pc.png";
import weather from "../assets/icons/weather.png";
import spaceInvaders from "../assets/icons/spaceInvaders.png";

const windows = [
  {
    id: 1,
    name: "Server",
    img: pc,
    position: { x: 40, y: 40 },
    zIndex: 100,
    opened: false,
    minimized: false,
    info: "Select server and access to file system via api. In this demo is possible to connect to only one server.",
    type: "app",
  },
  {
    id: 2,
    name: "Explorer",
    img: explorer,
    position: { x: 40, y: 150 },
    zIndex: 100,
    opened: false,
    minimized: false,
    info: "",
    type: "app",
  },
  {
    id: 3,
    name: "Settings",
    img: gear,
    position: { x: 140, y: 40 },
    zIndex: 100,
    opened: false,
    minimized: false,
    info: "",
    type: "app",
  },
  {
    id: 4,
    name: "Site",
    img: db,
    position: { x: 40, y: 370 },

    zIndex: 100,
    opened: false,
    minimized: false,
    info: "",
    type: "app",
  },
  {
    id: 5,
    name: "Info.txt",
    img: note,
    position: { x: 140, y: 150 },
    zIndex: 100,
    opened: false,
    minimized: false,
    info: "",
    type: "app",
  },
  {
    id: 6,
    name: "Browser",
    img: browser,
    position: { x: 40, y: 260 },
    zIndex: 100,
    opened: false,
    minimized: false,
    info: "",
    type: "app",
  },
  {
    id: 7,
    name: "Github",
    img: github,
    position: { x: 40, y: 480 },
    zIndex: 100,
    opened: false,
    minimized: false,
    info: "",
    type: "app",
  },
  {
    id: 8,
    name: "Calculator",
    img: calc,
    position: { x: 140, y: 370 },
    personalizedSize: { width: "500px", height: "790px" },
    zIndex: 100,
    opened: false,
    minimized: false,
    info: "",
    type: "app",
  },
  {
    id: 9,
    name: "Weather",
    img: weather,
    position: { x: 140, y: 480 },
    personalizedSize: { width: "900px", height: "600px" },
    zIndex: 100,
    opened: false,
    minimized: false,
    info: "",
    type: "app",
  },
  {
    id: 10,
    name: "Editor",
    img: codeEditor,
    position: { x: 140, y: 260 },
    zIndex: 100,
    opened: false,
    minimized: false,
    info: "",
    type: "app",
  },
  {
    id: 11,
    name: "Space invaders",
    img: spaceInvaders,
    position: { x: 250, y: 40 },
    zIndex: 100,
    opened: false,
    minimized: false,
    info: "",
    type: "app",
  },
];

export default windows;
