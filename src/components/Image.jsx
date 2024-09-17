import React, { useEffect, useState } from "react";
import config from "../config";
import { useComponentsContext } from "../context/ComponentsContext";

const Image = ({ addImage, images, type, setImage }) => {
  const token = localStorage.getItem("token");

  const [directory, setDirectory] = useState("");
  const [typeImage, setTypeImage] = useState("image");

  const { components, setComponents, setCurrentComponent } =
    useComponentsContext();

  const setBackground = (image) => {
    const selectedComponent = components.find((c) => c.name === "background");
    const otherComponents = components.filter((c) => c.name !== "background");
    selectedComponent.image = image;
    setImage(image);
    setComponents([...otherComponents, selectedComponent]);
    setCurrentComponent(selectedComponent);
  };

  useEffect(() => {
    if (type === "background") {
      setDirectory(config.backgroundUrl);
    } else if (type === "png") {
      setDirectory(config.pngUrl);
      setTypeImage("png");
    } else if (type === "uploadImage") {
      setDirectory(config.uploadImageUrl);
      setTypeImage("upload");
    } else if (type === "design") {
      setDirectory(config.designUrl);
    } else {
      setDirectory(config.imagesUrl);
    }
  }, [type]);

  return (
    <div className="grid grid-cols-2 gap-2">
      {images.map((item, i) => (
        <div
          key={i}
          onClick={() =>
            type === "background"
              ? setBackground(item.image_url)
              : addImage(item.image_url, typeImage)
          }
          className="w-full h-[90px] overflow-hidden rounded-md cursor-pointer"
        >
          <img
            className="w-full h-full  object-cover"
            src={`${directory}${item.image_url}?t=${token}`}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default Image;
