import { motion } from "framer-motion";
import React, { useState } from "react";
import server from "../data/server";
import Explorer from "./Explorer";

const Server = () => {
  const [showExplorer, setShowExplorer] = useState(false);

  const viewServer = (id) => {
    if (id === 1) {
      setShowExplorer(true);
    }
  };

  return (
    <>
      {showExplorer ? (
        <>
          <Explorer />
        </>
      ) : (
        <div className="window-row">
          <div>
            {server.map((item) => {
              return (
                <motion.div
                  key={"pc" + item.id}
                  className="serverListItem"
                  onDoubleClick={() => viewServer(item.id)}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      filter: item.active ? "none" : "grayscale(100%)",
                      opacity: item.active ? 1 : 0.7,
                    }}
                  />
                  <p>{item.name}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="server-row">
            {server.map((item) => {
              return (
                <motion.div
                  key={"pc" + item.id}
                  className="serverItem"
                  onDoubleClick={() => viewServer(item.id)}
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      filter: item.active ? "none" : "grayscale(100%)",
                      opacity: item.active ? 1 : 0.7,
                    }}
                  />
                  <p>{item.name}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Server;
