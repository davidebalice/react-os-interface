import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { MdAccountCircle } from "react-icons/md";
import { useOsContext } from "../context/Context";
import backgrounds from "../data/backgrounds";
import Profile from "./Profile";

const Settings = () => {
  const { setBg } = useOsContext();
  const [settingsSection, setSettingsSection] = useState("bg");
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [filter, setFilter] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loaded && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [loaded, hasAnimated]);

  const handleBrightnessChange = (e) => {
    const newBrightness = e.target.value;
    setBrightness(newBrightness);
    document.body.style.filter = `brightness(${newBrightness}) contrast(${contrast}) ${filter}`;
  };

  const handleContrastChange = (e) => {
    const newContrast = e.target.value;
    setContrast(newContrast);
    document.body.style.filter = `brightness(${brightness}) contrast(${newContrast}) ${filter}`;
  };

  const handleFilterChange = (newFilter) => {
    const brightnessMatch = newFilter.match(/brightness\(([^)]+)\)/);
    if (brightnessMatch) {
      const newBrightness = brightnessMatch[1];
      setBrightness(newBrightness);
    }

    const contrastMatch = newFilter.match(/contrast\(([^)]+)\)/);
    if (contrastMatch) {
      const newContrast = contrastMatch[1];
      setContrast(newContrast);
    }

    setFilter(newFilter);
    document.body.style.filter = newFilter;
  };

  const renderSection = () => {
    switch (settingsSection) {
      case "bg":
        return (
          <>
            <div className="window-row-title">Backgrounds</div>
            <motion.div
              className="backgroundContainer"
              initial={hasAnimated ? {} : { y: -10, opacity: 0 }}
              animate={hasAnimated ? {} : { y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 0.5,
              }}
            >
              {backgrounds &&
                backgrounds.map((item, index) => (
                  <div
                    key={index}
                    className="bgItem"
                    onClick={() => setBg(item)}
                  >
                    <img src={item.bg} />
                  </div>
                ))}
            </motion.div>
          </>
        );
      case "view":
        return (
          <>
            <div className="window-row-title">Visualization</div>
            <div>
              <b>Brightness</b>
              <br />
              <br />
              <input
                type="range"
                min="0.3"
                max="2"
                step="0.01"
                value={brightness}
                onChange={handleBrightnessChange}
                style={{ width: "90%" }}
              />

              <br />
              <br />

              <b>Contrast</b>
              <br />
              <br />
              <input
                type="range"
                min="0.3"
                max="2"
                step="0.01"
                value={contrast}
                onChange={handleContrastChange}
                style={{ width: "90%" }}
              />

              <br />
              <br />

              <b>Filter</b>

              <br />
              <br />

              <div className="backgroundContainer">
                <div
                  className="filterItem"
                  onClick={() =>
                    handleFilterChange(
                      "brightness(1) contrast(1) grayscale(0) sepia(0)"
                    )
                  }
                >
                  <img
                    src={backgrounds[0].bg}
                    style={{
                      filter: "brightness(1) contrast(1) grayscale(0) sepia(0)",
                    }}
                  />
                  <p>Normal</p>
                </div>

                <div
                  className="filterItem"
                  onClick={() =>
                    handleFilterChange(
                      "brightness(1.2) contrast(1) grayscale(0) sepia(0)"
                    )
                  }
                >
                  <img
                    src={backgrounds[0].bg}
                    style={{
                      filter:
                        "brightness(1.2) contrast(1) grayscale(0) sepia(0)",
                    }}
                  />
                  <p>Bright</p>
                </div>

                <div
                  className="filterItem"
                  onClick={() =>
                    handleFilterChange(
                      "brightness(1) contrast(1) grayscale(0.3) sepia(0.4)"
                    )
                  }
                >
                  <img
                    src={backgrounds[0].bg}
                    style={{
                      filter:
                        "brightness(1) contrast(1) grayscale(0.3) sepia(0.4)",
                    }}
                  />
                  <p>Vintage</p>
                </div>

                <div
                  className="filterItem"
                  onClick={() =>
                    handleFilterChange(
                      "brightness(1) contrast(1.5) grayscale(0) sepia(0)"
                    )
                  }
                >
                  <img
                    src={backgrounds[0].bg}
                    style={{
                      filter:
                        "brightness(1) contrast(1.5) grayscale(0) sepia(0)",
                    }}
                  />
                  <p>High contrast</p>
                </div>

                <div
                  className="filterItem"
                  onClick={() =>
                    handleFilterChange(
                      "brightness(1) contrast(1) grayscale(1) sepia(0)"
                    )
                  }
                >
                  <img
                    src={backgrounds[0].bg}
                    style={{
                      filter: "brightness(1) contrast(1) grayscale(1) sepia(0)",
                    }}
                  />
                  <p>Grayscale</p>
                </div>

                <div
                  className="filterItem"
                  onClick={() =>
                    handleFilterChange(
                      "brightness(1) contrast(1) grayscale(0) sepia(1)"
                    )
                  }
                >
                  <img
                    src={backgrounds[0].bg}
                    style={{
                      filter: "brightness(1) contrast(1) grayscale(0) sepia(1)",
                    }}
                  />
                  <p>Sepia</p>
                </div>
              </div>

              <br />
            </div>
          </>
        );
      case "account":
        return (
          <>
            <div className="window-row-title">Account</div>
            <Profile />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="window-row">
        <div>
          <div
            onClick={() => setSettingsSection("bg")}
            className="settingItem"
            style={{ background: settingsSection === "bg" && "#f1f1f1" }}
          >
            <FaImage size={20} />
            Backgrounds
          </div>

          <div
            onClick={() => setSettingsSection("view")}
            className="settingItem"
            style={{ background: settingsSection === "view" && "#f1f1f1" }}
          >
            <LuView size={20} />
            Visualization
          </div>

          <div
            onClick={() => setSettingsSection("account")}
            className="settingItem"
            style={{ background: settingsSection === "account" && "#f1f1f1" }}
          >
            <MdAccountCircle size={20} />
            Account
          </div>
        </div>
        <div style={{ padding: "20px", paddingTop: "40px" }}>
          {renderSection()}
        </div>
      </div>
    </>
  );
};

export default Settings;
