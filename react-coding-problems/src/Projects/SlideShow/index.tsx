import { useState } from "react";
import "./style.scss";
import imageData from "./images.json";
import arrowImage from "./next.png";

const SlideShow = () => {
  const [page, setPage] = useState(0);

  function showMoreImages(direction: string) {
    const totalImages = imageData.data.length;

    if (direction === "left") {
      if (page <= 0) {
        setPage(totalImages - 1);
      }
      if (page > 0) setPage((prev) => prev - 1);
    } else if (direction === "right") {
      if (page >= totalImages - 1) {
        setPage(0);
      }
      if (page < totalImages - 1) setPage((prev) => prev + 1);
    }
  }

  return (
    <div className="image-container">
      <div className="image-content">
        <div className="left-slider">
          <img
            src={arrowImage}
            onClick={() => showMoreImages("left")}
            className="left-arrow"
          />
        </div>
        {imageData.data.map(({ imageName, id, imageUrl }, key) => {
          return (
            <img
              className={`image-fade ${key === page ? "show" : "hide"}`}
              key={id}
              src={imageUrl}
              alt={imageName}
            />
          );
        })}
        <div className="right-slider">
          <img
            className="right-arrow"
            onClick={() => showMoreImages("right")}
            src={arrowImage}
          />
        </div>
      </div>
      <div className="image-dots">
        {Array.from(Array(imageData.data.length), (_, i) => {
          return (
            <div
              onClick={() => setPage(i)}
              key={i}
              className={`dots ${page === i ? "active" : ""}`}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SlideShow;
