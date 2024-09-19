import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { useOsContext } from "../context/Context";
import Icon from "./Icon";
import Window from "./Window";

const Desktop = () => {
  const { bg, icons, updateIcon, bringToFront } = useOsContext();
  const [openWindows, setOpenWindows] = useState(false);
  const [typeWindows, setTypeWindows] = useState("");
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
  const [icon, setIcon] = useState(null);

  /*
  const handleIconClick = (icon, event) => {
    const rect = event.target.getBoundingClientRect();
    setIconPosition({ x: rect.left, y: rect.top });
    setIcon(icon);
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



  

*/

  const handleIconClick = (iconId, event) => {
    const rect = event.target.getBoundingClientRect();
    updateIcon(iconId, {
      opened: true,
      position: { x: rect.left, y: rect.top },
    });
    bringToFront(iconId.id);
  };

  const handleClose = (iconId) => {
    updateIcon(iconId, { opened: false });
  };

  useEffect(() => {}, []);

  return (
    <div className="desktop" style={{ background: "url(" + bg + ")" }}>
      {icons.map((icon) => (
        <Window
          key={icon.id}
          icon={icon}
          isOpen={icon.opened}
          iconPosition={icon.position}
          handleClose={() => handleClose(icon)}
          typeWindows={icon.name}
        />
      ))}

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
