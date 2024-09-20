import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Clock from "../components/Clock";
import { useOsContext } from "../context/Context";

const BottomBar = () => {
  const { bg, icons, updateIcon, bringToFront, handleMinimize } =
    useOsContext();
  const [openedIcons, setOpenedIcons] = useState([]);

  useEffect(() => {
    const filteredIcons = icons.filter((icon) => icon.opened);
    setOpenedIcons(filteredIcons);
  }, [icons]);

  return (
    <div className="bottomBar">
      <div className="bottomSection">
        <div>Start</div>
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
        <Clock />
      </div>
    </div>
  );
};

export default BottomBar;
