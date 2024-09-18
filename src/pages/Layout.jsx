import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/images/logoWhite.png";
import userImg from "../assets/images/user.png";
import BottomBar from "../components/BottomBar";
import api from "../utils/api";

const Layout = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const fetchUserData = async () => {
    try {
      const response = await api.post("/api/get/user", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="bg-[#18191b] min-h-screen w-full">
      <div className="bg-[#212223] shadow-md fixed left-0 top-0 w-full z-20">
        <div className="w-[97%] m-auto py-3">
          <div className="flex justify-between items-center">
            <div className="w-[130px] h-[46px]">
              <Link to="/">
                <img className="w-full h-full" src={logo} alt="db logo" />
              </Link>
            </div>

            <div className="flex gap-4 justify-center items-center relative">
              <div className="cursor-pointer">
                <Link to="/info">
                  <FaInfoCircle className="infoButton" />
                </Link>
              </div>
              <div onClick={() => setShow(!show)} className="cursor-pointer">
                <img
                  className="w-[48px] h-[45px] rounded-full"
                  src={userImg}
                  alt=""
                />
              </div>
              <div
                className={`absolute top-[60px] right-0 w-[250px] bg-[#313030] p-3 border border-gray-700 transition duration-500 ${
                  show ? "visible opacity-100" : "invisible opacity-30"
                } `}
              >
                <div className="px-2 py-2 flex justify-start gap-5 items-center">
                  <img
                    className="w-[40px] h-[40px] rounded-full"
                    src={userImg}
                    alt=""
                  />
                  <div className="flex justify-center flex-col items-start">
                    <span className="text-[#e0dddd] font-bold text-md">
                      {user && user.name}
                    </span>
                    <span className="text-[#e0dddd] font-bold text-md">
                      {user && user.email}
                    </span>
                  </div>
                </div>

                <ul className="text-[#e0dddd] font-semibold">
                  <li>
                    <div onClick={logout} className="p-2 cursor-pointer">
                      <span>Logout </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
      <BottomBar />
    </div>
  );
};

export default Layout;
