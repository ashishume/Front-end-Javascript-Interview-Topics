import style from "./style.module.scss";
const Backdrop = ({ children }: any) => {
  return <div className={style["backdrop"]}>{children}</div>;
};

export default Backdrop;
