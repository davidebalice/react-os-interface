import React, { createContext, useContext, useState } from "react";
import bg01 from "../assets/images/bg01.jpg";
import windows from "../data/windows";

export const Context = createContext();
export const useOsContext = () => useContext(Context);
export const OsProvider = ({ children }) => {
  const [bg, setBg] = useState(bg01);
  const [icons, setIcons] = useState(windows);

  const updateIcon = (iconId, update) => {
    setIcons((prevIcons) => {
      const updatedIcons = prevIcons.map((icon) => {
        if (icon.id === iconId.id) {
          return { ...icon, ...update };
        }
        return icon;
      });
      return updatedIcons;
    });
  };

  const bringToFront = (iconId) => {
    setIcons((prevIcons) => {
      return prevIcons.map((icon) => ({
        ...icon,
        zIndex: icon.id === iconId ? 150 : 100,
      }));
    });
  };

  return (
    <Context.Provider
      value={{
        icons,
        setIcons,
        updateIcon,
        bringToFront,
        bg,
        setBg,
      }}
    >
      {children}
    </Context.Provider>
  );
};
