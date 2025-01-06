import PropTypes from "prop-types";
import React, { useState } from "react";
import video from "../data/video";

const Video = ({ height }) => {
  const [selectedVideo, setSelectedVideo] = useState(video[0]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="videoContainer">
      <div style={{ height: `${height}px` }}>
        <ul>
          {video.map((video) => (
            <li
              key={video.id}
              onClick={() => handleVideoSelect(video)}
              style={{ background: selectedVideo.id === video.id && "#e1e1e1" }}
            >
              <img src={video.thumb} />
              {video.title}
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "0",
          paddingTop: "56.25%" /* 16:9 Aspect Ratio */,
        }}
      >
        <iframe
          src={selectedVideo.url}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="videoIframe"
        ></iframe>
      </div>
    </div>
  );
};

export default Video;

Video.propTypes = {
  height: PropTypes.string.isRequired,
};
