import { AnimatePresence, motion, useDragControls } from "framer-motion";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { FaRegQuestionCircle, FaRegWindowMinimize } from "react-icons/fa";
import { FiMaximize } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Explorer from "../components/Explorer";
import Server from "../components/Server";
import Settings from "../components/Settings";
import { useOsContext } from "../context/Context";

const Window = ({
  icon,
  iconPosition,
  isOpen,
  handleClose,
  handleMinimize,
}) => {
  const { bg, bringToFront } = useOsContext();
  const [isDraggable, setIsDraggable] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth * 0.1,
    y: window.innerHeight * 0.1,
  });
  const [size, setSize] = useState({ width: "80vw", height: "80vh" });
  const [isExpanded, setIsExpanded] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleHeaderMouseEnter = () => {
    setIsDraggable(true);
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };

  const handleHeaderMouseLeave = () => {
    setTimer(setTimeout(() => {
      setIsDraggable(false);
    }, 500));
  };

  const dragControls = useDragControls();
  const modalRef = useRef(null);

  const handleExpand = () => {
    setIsExpanded(true);
    setSize({ width: "100vw", height: "100vh" });
    setPosition({ x: 0, y: 0 });
  };

  const handleReduce = () => {
    setIsExpanded(false);
    setSize({ width: "80vw", height: "80vh" });
    setPosition({ x: window.innerWidth * 0.1, y: window.innerHeight * 0.1 });
  };

  const handleInfo = () => {
    setShowHelp(!showHelp);
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
            opacity: 0,
          }}
          animate={{
            width: icon.minimized ? 100 : size.width,
            height: icon.minimized ? 40 : size.height,
            x: icon.minimized ? 10 : position.x,
            y: icon.minimized ? window.innerHeight - 10 : position.y,
            opacity: icon.minimized ? 0 : 1,
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
          className="window"
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
            onMouseEnter={() => handleHeaderMouseEnter()}
            onMouseLeave={() => handleHeaderMouseLeave()}
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
              <button onClick={handleInfo} className="window-header-button">
                <FaRegQuestionCircle size={18} className="window-header-icon" />
              </button>
              <button onClick={handleMinimize} className="window-header-button">
                <FaRegWindowMinimize size={17} className="window-header-icon" />
              </button>
              <button
                onClick={isExpanded ? handleReduce : handleExpand}
                className="window-header-button"
              >
                <FiMaximize
                  size={18}
                  className="window-header-icon window-header-icon-minimize"
                />
              </button>
              <button onClick={handleClose} className="window-header-button">
                <IoClose className="window-header-icon window-header-icon-close" />
              </button>
            </div>
          </motion.div>

          <motion.div
            onPointerDown={handleInfo}
            className=""
            showHelp
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: showHelp ? "100px" : 0,
              opacity: showHelp ? 1 : 0,
            }}
            exit={{
              width: 0,
              opacity: 0,
            }}
          >
            <div className="">{icon.info}</div>
          </motion.div>

          {(() => {
            switch (icon.id) {
              case 1:
                return <Server handleClose={handleClose} />;
              case 2:
                return <Explorer handleClose={handleClose} />;
              case 3:
                return <Settings handleClose={handleClose} />;
              default:
                return null;
            }
          })()}

          <div
            onMouseDown={(e) => handleResize(e, "e")}
            style={{
              width: 2,
              height: "100%",
              backgroundColor: "#ddd",
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
              width: 2,
              height: "100%",
              backgroundColor: "#ddd",
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
              height: 2,
              backgroundColor: "#ddd",
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
              height: 2,
              backgroundColor: "#ddd",
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

Window.propTypes = {
  icon: PropTypes.shape({
    id: PropTypes.number.isRequired,
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
  handleMinimize: PropTypes.func.isRequired,
};
