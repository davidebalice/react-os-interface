import { motion } from "framer-motion";

const Icon = ({ icon, handleIconClick }) => {
  return (
    <motion.div
      className="icon"
      drag
      dragMomentum={false}
      onDoubleClick={handleIconClick}
      whileHover={{ scale: 1.1 }}
      style={{
        left: icon.position.x,
        top: icon.position.y,
      }}
    >
      <img
        src={icon.img}
        alt={'Icon '+icon.name}
      />
      <p>{icon.name}</p>
    </motion.div>
  );
};

export default Icon;
