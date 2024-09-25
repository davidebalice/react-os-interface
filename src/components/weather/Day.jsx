import React from "react";
import moment from "moment";
import "moment/locale/it";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);

  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("it", {
    weekday: "short",
  }).format(new Date(dateStr));
}

moment.locale("it");

const Day = ({ date, max, min, code, isToday }) => {
  return (
    <li className="dayCard">
      <p className="date">{moment(date).format("DD/MM/YYYY")}</p>
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        <span className="minMax">min:</span> <strong>{Math.floor(min)}&deg; </strong>
        <br />
        <span className="minMax">max:</span> <strong>{Math.ceil(max)}&deg;</strong>
      </p>
    </li>
  );
};

export default Day;
