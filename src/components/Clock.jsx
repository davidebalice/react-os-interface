import React, { useEffect, useState } from "react";

function Clock() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const tick = () => {
      setDateTime(new Date());
    };

    const timerID = setInterval(tick, 1000);

    return () => clearInterval(timerID);
  }, []);

  const dateFormatter = new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Formatter per l'orario nel formato hh:mm:ss
  const timeFormatter = new Intl.DateTimeFormat("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = dateFormatter.format(dateTime);
  const formattedTime = timeFormatter.format(dateTime);

  return (
    <div className="bottomClock">
      <p>{formattedTime}</p>
      <p>{formattedDate}</p>
    </div>
  );
}

export default Clock;
