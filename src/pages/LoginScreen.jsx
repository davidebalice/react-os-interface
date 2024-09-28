import { motion } from "framer-motion";
import React, { useState } from "react";
import toast from "react-hot-toast";
import logo from "../assets/images/logoWhite.png";
import ClockLogin from "../components/ClockLogin";
import api from "../utils/api";

const LoginScreen = () => {
  const [type, setType] = useState("login");
  const [loader, setLoader] = useState(false);
  const [screen, setScreen] = useState(0);

  const [userData, setUserData] = useState({
    name: "",
    email: "mario@rossi.it",
    password: "12345678",
  });

  const inputHandle = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const user_login = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const { data } = await api.post("api/login", userData);
      setLoader(false);

      localStorage.setItem("token", data.token);
      setUserData({
        email: "",
        password: "",
      });

      window.location.href = "/";
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen w-full loginBg">
      <ClockLogin screen={screen} setScreen={setScreen} />

      <motion.div
        initial={{
          y: -1050,
          opacity: 0,
        }}
        animate={{
          y: screen === 1 ? 0 : -1050,
          opacity: screen === 1 ? 1 : 0,
        }}
        exit={{
          opacity: 0,
          y: -150,
        }}
        layout
        transition={{
          duration: 1.1,
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 1,
        }}
        className="loginBox"
      >
        <motion.img
          src={logo}
          initial={{
            y: -10,
            opacity: 0,
          }}
          animate={{
            y: screen === 1 ? 0 : -10,
            opacity: screen === 1 ? 1 : 0,
          }}
          exit={{
            opacity: 0,
            y: -10,
          }}
          layout
          transition={{
            duration: 1.1,
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 1.3,
          }}
        />

        {type === "login" && (
          <form onSubmit={user_login}>
            <motion.div
              className="flex flex-col gap-3 mb-3 text-white"
              initial={{
                y: -10,
                opacity: 0,
              }}
              animate={{
                y: screen === 1 ? 0 : -10,
                opacity: screen === 1 ? 1 : 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              layout
              transition={{
                duration: 1.1,
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 1.4,
              }}
            >
              <label htmlFor="email">Email</label>
              <input
                onChange={inputHandle}
                type="email"
                name="email"
                id="email"
                placeholder="email"
                value={userData.email}
                className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
              />
            </motion.div>

            <motion.div
              className="flex flex-col gap-3 mb-3 text-white"
              initial={{
                y: -10,
                opacity: 0,
              }}
              animate={{
                y: screen === 1 ? 0 : -10,
                opacity: screen === 1 ? 1 : 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              layout
              transition={{
                duration: 1.1,
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 1.5,
              }}
            >
              <label htmlFor="password">Password</label>
              <input
                onChange={inputHandle}
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={userData.password}
                className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
              />
            </motion.div>

            <motion.div
              initial={{
                y: -10,
                opacity: 0,
              }}
              animate={{
                y: screen === 1 ? 0 : -10,
                opacity: screen === 1 ? 1 : 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              layout
              transition={{
                duration: 1.1,
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 1.6,
              }}
            >
              <button disabled={loader} className="LoginButton">
                {loader ? "loading.." : "Login"}
              </button>
            </motion.div>

            <motion.div
              className="px-3 py-2 w-full text-white border-2 mt-10 border-dashed border-[#595959] rounded-md"
              initial={{
                y: -10,
                opacity: 0,
              }}
              animate={{
                y: screen === 1 ? 0 : -10,
                opacity: screen === 1 ? 1 : 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              layout
              transition={{
                duration: 1.1,
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 1.7,
              }}
            >
              Demo data:
              <br />
              Email: mario@rossi.it
              <br />
              Password: 12345678
            </motion.div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default LoginScreen;
