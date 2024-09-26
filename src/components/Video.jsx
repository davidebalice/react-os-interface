import React, { useState } from "react";
import video from "../data/video";

const Video = () => {
  const [selectedVideo, setSelectedVideo] = useState(video[0]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="videoContainer">
      <div>
        <ul>
          {video.map((video) => (
            <li
              key={video.id}
              onClick={() => handleVideoSelect(video)}
              style={{ background: selectedVideo.id === video.id && "#e1e1e1" }}
            >
              {video.title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <iframe
          width="620"
          height="440"
          src={selectedVideo.url}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          className="videoIframe"
        ></iframe>
      </div>
    </div>
  );
};

export default Video;
