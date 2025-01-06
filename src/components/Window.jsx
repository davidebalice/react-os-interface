import { AnimatePresence, motion, useDragControls } from "framer-motion";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { FaRegQuestionCircle, FaRegWindowMinimize } from "react-icons/fa";
import { FiMaximize } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Browser from "../components/Browser";
import Calculator from "../components/Calculator";
import Explorer from "../components/Explorer";
import Info from "../components/Info";
import Server from "../components/Server";
import Settings from "../components/Settings";
import Weather from "../components/weather/Weather";
import { useOsContext } from "../context/Context";
import Audio from "./Audio";
import CodeEditor from "./CodeEditor";
import Dino from "./Dino";
import SpaceInvaders from "./SpaceInvaders";
import Tetris from "./Tetris";
import Video from "./Video";

const Window = ({
  icon,
  iconPosition,
  isOpen,
  handleClose,
  handleMinimize,
}) => {
  const { bringToFront } = useOsContext();
  const [isDraggable, setIsDraggable] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth * 0.1,
    y: window.innerHeight * 0.1,
  });

  const [size, setSize] = useState(() => {
    if (icon.type === "app") {
      if (icon.personalizedSize) {
        return {
          width: icon.personalizedSize.width,
          height: icon.personalizedSize.height,
        };
      } else {
        return { width: "80vw", height: "80vh" };
      }
    } else if (icon.type === "file") {
      return { width: "60vw", height: "60vh" };
    } else if (icon.type === "img") {
      return { width: "600px", height: "400px" };
    } else {
      return { width: "80vw", height: "80vh" };
    }
  });

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
    setTimer(
      setTimeout(() => {
        setIsDraggable(false);
      }, 300)
    );
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

    if (icon.type === "app") {
      if (icon.personalizedSize) {
        setSize({
          width: icon.personalizedSize.width,
          height: icon.personalizedSize.height,
        });
      } else {
        setSize({ width: "80vw", height: "80vh" });
      }
    } else if (icon.type === "file") {
      setSize({ width: "60vw", height: "60vh" });
    }

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

      const iframe = document.querySelector("iframe");
      if (iframe) {
        iframe.style.display = "none";
        setTimeout(() => {
          iframe.style.display = "block";
        }, 50);
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
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
            zIndex: icon.zIndex,
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

            <div
              style={{ flex: 1, height: "28px" }}
              onDoubleClick={isExpanded ? handleReduce : handleExpand}
            >
              {" "}
            </div>

            <div className="window-header-buttons">
              {icon.info !== null && icon.info !== "" && (
                <button onClick={handleInfo} className="window-header-button">
                  <FaRegQuestionCircle
                    size={18}
                    className="window-header-icon"
                  />
                </button>
              )}
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
            className="infoWindowContainer"
            showHelp
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: showHelp ? "80px" : 0,
              opacity: showHelp ? 1 : 0,
            }}
            exit={{
              width: 0,
              opacity: 0,
            }}
          >
            <div className="infoWindow">{icon.info}</div>
          </motion.div>

          {(() => {
            switch (icon.id) {
              case 1:
                return <Server />;
              case 2:
                return <Explorer />;
              case 3:
                return <Settings />;
              case 5:
                return <Info />;
              case 6:
                return <Browser />;
              case 8:
                return <Calculator />;
              case 9:
                return <Weather />;
              case 10:
                return <CodeEditor />;
              case 11:
                return <SpaceInvaders />;
              case 12:
                return <Dino />;
              case 13:
                return <Video height={size.height} />;
              case 14:
                return <Tetris />;
              case 15:
                return <Audio />;
              default:
                return null;
            }
          })()}

          {icon.type === "file" && icon.content !== "" && (
            <pre className="fileContent">{icon.content}</pre>
          )}

          {icon.type === "img" && (
            <img
              src={`https://node-fs-api.davidebalice.dev/api/photo/${icon.name}`}
              style={{ width: "100%" }}
            />
          )}

          {icon.resized && (
            <>
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
            </>
          )}
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
    content: PropTypes.string,
    info: PropTypes.string,
    zIndex: PropTypes.number.isRequired,
    opened: PropTypes.bool.isRequired,
    resized: PropTypes.bool.isRequired,
    minimized: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    personalizedSize: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
    }),
  }).isRequired,
  iconPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,

  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleMinimize: PropTypes.func.isRequired,
};
