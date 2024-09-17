// ComponentsContext.js
import React, { createContext, useContext, useState } from "react";
import bg01 from "../assets/images/bg01.jpg";

export const Context = createContext();
export const useComponentsContext = () => useContext(Context);
export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState([]);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [bg, setBg] = useState(bg01);

  return (
    <Context.Provider
      value={{
        components,
        setComponents,
        currentComponent,
        setCurrentComponent,
        bg,
        setBg,
      }}
    >
      {children}
    </Context.Provider>
  );
};
