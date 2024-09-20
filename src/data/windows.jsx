import db from "../assets/icons/db.png";
import explorer from "../assets/icons/explorer.png";
import gear from "../assets/icons/gear.png";
import pc from "../assets/icons/pc.png";
import note from "../assets/icons/note.png";

const windows = [
  {
    id: 1,
    name: "Pc",
    img: pc,
    position: { x: 50, y: 100 },
    zIndex: 100,
    opened: false,
    minimized: false,
  },
  {
    id: 2,
    name: "Explorer",
    img: explorer,
    position: { x: 50, y: 200 },
    zIndex: 100,
    opened: false,
    minimized: false,
  },
  {
    id: 3,
    name: "Settings",
    img: gear,
    position: { x: 150, y: 100 },
    zIndex: 100,
    opened: false,
    minimized: false,
  },
  {
    id: 4,
    name: "Site",
    img: db,
    position: { x: 50, y: 300 },
    zIndex: 100,
    opened: false,
    minimized: false,
  },
  {
    id: 5,
    name: "Info.txt",
    img: note,
    position: { x: 150, y: 200 },
    zIndex: 100,
    opened: false,
    minimized: false,
  },
];

export default windows;
