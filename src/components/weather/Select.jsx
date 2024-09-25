import React from "react";
import { locations } from "./locations";

const Select = ({ location, onChangeLocation }) => {
  const sortedLocations = [...locations].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div>
      <select
        type="text"
        placeholder="Insert location..."
        value={location}
        onChange={onChangeLocation}
        className="weather-select"
      >
        <option> - favorites - </option>
        {sortedLocations &&
          sortedLocations.map((location) => {
            return <option>{location.name}</option>;
          })}
      </select>
    </div>
  );
};

export default Select;
