import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BarLoader from "react-spinners/BarLoader";
import api from "../utils/api";
import Image from "./Image";

const Images = ({ addImage }) => {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      try {
        const { data } = await api.get("/api/design-images");
        setImages(data.images);
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, []);

  return (
    <div>
      {loader && (
        <div className="flex justify-center items-center mb-2">
          <BarLoader color="#fff" />
        </div>
      )}

      <div className="h-[80vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
        <Image addImage={addImage} images={images} type="images" />
      </div>
    </div>
  );
};

export default Images;
