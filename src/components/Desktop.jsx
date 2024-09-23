import React, { useEffect } from "react";
import { useOsContext } from "../context/Context";
import Icon from "./Icon";
import Window from "./Window";

const Desktop = () => {
  const { bg, icons, updateIcon, setIcons, bringToFront, handleMinimize } =
    useOsContext();

  const handleIconClick = (icon, event) => {
    if (icon.name == "Site") {
      window.open("https://www.davidebalice.dev", "_blank");
    } else {
      const rect = event.target.getBoundingClientRect();

      updateIcon(icon, {
        opened: true,
        position: { x: rect.left, y: rect.top },
      });
      bringToFront(icon.id);
      handleMinimize(icon.id, false);
    }
  };

  const handleClose = (iconId) => {

    updateIcon(iconId, { opened: false });
  
    const windowToClose = icons.find(window => window.id === iconId.id);
    if (windowToClose && windowToClose.type === 'file') {
      setIcons(icons.filter(window => window.id !== iconId.id));
    }
  };

  const handleToMinimize = (iconId) => {
    updateIcon(iconId, { minimized: true });
  };

  useEffect(() => {}, []);

  return (
    <div className="desktop" style={{ background: "url(" + bg.bg + ")" }}>
      {icons.map((icon) => (
        <Window
          key={icon.id}
          icon={icon}
          isOpen={icon.opened}
          iconPosition={icon.position}
          handleClose={() => handleClose(icon)}
          handleMinimize={() => handleToMinimize(icon)}
        />
      ))}

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
