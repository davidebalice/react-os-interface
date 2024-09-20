import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Clock from "../components/Clock";
import Start from "../components/Start";
import { useOsContext } from "../context/Context";

const BottomBar = () => {
  const { bg, icons, updateIcon, bringToFront, handleMinimize } =
    useOsContext();
  const [openedIcons, setOpenedIcons] = useState([]);

  useEffect(() => {
    const filteredIcons = icons.filter((icon) => icon.opened);
    setOpenedIcons(filteredIcons);
  }, [icons]);

  const handleIconClick = (icon, event) => {
    const rect = event.target.getBoundingClientRect();
    updateIcon(icon, {
      opened: true,
      position: { x: rect.left, y: rect.top },
    });
    bringToFront(icon.id);
    handleMinimize(icon.id, false);
  };

  return (
    <div className="bottomBar">
      <div className="bottomSection">
        <Start />
        <div className="bottomIcons">
          {openedIcons.map((icon) => (
            <motion.div
              key={"bottomIcon" + icon.id}
              className="bottomIcon"
              onClick={() => {
                bringToFront(icon.id);
                handleMinimize(icon.id, false);
              }}
              whileHover={{ scale: 1.1 }}
            >
              <img src={icon.img} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bottomSection">
        {icons.map((icon) => {
          if (icon.id === 3) {
            return (
              <motion.div
                key={"bottomIcon" + icon.id}
                className="bottomIcon2"
                onClick={(event) => handleIconClick(icon, event)}
                whileHover={{ scale: 1.1 }}
              >
                <img src={icon.img} alt={icon.name} />
              </motion.div>
            );
          }
          return null;
        })}

        <Clock />
      </div>
    </div>
  );
};

export default BottomBar;
