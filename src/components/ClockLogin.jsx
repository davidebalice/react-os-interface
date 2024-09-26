import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

function ClockLogin({ screen, setScreen }) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const tick = () => {
      setDateTime(new Date());
    };

    const timerID = setInterval(tick, 1000);

    return () => clearInterval(timerID);
  }, []);

  const dateFormatter = new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = dateFormatter.format(dateTime);
  const formattedTime = timeFormatter.format(dateTime);

  return (
    <div className="clockLogin">
      <motion.p
        initial={{
          y: -150,
          opacity: 0,
        }}
        animate={{
          y: screen === 0 ? 0 : -150,
          opacity: screen === 0 ? 1 : 0,
        }}
        exit={{
          opacity: 0,
          y: -150,
        }}
        layout
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 0,
        }}
      >
        {formattedDate}
      </motion.p>

      <motion.p
        initial={{
          y: -150,
          opacity: 0,
        }}
        animate={{
          y: screen === 0 ? 0 : -150,
          opacity: screen === 0 ? 1 : 0,
        }}
        exit={{
          opacity: 0,
          y: -150,
        }}
        layout
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 0.3,
        }}
      >
        {formattedTime}
      </motion.p>

      <motion.div
        initial={{
          y: 150,
          opacity: 0,
        }}
        animate={{
          y: screen === 0 ? 0 : 150,
          opacity: screen === 0 ? 1 : 0,
        }}
        exit={{
          opacity: 0,
          y: 150,
        }}
        layout
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 0.6,
        }}
        onClick={() => {
          setScreen(1);
        }}
        className="LoginButton ClockLoginButton"
        whileHover={{ scale: 1.1 }}
      >
        login
      </motion.div>
    </div>
  );
}

export default ClockLogin;
