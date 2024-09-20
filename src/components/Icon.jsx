import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useOsContext } from "../context/Context";

const Icon = ({ icon, handleIconClick }) => {
  const [position, setPosition] = useState({
    x: icon.position.x,
    y: icon.position.y,
  });
  const { bg } = useOsContext();

  return (
    <motion.div
      className="icon"
      drag
      dragMomentum={false}
      onDoubleClick={handleIconClick}
      whileHover={{ scale: 1.1, left: position.x, top: position.y }}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <img src={icon.img} alt={"Icon " + icon.name} />
      <p style={{ color: bg.color }}>{icon.name}</p>
    </motion.div>
  );
};

Icon.propTypes = {
  icon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  handleIconClick: PropTypes.func.isRequired,
};

export default Icon;
