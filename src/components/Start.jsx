import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import logo from "../assets/images/logo.png";
import userImg from "../assets/images/user.png";
import { useOsContext } from "../context/Context";
import api from "../utils/api";

const Start = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const { bg, icons, updateIcon, bringToFront, handleMinimize } =
    useOsContext();

  useEffect(() => {
    fetchUserData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const fetchUserData = async () => {
    console.log(localStorage.getItem("token"));
    try {
      const response = await api.post("/api/get/user", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data.user);
      console.log(response);
    } catch (error) {
      console.error("Error fetch user data:", error);
    }
  };

  return (
    <>
      <motion.div
        className="startContainer"
        initial={{
          x: -300,
          opacity: 0,
        }}
        animate={{
          x: show ? 0 : -300,
          opacity: show ? 1 : 0,
        }}
        exit={{
          x: -300,
          opacity: 0,
        }}
        layout
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <div className="startContainerCol1">
          <div>
            <img className="startLogo" src={logo} alt="db logo" />
          </div>
          <div>...........</div>
        </div>

        <div>
          <div className="startUserImgContainer">
            <img className="startUserImg" src={userImg} alt="user logo" />
          </div>

          <div className="startUserDataColumn">
            <div className="startUserData">
              <span className="startUserName">
                {user && user.name} {user && user.surname}
              </span>
              <br />
              <span className="startUserEmail">{user && user.email}</span>
            </div>

            <div onClick={logout} className="startUserLogout">
              <MdLogout />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="startButton" onClick={() => setShow(!show)}>
        <img src={logo} alt="db logo" />
        <span>Start</span>
      </div>
    </>
  );
};

export default Start;
