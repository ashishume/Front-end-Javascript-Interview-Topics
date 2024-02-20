import style from "./style.module.scss";
const ImageModal = ({ source }: any) => {
  return (
    <div className={style["container"]}>
      <div className={style["modal-content"]}>
        <img className={style["image"]} src={source} />
      </div>
    </div>
  );
};

export default ImageModal;
