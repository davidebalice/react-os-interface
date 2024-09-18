import React from "react";
import { useOsContext } from "../context/Context";

const Pc = ({ handleClose }) => {
  const { setCurrentApp, bg } = useOsContext();

  return (
    <>
      <button onClick={handleClose}>Chiudi</button>
      <br />
      <br />
      Pc
    </>
  );
};

export default Pc;
