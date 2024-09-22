import React, { useState } from "react";
import { useOsContext } from "../context/Context";
import backgrounds from "../data/backgrounds";

const Settings = () => {
  const { setBg, setBrightness, setFilter, brightness, filter } = useOsContext();
  const [settingsSection, setSettingsSection] = useState("bg");

  const handleBrightnessChange = (e) => {
    setBrightness(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const renderSection = () => {
    switch (settingsSection) {
      case "bg":
        return (
          <>
            <div className="window-row-title">Backgrounds</div>
            <div className="backgroundContainer">
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
            </div>
          </>
        );
      case "view":
        return (
          <>
            <div className="window-row-title">Visualization</div>
            <div className="backgroundContainer">
              <div
                className="app"
                style={{
                  filter: `brightness(${brightness}%) ${filter}`,
                  transition: "filter 0.3s ease",
                }}
              >
                <div className="controls">
                  <label>Luminosità</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={brightness}
                    onChange={handleBrightnessChange}
                  />

                  <label>Filtri</label>
                  <select value={filter} onChange={handleFilterChange}>
                    <option value="">Nessuno</option>
                    <option value="contrast(150%)">Contrasto</option>
                    <option value="grayscale(100%)">Scala di grigi</option>
                    <option value="sepia(100%)">Seppia</option>
                    <option value="blur(5px)">Sfocatura</option>
                  </select>
                </div>
                <div className="content">
                  {/* Contenuto della tua app */}
                  <h1>La mia App</h1>
                  <p>Modifica la luminosità e aggiungi filtri!</p>
                </div>
              </div>
            </div>
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
          <div onClick={() => setSettingsSection("bg")}>Backgrounds</div>
          <div onClick={() => setSettingsSection("view")}>Visualization</div>
        </div>
        <div style={{ padding: "20px", paddingTop: "40px" }}>
          {renderSection()}
        </div>
      </div>
    </>
  );
};

export default Settings;
