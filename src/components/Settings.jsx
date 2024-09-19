import React from "react";
import { useOsContext } from "../context/Context";

const Settings = () => {
  const { setCurrentApp, bg } = useOsContext();

  return (
    <>
     
      <br />
      <br />
      Settings
    </>
  );
};

export default Settings;
