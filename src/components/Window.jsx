import { AnimatePresence, motion, useDragControls } from "framer-motion";
import React, { useRef, useState } from "react";
import Explorer from "../components/Explorer";
import Pc from "../components/Pc";
import Settings from "../components/Settings";
import { useOsContext } from "../context/Context";

const Window = ({
  iconPosition,
  isOpen,
  setIsOpen,
  handleClose,
  typeWindows,
}) => {
  const { setCurrentApp, bg } = useOsContext();
  const [isDraggable, setIsDraggable] = useState(true);
  const [position, setPosition] = useState({
    x: window.innerWidth * 0.1,
    y: window.innerHeight * 0.1,
  });
  const [size, setSize] = useState({ width: "80vw", height: "80vh" });
  const [isMaximized, setIsMaximized] = useState(false);

  const dragControls = useDragControls();
  const modalRef = useRef(null);

  // Funzione per massimizzare la finestra
  const handleMaximize = () => {
    setIsMaximized(true);
    setSize({ width: "100vw", height: "100vh" });
    setPosition({ x: 0, y: 0 });
  };

  // Funzione per ridurre la finestra
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
            zIndex: 100,
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
            className="modal-header"
            style={{
              padding: "10px",
              backgroundColor: "#f0f0f0",
              cursor: "move",
              display: "flex",
              justifyContent: "space-between",
              zIndex: 101,
              position: "relative",
            }}
          >
            <button onClick={isMaximized ? handleReduce : handleMaximize}>
              {isMaximized ? "Reduce" : "Maximize"}
            </button>
            <button onClick={handleClose}>Close</button>
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
            onMouseDown={(e) => handleResize(e, "se")}
            style={{
              width: 20,
              height: 20,
              backgroundColor: "gray",
              position: "absolute",
              bottom: 0,
              right: 0,
              cursor: "nwse-resize",
              zIndex: 101,
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
              zIndex: 101,
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
              zIndex: 101,
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
              zIndex: 101,
            }}
          />
          {/* Resize edges */}
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
              zIndex: 101,
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
              zIndex: 1001,
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
              zIndex: 101,
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
              zIndex: 101,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Window;
