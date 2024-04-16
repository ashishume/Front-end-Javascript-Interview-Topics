import { Fragment, useEffect, useRef, useState } from "react";
import Dialog from "./Components/Dialog/Dialog";
import photo from "./Photo/stock.jpg";
import style from "./photo.module.scss";
const Photo = () => {
  const initialValue = {
    positionX: 0,
    positionY: 0,
    visible: false,
  };
  const [dialogData, setDialogData] = useState(initialValue);
  const [value, setValue] = useState("");
  const [tag, setTag] = useState<[]>([]);
  const inputRef = useRef(null);

  /** click handler for dialog box to show at the clicked coordinate */
  const clickEventHandler = (event: MouseEvent) => {
    var rect = (event.target as HTMLElement).getBoundingClientRect();
    setDialogData({
      visible: true,
      positionX: event.clientX - rect.left,
      positionY: event.clientY - rect.top,
    });
  };

  /** set the data and push it to state when done is clicked in dialog data */
  const setData = async () => {
    await setTag(
      (v) =>
        [
          ...v,
          {
            tag: value,
            positionX: dialogData.positionX,
            positionY: dialogData.positionY,
            visible: false,
          },
        ] as any
    );

    //reset any previously added values
    await setDialogData(initialValue);
    await setValue("");
  };

  /** debounce for mouse move */
  const myDebounce = (func: any) => {
    let timer: any;
    return (...args: any) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, 300);
    };
  };

  /** when mouse is over the tagged locations store the coordinate and show dialog */
  const onMouseOverHandler = async (e: MouseEvent, item: any) => {
    const { clientX, clientY } = e;
    await setValue(item.tag);
    await setDialogData({
      positionX: clientX,
      positionY: clientY,
      visible: true,
    });
  };

  const onMouseLeaveHandler = async () => {
    await setValue("");
    await setDialogData(initialValue);
  };

  // focus on input field when dialog opens
  useEffect(() => {
    if (dialogData.visible) {
      (inputRef.current as any).focus();
    }
  }, [dialogData.visible]);

  return (
    <Fragment>
      <div className={style["container"]}>
        <img
          onClick={clickEventHandler as any}
          src={photo}
          alt="stock"
          style={{ cursor: "pointer" }}
          width="700"
          height="400"
        />
        {/* show all the taged locations in the image */}
        {tag.map((item: any, i: number) => (
          <div
            onMouseEnter={(e: any) => myDebounce(onMouseOverHandler(e, item))}
            onMouseLeave={onMouseLeaveHandler}
            key={i}
            style={{ left: item?.positionX, top: item?.positionY }}
            className={style["tagged"]}
          ></div>
        ))}
      </div>
      {dialogData.visible ? (
        <Dialog
          top={dialogData.positionY}
          left={dialogData.positionX}
          setValue={setValue}
          value={value}
          ref={inputRef}
          toggle={setData}
        />
      ) : null}
    </Fragment>
  );
};

export default Photo;
