import React, { useContext } from "react";
import config from "../config";
import { ComponentsContext } from "../context/ComponentsContext";
import Controls from "./Controls";

const Components = ({ info }) => {
  const { currentComponent, setCurrentComponent } =
    useContext(ComponentsContext);
  const componentId = info.id;
  const token = localStorage.getItem("token");
  let html = "";

  const currentSize = (currentInfo) => {
    const currentDiv = document.getElementById(currentInfo.id);
    if (currentDiv) {
      if (currentDiv.style.width) {
        currentDiv.style.width = parseInt(currentInfo.width) + "px";
        currentDiv.style.height = parseInt(currentInfo.height) + "px";
      }
      
    }
  };

  const handleClick = (info) => {
    handleHover(info);
  };

  const handleHover = (info) => {
    currentSize(info);
    setCurrentComponent(info);
  };

  if (info.name === "background" && info.type === "rect") {
    html = (
      <div
        id={componentId}
        onClick={() => info.setCurrentComponent(info)}
        onMouseDown={() => handleHover(info)}
        className="shadow-md"
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          zIndex: info.z_index,
        }}
      >
        {info.image && (
          <img
            className="w-full h-full"
            src={`${config.backgroundUrl}${info.image}?t=${token}`}
            alt="image"
          />
        )}
      </div>
    );
  }

  if (info.name === "shape" && info.type === "rect") {
    html = (
      <div
        id={componentId}
        onClick={() => handleClick(info)}
        onMouseDown={() => handleHover(info)}
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          opacity: info.opacity,
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group content"
      >
        <Controls
          id={componentId}
          info={info}
          exId=""
          showControls={
            currentComponent ? currentComponent.id === info.id : false
          }
        />
      </div>
    );
  }

  if (info.name === "shape" && info.type === "circle") {
    html = (
      <div
        id={componentId}
        onClick={() => handleClick(info)}
        onMouseDown={() => handleHover(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          width: info.width + "px",
          height: info.height + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group content"
      >
        <div
          id={`${componentId}c`}
          className="rounded-full"
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
          }}
        ></div>
        <Controls
          id={componentId}
          info={info}
          exId={`${componentId}c`}
          showControls={
            currentComponent ? currentComponent.id === info.id : false
          }
        />
      </div>
    );
  }

  if (info.name === "shape" && info.type === "triangle") {
    html = (
      <div
        id={componentId}
        onClick={() => handleClick(info)}
        onMouseDown={() => handleHover(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          width: info.width + "px",
          height: info.height + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group content"
      >
        <div
          id={`${componentId}t`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
          }}
        ></div>
        <Controls
          id={componentId}
          info={info}
          exId={`${componentId}t`}
          showControls={
            currentComponent ? currentComponent.id === info.id : false
          }
        />
      </div>
    );
  }

  if (info.name === "text") {
    html = (
      <div
        id={info.id}
        onClick={() => handleClick(info)}
        onMouseDown={() => handleHover(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
          width: info.width + "px",
          height: info.height + "px",
          padding: info.padding + "px",
          color: info.color,
          opacity: info.opacity,
        }}
        className="absolute group content"
      >
        <div
          id={`text${info.id}`}
          style={{
            fontSize: info.font + "px",
            fontWeight: info.weight,
            width: info.width + "px",
            height: info.height + "px",
          }}
        >
          {info.title}
        </div>
        <Controls
          id={info.id}
          info={info}
          showControls={
            currentComponent ? currentComponent.id === info.id : false
          }
        />
      </div>
    );
  }

  if (info.name === "image") {
    html = (
      <div
        id={componentId}
        onClick={() => handleClick(info)}
        onMouseDown={() => handleHover(info)}
        style={{
          width: info.width + "px",
          height: info.height + "px",
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          opacity: info.opacity,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group content"
      >
        <div
          className="overflow-hidden"
          id={`${componentId}img`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            borderRadius: `${info.radius}%`,
          }}
        >
          {info.type == "upload" ? (
            <img
              className="w-full h-full"
              src={`${config.uploadImageUrl}${info.image}?t=${token}`}
              alt="image"
            />
          ) : info.type == "png" ? (
            <img
              className="w-full h-full"
              src={`${config.pngUrl}${info.image}?t=${token}`}
              alt="image"
            />
          ) : (
            <img
              className="w-full h-full"
              src={`${config.imagesUrl}${info.image}?t=${token}`}
              alt="image"
            />
          )}
        </div>
        <Controls
          id={componentId}
          info={info}
          exId={`${componentId}img`}
          showControls={
            currentComponent ? currentComponent.id === info.id : false
          }
        />
      </div>
    );
  }

  return html;
};

export default Components;
