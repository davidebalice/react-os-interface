import React from "react";
import { useOsContext } from "../context/Context";

const Explorer = ({ handleClose }) => {
  const { setCurrentApp, bg } = useOsContext();

  return (
    <>
      <button onClick={handleClose}>Chiudi</button>
      <br />
      <br />
      Explorer
    </>
  );
};

export default Explorer;
