import React from "react";
import PropTypes from "prop-types";

const Controls = ({ id, info, exId, showControls }) => {
  const elementId = parseInt(exId || id);

  return (
    <>
      {showControls && (
        <>
          <div
            onMouseDown={() => info.moveElement(elementId, info)}
            className="dragDiv dragIcon bgHover absolute -top-0 left-0 translate-0 w-full h-full z-50"
          ></div>
          <div
            onMouseDown={() =>
              info.resizeElement(elementId, info, "right", "bottom")
            }
            className="absolute -bottom-2 -right-2 w-4 h-4 cursor-nwse-resize bg-green-600 z-50"
          ></div>
          <div
            onMouseDown={() =>
              info.resizeElement(elementId, info, "right", "top")
            }
            className="absolute -top-2 -right-2 w-4 h-4 cursor-nesw-resize bg-green-600 z-50"
          ></div>
          <div
            onMouseDown={() =>
              info.resizeElement(elementId, info, "left", "bottom")
            }
            className="absolute -bottom-2 -left-2 w-4 h-4 cursor-nesw-resize bg-green-600 z-50"
          ></div>
          <div
            onMouseDown={() =>
              info.resizeElement(elementId, info, "left", "top")
            }
            className="absolute -top-2 -left-2 w-4 h-4 cursor-nwse-resize bg-green-600 z-50"
          ></div>
          <div
            onMouseDown={() => info.rotateElement(elementId, info)}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 cursor-grab z-50"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="bg-white rounded-full p-1 border border-gray-400"
            >
              <path
                d="M12 2V6"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 14.21 2.79 16.21 4.22 17.78"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22V18"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22C17.52 22 22 17.52 22 12C22 9.79 21.21 7.79 19.78 6.22"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 12H18"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12H6"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </>
      )}
    </>
  );
};

Controls.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  info: PropTypes.shape({
    moveElement: PropTypes.func.isRequired,
    resizeElement: PropTypes.func.isRequired,
    rotateElement: PropTypes.func.isRequired,
  }).isRequired,
  exId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showControls: PropTypes.bool.isRequired,
};

export default Controls;
