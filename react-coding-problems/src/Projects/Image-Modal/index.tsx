import React, { useState } from "react";
import ImageModal from "./Modal";
import photo from './stock.jpg'
const ImageModalParent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
        eaque illo veritatis, reiciendis consequatur fugit incidunt! Libero rem
        quia et reiciendis accusamus. Eum soluta ipsum porro quibusdam iure,
        provident optio.
      </p>
      <button onClick={() => setIsOpen(!isOpen)}>Open Modal</button>
      {isOpen && <ImageModal source={photo} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default ImageModalParent;
