import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { useOsContext } from "../context/Context";
import icons from "../data/icons";
import Window from "./Window";
import Icon from "./Icon";

const Desktop = () => {
  const { setCurrentApp, bg } = useOsContext();
  const [openWindows, setOpenWindows] = useState(false);
  const [typeWindows, setTypeWindows] = useState("");
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleIconClick = (icon, event) => {
    const rect = event.target.getBoundingClientRect();
    setIconPosition({ x: rect.left, y: rect.top });

    switch (icon.name) {
      case "Site":
        window.open("https://www.davidebalice.dev", "_blank");
        break;
      case "Pc":
        setOpenWindows(true);
        setTypeWindows("Pc");
        break;
      case "Explorer":
        setOpenWindows(true);
        setTypeWindows("Explorer");
        break;
      case "Settings":
        setOpenWindows(true);
        setTypeWindows("Settings");
        break;
      default:
        console.log(`Default action for icon: ${icon.name}`);
        break;
    }
  };

  const handleClose = () => {
    setOpenWindows(false);
  };

  useEffect(() => {
    setCurrentApp("");
  }, []);

  return (
    <div className="desktop" style={{ background: "url(" + bg + ")" }}>
      <Window
        isOpen={openWindows}
        iconPosition={iconPosition}
        setIconPosition={setIconPosition}
        handleClose={handleClose}
        typeWindows={typeWindows}
      />

      <div className="w-full flex justify-start items-center relative rounded-md overflow-hidden itemContainer">
        <div className="demoHome">
          <b>Demo Mode</b>
          <br />
          Crud operations are not allowed.
        </div>
      </div>

      <div>
        {icons.map((icon, i) => (
          <Icon
            icon={icon}
            key={"icon" + i}
            handleIconClick={(event) => handleIconClick(icon, event)}
          />
        ))}
      </div>
    </div>
  );
};

export default Desktop;
