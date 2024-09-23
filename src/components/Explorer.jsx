import axios from "axios";
import React, { useEffect, useState } from "react";
import dirImg from "../assets/icons/explorer.png";
import fileImg from "../assets/icons/file.png";
import note from "../assets/icons/note.png";
import config from "../config";
import { useOsContext } from "../context/Context";

const Explorer = () => {
  const { bg,icons,setIcons } = useOsContext();
  const [fileList, setFileList] = useState([]);
  const [currentDirectory, setCurrentDirectory] = useState([]);
  const [windows, setWindows] = useState(icons);

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
      }
    } catch (error) {
      console.error("Error changing directory:", error);
    }
  };

  const goBack = () => {
    const lastSlashIndex = currentDirectory.lastIndexOf("/");
    if (lastSlashIndex > -1) {
      setCurrentDirectory(currentDirectory.slice(0, lastSlashIndex));
    } else {
      setCurrentDirectory("");
    }
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
            info:"",
            type:"file"
          };
          setIcons((prevIcons) => [...prevIcons, newWindow]);
        })
        .catch((error) => {
        
        });
    
  };

  return (
    <>
      <div className="window-row">
        <div>
          aaaa
          <button onDoubleClick={goBack}>Torna indietro</button>
        </div>
        <div style={{ padding: "20px" }}>
          {fileList &&
            fileList.map((item, index) => (
              <div
                key={index}
                className="filesystemRow"
                onDoubleClick={() => {
                  item.type === "directory" ? cd(`${item.name}`) : "";
                }}
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
                      <span onDoubleClick={()=>file(item.name)}>{item.name}</span>
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

/*

import axios from "axios";
import { useContext, useEffect, useMemo } from "react";
import { Context } from "../../context/DataContext";
import "./terminal.css";
import { FileItem } from "./types";

const useCommands = (
  pushToHistory: any,
  setHistory: any,
  setOpenTerminal: any,
  commandsHistory: any,
  openModalWithData: (data: any, title: string, edit: boolean) => void,
  closeModal: () => void
) => {
  const apiUrlFiles: string = process.env.REACT_APP_FILES_API_URL || "";
  const apiUrlFile: string = process.env.REACT_APP_FILE_API_URL || "";
  const apiUrlNewFile: string = process.env.REACT_APP_NEW_FILE_API_URL || "";
  const apiUrlDirectory: string = process.env.REACT_APP_CHECKDIR_URL || "";
  const apiUrlDeleteFile: string = process.env.REACT_APP_DELETE || "";
  const apiUrlRenameFile: string = process.env.REACT_APP_RENAME || "";

  const { setDirectory, triggerUpdate } = useContext(Context);
  interface ApiResponse {
    items: FileItem[];
  }

  const notAllowedString: string[] = [
    "..",
    ".",
    "/",
    "//",
    "\\",
    "\\\\",
    "'",
    '"',
  ];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "F2") {
        setHistory([]);
        window.location.reload();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [setOpenTerminal]);

  const getTokenFromStorage = () => {
    return sessionStorage.getItem("token");
  };

  



  const edit = async () => {
    const token = getTokenFromStorage();
    triggerUpdate();
    const verifyFile = sessionStorage.getItem("edit");

    if (verifyFile !== null && !notAllowedString.includes(verifyFile)) {
      let directory = sessionStorage.getItem("directory");

      await axios
        .get(apiUrlFile, {
          params: { dir: directory, filename: verifyFile },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          console.log("error:", response.data.error);

          openModalWithData(response.data.content, response.data.title, true);
        })
        .catch((error) => {
          pushToHistory(
            <>
              <div>
                <span style={{ color: "red" }}>
                  <strong>file not found</strong>
                </span>
              </div>
            </>
          );
        });
    }
  };

  const newfile = async () => {
    const token = getTokenFromStorage();
    triggerUpdate();
    const verifyFile = sessionStorage.getItem("new");

    if (verifyFile !== null && !notAllowedString.includes(verifyFile)) {
      let directory = sessionStorage.getItem("directory");

      await axios
        .post(
          apiUrlNewFile,
          {
            dir: directory,
            filename: verifyFile,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Response:", response.data);
          if (response.data.status === "demo") {
            pushToHistory(
              <>
                <div>
                  <span style={{ color: "red" }}>
                    <strong>demo mode: write file is not allowed</strong>
                  </span>
                </div>
              </>
            );
          }
          console.log("error:", response.data.error);
        })
        .catch((error) => {
          pushToHistory(
            <>
              <div>
                <span style={{ color: "red" }}>
                  <strong>file not found</strong>
                </span>
              </div>
            </>
          );
        });
    }
  };

  const deleteFile = async () => {
    const token = getTokenFromStorage();
    triggerUpdate();
    const verifyFile = sessionStorage.getItem("delete");

    if (verifyFile !== null && !notAllowedString.includes(verifyFile)) {
      let directory = sessionStorage.getItem("directory");

      await axios
        .post(
          apiUrlDeleteFile,
          {
            dir: directory,
            filename: verifyFile,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Response:", response.data);
          if (response.data.status === "demo") {
            pushToHistory(
              <>
                <div>
                  <span style={{ color: "red" }}>
                    <strong>demo mode: delete file is not allowed</strong>
                  </span>
                </div>
              </>
            );
          }
          console.log("error:", response.data.error);
        })
        .catch((error) => {
          pushToHistory(
            <>
              <div>
                <span style={{ color: "red" }}>
                  <strong>file not found</strong>
                </span>
              </div>
            </>
          );
        });
    }
  };

  const renameFile = async () => {
    const token = getTokenFromStorage();
    triggerUpdate();
    const oldFileName = sessionStorage.getItem("rename");
    const newFileName = sessionStorage.getItem("newname");

    if (oldFileName !== null && !notAllowedString.includes(oldFileName)) {
      let directory = sessionStorage.getItem("directory");

      await axios
        .post(
          apiUrlRenameFile,
          {
            dir: directory,
            oldFileName: oldFileName,
            newFileName: newFileName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Response:", response.data);
          if (response.data.status === "demo") {
            pushToHistory(
              <>
                <div>
                  <span style={{ color: "red" }}>
                    <strong>demo mode: rename file is not allowed</strong>
                  </span>
                </div>
              </>
            );
          }
          console.log("error:", response.data.error);
        })
        .catch((error) => {
          pushToHistory(
            <>
              <div>
                <span style={{ color: "red" }}>
                  <strong>file not found</strong>
                </span>
              </div>
            </>
          );
        });
    }
  };

  const back = async () => {
    let directory: string | null = sessionStorage.getItem("directory");

    if (directory !== null && directory !== "") {
      if (directory.includes("\\")) {
        directory = directory.substring(0, directory.lastIndexOf("\\"));
        sessionStorage.setItem("directory", directory);
        setDirectory(directory);
      } else {
        sessionStorage.setItem("directory", "");
        setDirectory("");
      }
    }
  };

  const root = async () => {
    sessionStorage.setItem("directory", "");
    setDirectory("");
  };

  const commands = useMemo(
    () => ({
      clear: clear,
      cd: cd,
      "cd.": root,
      "cd..": back,
      help: commandlist,
      h: commandlist,
      info: info,
      edit: edit,
      file: file,
      github: github,
      close: close,
      site: site,
      skills: skills,
      ls: ls,
      dir: ls,
      rename: renameFile,
      new: newfile,
      delete: deleteFile,
    }),
    [pushToHistory, commandsHistory]
  );

  return commands;
};

export default useCommands;
*/
