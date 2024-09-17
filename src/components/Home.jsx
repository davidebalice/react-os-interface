import React, { useEffect, useState } from "react";

import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { useComponentsContext } from "../context/Context";
import api from "../utils/api";

const Home = () => {
  const { setCurrentComponent, bg } = useComponentsContext();
  const [designs, setDesign] = useState([]);
  const navigate = useNavigate();
  const [state, setState] = useState({
    width: 800,
    height: 600,
  });

  const get_user_design = async () => {
    try {
      const { data } = await api.get("/api/user-designs");
      setDesign(data.designs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentComponent("");
    get_user_design();
  }, []);

  return (
    <div className="desktop" style={{ background: "url(" + bg + ")" }}>
      <div className="w-full flex justify-start items-center relative rounded-md overflow-hidden itemContainer">
        <div className="demoHome">
          <b>Demo Mode</b>
          <br />
          Crud operations are not allowed.
        </div>
      </div>

      <div>
        <h2 className="text-xl py-0 mt-5 font-semibold text-white itemContainer">
          1............
        </h2>
        <h4 className="text-l py-0 mb-5 font-semibold text-white itemContainer">
          2.........
        </h4>
        <div className="overflow-x-auto flex justify-start items-start w-full">
          ....................................
        </div>
      </div>
    </div>
  );
};

export default Home;
