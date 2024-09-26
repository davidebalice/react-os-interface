import React from "react";

import { useOsContext } from "../context/Context";

const Dino = () => {

  return (
    <>
      <iframe
        width="100%"
        height="690"
        src="https://dino-js.davidebalice.dev"
        allowfullscreen
        className="videoIframe"
      ></iframe>
    </>
  );
};

export default Dino;
