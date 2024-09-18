import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Explorer from "../components/Explorer";
import Pc from "../components/Pc";
import Settings from "../components/Settings";
import { useOsContext } from "../context/Context";

const Window = ({
  iconPosition,
  setIconPosition,
  isOpen,
  setIsOpen,
  handleClose,
  typeWindows,
}) => {
  const { setCurrentApp, bg } = useOsContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            width: 50,
            height: 50,
            x: iconPosition.x,
            y: iconPosition.y,
          }}
          animate={{
            width: "80vw",
            height: "80vh",
            x: "10vw",
            y: "10vh",
          }}
          exit={{
            width: 0,
            height: 0,
            x: iconPosition.x - 230,
            y: iconPosition.y - 110,
          }}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            backgroundColor: "white",
            zIndex: 100,
            overflow: "hidden",
          }}
          onAnimationComplete={(definition) => {
            if (definition === "exit") {
              alert("aa");
              setTimeout(() => {
                setIsOpen(false);
              }, 10);
            }
          }}
        >
          {typeWindows === "Explorer" ? (
            <>
              <Explorer handleClose={handleClose} />
            </>
          ) : typeWindows === "Pc" ? (
            <>
            <Pc handleClose={handleClose} /></>
          ) : typeWindows === "Settings" ? (
            <>
            <Settings handleClose={handleClose} /></>
          ) : (
            <></>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Window;
