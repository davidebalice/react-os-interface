import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import dirImg from "../assets/icons/explorer.png";
import fileImg from "../assets/icons/file.png";
import note from "../assets/icons/note.png";
import serverIcon from "../assets/icons/server.png";
import config from "../config";
import { useOsContext } from "../context/Context";
import server from "../data/server";

const Explorer = () => {
  const { icons, setIcons } = useOsContext();
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDirectory, setCurrentDirectory] = useState("");

  const getTokenFromStorage = () => {
    return localStorage.getItem("token");
  };

  const calculateNextPosition = (windows) => {
    const xStep = 70;
    const yStep = 0;

    const maxPosition = windows.reduce(
      (acc, window) => {
        acc.maxX = Math.max(acc.maxX, window.position.x);
        acc.maxY = Math.max(acc.maxY, window.position.y);
        return acc;
      },
      { maxX: 0, maxY: 0 }
    );

    const nextPosition = {
      x: maxPosition.maxX + xStep,
      y: maxPosition.maxY + yStep,
    };

    return nextPosition;
  };

  const ls = async () => {
    const token = getTokenFromStorage();
    await axios
      .get(config.apiUrlFiles, {
        params: { dir: currentDirectory },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        const fileList = response.data.items;

        setFileList(fileList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    ls();
  }, [currentDirectory]);

  const cd = async (directory) => {
    setIsLoading(true);
    const token = getTokenFromStorage();
    try {
      const response = await axios.get(config.apiUrlDirectory, {
        params: { dir: `${currentDirectory}/${directory}` },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.exists) {
        setCurrentDirectory((prevDir) =>
          prevDir ? `${prevDir}/${directory}` : directory
        );
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    } catch (error) {
      console.error("Error changing directory:", error);
    }
  };

  const goBack = () => {
    setIsLoading(true);
    const lastSlashIndex = currentDirectory.lastIndexOf("/");
    if (lastSlashIndex > -1) {
      setCurrentDirectory(currentDirectory.slice(0, lastSlashIndex));
    } else {
      setCurrentDirectory("");
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const goRoot = () => {
    setIsLoading(true);
    setCurrentDirectory("");
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const file = async (filename) => {
    const token = getTokenFromStorage();
    const newPosition = calculateNextPosition(icons);
    await axios
      .get(config.apiUrlFile, {
        params: { dir: currentDirectory, filename: filename },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const newWindow = {
          id: Date.now(),
          name: filename,
          img: note,
          position: newPosition,
          zIndex: 160,
          opened: true,
          minimized: false,
          content: response.data.content,
          info: "",
          resized: true,
          type: "file",
        };
        setIcons((prevIcons) => [...prevIcons, newWindow]);
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="window-row-urlbar">
        <div className="window-row-url">
          <img src={serverIcon} style={{ width: "18px" }} />
          <span>
            {server[0].url.slice(0, -1)}
            {currentDirectory && currentDirectory.startsWith("/")
              ? currentDirectory
              : `/${currentDirectory}`}
          </span>
        </div>
      </div>

      <div className="window-row">
        <div>
          {server.map((item) => {
            return (
              <motion.div
                key={"pc" + item.id}
                className="serverListItem"
                onDoubleClick={null}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    filter: item.active ? "none" : "grayscale(100%)",
                    opacity: item.active ? 1 : 0.7,
                  }}
                />
                <p>{item.name}</p>
              </motion.div>
            );
          })}
        </div>
        <div style={{ padding: "20px" }}>
          {currentDirectory.length >= 1 && (
            <>
              <div className="filesystemRow" onDoubleClick={goRoot}>
                <div className="filesystemRowDirectory">
                  <div className="filesystemName">
                    <img src={dirImg} />

                    <span>.</span>
                  </div>
                </div>
                <div>
                  <p className="filesystemRowDirectory">{`<dir>`}</p>
                </div>
              </div>
              <div className="filesystemRow" onDoubleClick={goBack}>
                <div className="filesystemRowDirectory">
                  <div className="filesystemName">
                    <img src={dirImg} />

                    <span>..</span>
                  </div>
                </div>
                <div>
                  <p className="filesystemRowDirectory">{`<dir>`}</p>
                </div>
              </div>
            </>
          )}

          {fileList &&
            fileList.map((item, index) => (
              <div
                key={index}
                className="filesystemRow"
                onDoubleClick={() => {
                  item.type === "directory" ? cd(`${item.name}`) : "";
                }}
                style={{ display: isLoading ? "none" : "flex" }}
              >
                <div
                  className={
                    item.type === "directory"
                      ? "filesystemRowDirectory"
                      : "filesystemRowFile"
                  }
                >
                  <div className="filesystemName">
                    {item.type === "directory" ? (
                      <>
                        <img src={dirImg} />
                      </>
                    ) : (
                      <>
                        <img src={fileImg} />
                      </>
                    )}

                    {item.type === "directory" ? (
                      <span>{item.name}</span>
                    ) : (
                      <span onDoubleClick={() => file(item.name)}>
                        {item.name}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  {item.type === "directory" ? (
                    <p className="filesystemRowDirectory">{`<dir>`}</p>
                  ) : (
                    <p className="filesystemRowFile">{item.size}kb</p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Explorer;
