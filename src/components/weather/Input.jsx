import React from "react";

const Input = ({ location, onChangeLocation, onSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Insert location..."
        value={location}
        onChange={onChangeLocation}
        className="weather-input"
      />
      <button onClick={onSearch} className="weather-button">Search</button>
    </div>
  );
};

export default Input;
