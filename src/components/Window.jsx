import { AnimatePresence, motion, useDragControls } from "framer-motion";
import React, { useRef, useState } from "react";
import { FiMaximize } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Explorer from "../components/Explorer";
import Pc from "../components/Pc";
import Settings from "../components/Settings";
import { useOsContext } from "../context/Context";

import PropTypes from "prop-types";

const Window = ({ icon, iconPosition, isOpen, handleClose, typeWindows }) => {
  const { bg, bringToFront } = useOsContext();
  const [isDraggable, setIsDraggable] = useState(true);
  const [position, setPosition] = useState({
    x: window.innerWidth * 0.1,
    y: window.innerHeight * 0.1,
  });
  const [size, setSize] = useState({ width: "80vw", height: "80vh" });
  const [isMaximized, setIsMaximized] = useState(false);

  const dragControls = useDragControls();
  const modalRef = useRef(null);

  const handleMaximize = () => {
    setIsMaximized(true);
    setSize({ width: "100vw", height: "100vh" });
    setPosition({ x: 0, y: 0 });
  };

  const handleReduce = () => {
    setIsMaximized(false);
    setSize({ width: "80vw", height: "80vh" });
    setPosition({ x: window.innerWidth * 0.1, y: window.innerHeight * 0.1 });
  };

  const handleResize = (e, direction) => {
    setIsDraggable(false);
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = modalRef.current.offsetWidth;
    const startHeight = modalRef.current.offsetHeight;
    const startXPos = position.x;
    const startYPos = position.y;

    const onMouseMove = (e) => {
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startXPos;
      let newY = startYPos;

      if (direction.includes("e")) {
        newWidth = Math.max(200, startWidth + e.clientX - startX);
      }
      if (direction.includes("s")) {
        newHeight = Math.max(200, startHeight + e.clientY - startY);
      }
      if (direction.includes("w")) {
        newWidth = Math.max(200, startWidth - (e.clientX - startX));
        newX = startXPos + (e.clientX - startX);
      }
      if (direction.includes("n")) {
        newHeight = Math.max(200, startHeight - (e.clientY - startY));
        newY = startYPos + (e.clientY - startY);
      }

      modalRef.current.style.width = `${newWidth}px`;
      modalRef.current.style.height = `${newHeight}px`;

      setSize({
        width: newWidth,
        height: newHeight,
      });

      setPosition({
        x: newX,
        y: newY,
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      setIsDraggable(true);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          onClick={() => {
            bringToFront(icon.id);
          }}
          initial={{
            width: 50,
            height: 50,
            x: iconPosition.x,
            y: iconPosition.y,
          }}
          animate={{
            width: size.width,
            height: size.height,
            x: position.x,
            y: position.y,
          }}
          exit={{
            width: 0,
            height: 0,
            x: iconPosition.x,
            y: iconPosition.y,
          }}
          layout
          transition={{
            duration: isDraggable ? 0.5 : 0,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="modal"
          style={{
            position: "fixed",
            backgroundColor: "white",
            zIndex: icon.zIndex,
            overflow: "hidden",
            boxSizing: "border-box",
          }}
          drag={isDraggable}
          dragControls={dragControls}
          dragConstraints={{
            top: 0,
            left: 0,
            right: window.innerWidth - parseInt(size.width),
            bottom: window.innerHeight - parseInt(size.height),
          }}
          dragElastic={0}
          dragMomentum={false}
        >
          <motion.div
            onPointerDown={(e) => dragControls.start(e)}
            className="window-header"
          >
            <div className="window-header-icon-container">
              {icon && (
                <>
                  <img src={icon.img} className="window-header-icon" />
                </>
              )}
              <span>{icon && icon.name}</span>
            </div>

            <div className="window-header-buttons">
              <button
                onClick={isMaximized ? handleReduce : handleMaximize}
                className="window-header-button"
              >
                <FiMaximize size={21} className="window-header-icon" />
              </button>
              <button onClick={handleClose} className="window-header-button">
                <IoClose size={28} className="window-header-icon" />
              </button>
            </div>
          </motion.div>

          <div style={{ padding: "20px", height: "calc(100% - 40px)" }}>
            {typeWindows === "Explorer" ? (
              <Explorer handleClose={handleClose} />
            ) : typeWindows === "Pc" ? (
              <Pc handleClose={handleClose} />
            ) : typeWindows === "Settings" ? (
              <Settings handleClose={handleClose} />
            ) : null}
          </div>

          <div
            onMouseDown={(e) => handleResize(e, "e")}
            style={{
              width: 10,
              height: "100%",
              backgroundColor: "gray",
              position: "absolute",
              top: 0,
              right: 0,
              cursor: "ew-resize",
              zIndex: icon.zIndex + 1,
            }}
          />
          <div
            onMouseDown={(e) => handleResize(e, "w")}
            style={{
              width: 10,
              height: "100%",
              backgroundColor: "gray",
              position: "absolute",
              left: 0,
              top: 0,
              cursor: "ew-resize",
              zIndex: icon.zIndex + 2,
            }}
          />
          <div
            onMouseDown={(e) => handleResize(e, "n")}
            style={{
              width: "100%",
              height: 10,
              backgroundColor: "gray",
              position: "absolute",
              top: 0,
              cursor: "ns-resize",
              zIndex: icon.zIndex + 2,
            }}
          />
          <div
            onMouseDown={(e) => handleResize(e, "s")}
            style={{
              width: "100%",
              height: 10,
              backgroundColor: "gray",
              position: "absolute",
              bottom: 0,
              cursor: "ns-resize",
              zIndex: icon.zIndex + 2,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Window;

/*
 <div
            onMouseDown={(e) => handleResize(e, "se")}
            style={{
              width: 20,
              height: 20,
              backgroundColor: "gray",
              position: "absolute",
              bottom: 0,
              right: 0,
              cursor: "nwse-resize",
              zIndex: icon.zIndex+2,
            }}
          />
          <div
            onMouseDown={(e) => handleResize(e, "sw")}
            style={{
              width: 20,
              height: 20,
              backgroundColor: "gray",
              position: "absolute",
              bottom: 0,
              left: 0,
              cursor: "nesw-resize",
              zIndex: icon.zIndex+2,
            }}
          />
          <div
            onMouseDown={(e) => handleResize(e, "ne")}
            style={{
              width: 20,
              height: 20,
              backgroundColor: "gray",
              position: "absolute",
              top: 0,
              right: 0,
              cursor: "nesw-resize",
              zIndex: icon.zIndex+2,
            }}
          />
          <div
            onMouseDown={(e) => handleResize(e, "nw")}
            style={{
              width: 20,
              height: 20,
              backgroundColor: "gray",
              position: "absolute",
              top: 0,
              left: 0,
              cursor: "nwse-resize",
              zIndex: icon.zIndex+2,
            }}
          />
*/

Window.propTypes = {
  icon: PropTypes.shape({
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    zIndex: PropTypes.number.isRequired,
    opened: PropTypes.bool.isRequired,
  }).isRequired,
  iconPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  typeWindows: PropTypes.oneOf(["Explorer", "Pc", "Settings"]).isRequired,
};
