import React from "react";

import { useOsContext } from "../context/Context";

const SpaceInvaders = () => {

  return (
    <>
      <iframe
        width="100%"
        height="100%"
        src="https://space-invaders.davidebalice.dev"
        allowfullscreen
      ></iframe>
    </>
  );
};

export default SpaceInvaders;
