import React, { createContext, useContext, useState } from "react";
import bg01 from "../assets/images/bg01.jpg";

export const Context = createContext();
export const useOsContext = () => useContext(Context);
export const OsProvider = ({ children }) => {
  const [appReduced, setAppReduced] = useState([]);
  const [currentApp, setCurrentApp] = useState(null);
  const [bg, setBg] = useState(bg01);

  return (
    <Context.Provider
      value={{
        appReduced,
        setAppReduced,
        currentApp,
        setCurrentApp,
        bg,
        setBg,
      }}
    >
      {children}
    </Context.Provider>
  );
};
