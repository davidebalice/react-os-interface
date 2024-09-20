import db from "../assets/icons/db.png";
import explorer from "../assets/icons/explorer.png";
import gear from "../assets/icons/gear.png";
import pc from "../assets/icons/pc.png";
import note from "../assets/icons/note.png";

const windows = [
  {
    id: 1,
    name: "Server",
    img: pc,
    position: { x: 40, y: 40 },
    zIndex: 100,
    opened: false,
    minimized: false,
  },
  {
    id: 2,
    name: "Explorer",
    img: explorer,
    position: { x: 40, y: 140 },
    zIndex: 100,
    opened: false,
    minimized: false,
  },
  {
    id: 3,
    name: "Settings",
    img: gear,
    position: { x: 140, y: 40 },
    zIndex: 100,
    opened: false,
    minimized: false,
  },
  {
    id: 4,
    name: "Site",
    img: db,
    position: { x: 40, y: 250 },
    zIndex: 100,
    opened: false,
    minimized: false,
  },
  {
    id: 5,
    name: "Info.txt",
    img: note,
    position: { x: 140, y: 140 },
    zIndex: 100,
    opened: false,
    minimized: false,
  },
];

export default windows;
