import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa6";
import { IoMdArrowRoundBack, IoMdHome } from "react-icons/io";

function Browser() {
  const [url, setUrl] = useState("https://www.davidebalice.dev");
  const [inputUrl, setInputUrl] = useState(url);
  const [history, setHistory] = useState([url]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleInputChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleGoClick = () => {
    const newHistory = [...history.slice(0, currentIndex + 1), inputUrl];
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setUrl(inputUrl);
  };

  const handleBackClick = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setUrl(history[newIndex]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGoClick();
    }
  };

  const handleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <div className="browser">
      <div className="browserTopbar">
        <button
          onClick={handleBackClick}
          disabled={currentIndex === 0}
          className="topButton"
        >
          <IoMdArrowRoundBack size={20} />
        </button>

        <button
          onClick={handleBackClick}
          disabled={currentIndex === 0}
          className="topButton"
        >
          <IoMdHome size={20} />
        </button>

        <input
          type="text"
          value={inputUrl}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleGoClick} className="topButton">
          <FaCaretRight size={25} />
        </button>

        <div className="blank"> </div>

        <div className="favorites" onClick={handleFavorites}>
          <FaStar size={18} style={{ color: "#dfad16" }} />
          Favorites
        </div>
      </div>
      {showFavorites && <div className="favoritesContainer">favorites</div>}

      <iframe src={url} title="Browser" />
    </div>
  );
}

export default Browser;
