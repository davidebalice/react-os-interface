import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { RiPlayList2Fill } from "react-icons/ri";
import { playlist, default as video } from "../data/video";

const Video = () => {
  const [selectedVideo, setSelectedVideo] = useState(video[0]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(1);
  const [selectedPlaylistTitle, setSelectedPlaylistTitle] = useState("");
  const [playlistView, setPlaylistView] = useState(false);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  useEffect(() => {
    setSelectedVideo(
      video.find((item) => item.idPlaylist === selectedPlaylist)
    );
    setSelectedPlaylistTitle(
      playlist.find((item) => item.id === selectedPlaylist)?.title || ""
    );
  }, [selectedPlaylist]);

  return (
    <div className="videoContainer">
      <div style={{ height: `100%` }}>
        <ul style={{ height: `130%` }}>
          <div>
            <RiPlayList2Fill /> {selectedPlaylistTitle}
            <div onClick={() => setPlaylistView(!playlistView)}>playlist</div>
            
            <div className={`playlistContainer ${playlistView ? "open" : ""}`}>
              {playlist.map((item) => (
                <li
                  key={item.id}
                  onClick={() => setSelectedPlaylist(item.id)}
                  className="videoItem"
                >
                  <div className="videoTitle">{item.title}</div>
                </li>
              ))}
            </div>
          </div>

          {video
            .filter((item) => item.idPlaylist === selectedPlaylist)
            .map((video) => (
              <li
                key={video.id}
                onClick={() => handleVideoSelect(video)}
                style={{
                  background: selectedVideo.id === video.id && "#e1e1e1",
                }}
                className="videoItem"
              >
                <div className="videoThumb">
                  <img src={video.thumb} />
                </div>
                <div className="videoTitle">{video.title}</div>
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
