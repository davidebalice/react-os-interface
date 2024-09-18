import React, { useEffect, useState } from "react";

function Clock() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    // Funzione per aggiornare data e ora
    const tick = () => {
      setDateTime(new Date());
    };

    // Imposta un intervallo per aggiornare ogni secondo
    const timerID = setInterval(tick, 1000);

    // Pulizia dell'intervallo quando il componente viene smontato
    return () => clearInterval(timerID);
  }, []);

  // Formattazione della data e dell'orario in italiano
  const dateFormatter = new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = dateFormatter.format(dateTime);
  const formattedTime = timeFormatter.format(dateTime);

  return (
    <div>
      <h1>Data e Orario in Tempo Reale</h1>
      <p>{formattedDate}</p>
      <p>{formattedTime}</p>
    </div>
  );
}

export default Clock;
