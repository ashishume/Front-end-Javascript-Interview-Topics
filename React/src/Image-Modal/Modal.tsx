import { useState } from "react";
import Backdrop from "./Backdrop";
import style from "./style.module.scss";
const ImageModal = ({ source, setIsOpen }: any) => {
  return (
    <Backdrop>
      <div className={style["container"]}>
        <div className={style["modal-content"]}>
          <div className={style['close-btn']} onClick={() => setIsOpen(false)}>X</div>
          <img className={style["image"]} src={require(`${source}`)} />
        </div>
      </div>
    </Backdrop>
  );
};

export default ImageModal;
