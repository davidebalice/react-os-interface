import { motion } from "framer-motion";
import React from "react";
import server from "../data/server";

import { useOsContext } from "../context/Context";

const Server = () => {
  const { setCurrentApp, bg } = useOsContext();

  return (
    <>
      <div className="pcContainer">
        {server.map((item) => {
          return (
            <motion.div
              key={"pc" + item.id}
              className="pcItem"
              onClick={null}
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{ filter: item.active ? "none" : "grayscale(100%)" }}
              />
              <p>{item.name}</p>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default Server;
