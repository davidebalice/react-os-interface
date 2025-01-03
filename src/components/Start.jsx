import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import logo from "../assets/images/logo.png";
import userImg from "../assets/images/user.png";
import { useOsContext } from "../context/Context";
import api from "../utils/api";

const Start = () => {
  const [show, setShow] = useState(false);

  const handleIconClick = (icon, event) => {
    const rect = event.target.getBoundingClientRect();
    updateIcon(icon, {
      opened: true,
      position: { x: rect.left, y: rect.top },
    });
    bringToFront(icon.id);
    handleMinimize(icon.id, false);
  };

  const { bg, icons, updateIcon, bringToFront, handleMinimize, user, setUser } =
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
          duration: 1,
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <div className="startContainerCol1">
          <div>
            <img className="startLogo" src={logo} alt="db logo" />
          </div>
          <div style={{marginTop:"10px"}}>
            {icons
              .filter((icon) => [1, 2, 3, 6, 10, 5].includes(icon.id))
              .map((icon) => {
                return (
                  <>
                    <motion.div
                      key={"bottomStart" + icon.id}
                      className="startIcon"
                      onClick={(event) => handleIconClick(icon, event)}
                      whileHover={{ scale: 1.1 }}
                    >
                      <img src={icon.img} alt={icon.name} />
                      <span>{icon.name}</span>
                    </motion.div>
                  </>
                );
              })}
          </div>{" "}
        </div>

        <div>
          <motion.div
            className="startUserImgContainer"
            initial={{
              y: 100,
              opacity: 0,
            }}
            animate={{
              y: show ? 0 : 100,
              opacity: show ? 1 : 0,
            }}
            exit={{
              x: 100,
              opacity: 0,
            }}
            layout
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: 0.2,
            }}
          >
            <img className="startUserImg" src={userImg} alt="user logo" />
          </motion.div>

          <div className="startUserDataColumn">
            <motion.div
              className="startUserData"
              initial={{
                y: show ? 100 : 1,
                opacity: show ? 0 : 1,
              }}
              animate={{
                y: show ? 0 : 100,
                opacity: show ? 1 : 0,
              }}
              exit={{
                y: show ? 100 : 1,
                opacity: show ? 0 : 1,
              }}
              layout
              transition={{
                duration: 0.9,
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 0.5,
              }}
            >
              <span className="startUserName">
                {user && user.name} {user && user.surname}
              </span>
              <br />
              <span className="startUserEmail">{user && user.email}</span>
            </motion.div>

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
