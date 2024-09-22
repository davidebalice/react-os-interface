import React, { createContext, useContext, useState } from "react";
import backgrounds from "../data/backgrounds";
import windows from "../data/windows";

export const Context = createContext();
export const useOsContext = () => useContext(Context);
export const OsProvider = ({ children }) => {
  const [bg, setBg] = useState(backgrounds.find((bg) => bg.id === 1) || null);
  const [icons, setIcons] = useState(windows);
  const [brightness, setBrightness] = useState(100);
  const [filter, setFilter] = useState("");

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

  const handleMinimize = (iconId, minimized) => {
    setIcons((prevIcons) => {
      return prevIcons.map((icon) => ({
        ...icon,
        minimized: icon.id === iconId ? minimized : icon.minimized,
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
        handleMinimize,
        bg,
        setBg,
        brightness,
        setBrightness,
        filter,
        setFilter,
      }}
    >
      {children}
    </Context.Provider>
  );
};
