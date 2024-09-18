import React from "react";
import { useOsContext } from "../context/Context";

const Settings = ({ handleClose }) => {
  const { setCurrentApp, bg } = useOsContext();

  return (
    <>
      <button onClick={handleClose}>Chiudi</button>
      <br />
      <br />
      Settings
    </>
  );
};

export default Settings;
