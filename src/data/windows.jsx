import db from "../assets/icons/db.png";
import explorer from "../assets/icons/explorer.png";
import gear from "../assets/icons/gear.png";
import pc from "../assets/icons/pc.png";
import note from "../assets/icons/note.png";
import browser from "../assets/icons/browser.png";
import github from "../assets/icons/github.png";

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
    type: "app"
  },
  {
    id: 2,
    name: "Explorer",
    img: explorer,
    position: { x: 40, y: 140 },
    zIndex: 100,
    opened: false,
    minimized: false,
    info: "",
    type: "app"
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
    type: "app"
  },
  {
    id: 4,
    name: "Site",
    img: db,
    position: { x: 40, y: 250 },
    zIndex: 100,
    opened: false,
    minimized: false,
    info: "",
    type: "app"
  },
  {
    id: 5,
    name: "Info.txt",
    img: note,
    position: { x: 140, y: 140 },
    zIndex: 100,
    opened: false,
    minimized: false,
    info: "",
    type: "app"
  },
  {
    id: 6,
    name: "Browser",
    img: browser,
    position: { x: 140, y: 250 },
    zIndex: 100,
    opened: false,
    minimized: false,
    info: "",
    type: "app"
  },
  {
    id: 7,
    name: "Github",
    img: github,
    position: { x: 40, y: 360 },
    zIndex: 100,
    opened: false,
    minimized: false,
    info: "",
    type: "app"
  },
];

export default windows;
