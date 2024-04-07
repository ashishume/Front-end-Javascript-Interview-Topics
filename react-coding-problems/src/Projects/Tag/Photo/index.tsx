import { Fragment, useState } from "react";
import Dialog from "../Dialog";
import photo from "./stock.jpg";
const Photo = () => {
  /** click handler for dialog box to show at the clicked coordinate */
  const clickEventHandler = (event: MouseEvent) => {
    var rect = (event.target as HTMLElement).getBoundingClientRect();
    setDialogData({
      visible: true,
      positionX: event.clientX - rect.left,
      positionY: event.clientY - rect.top,
    });
  };

  const [dialogData, setDialogData] = useState({
    positionX: 0,
    positionY: 0,
    visible: false,
  });
  const [value, setValue] = useState("");
  const [tag, setTag] = useState<[]>([]);

  /** set the data and push it to state when done is clicked in dialog data */
  const setData = () => {
    setTag(
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
    setDialogData({ positionX: 0, positionY: 0, visible: false });
  };

  /** debounce for mouse move */
  const myDebounce = (func: any) => {
    let timer: any;
    return (...args: any) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, 250);
    };
  };

  /** when mouse is over the tagged locations store the coordinate and show dialog */
  const onMouseOverHandler = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    setDialogData({
      positionX: clientX,
      positionY: clientY,
      visible: true,
    });
  };

  return (
    <Fragment>
      <div className="container">
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
            onMouseMove={myDebounce(onMouseOverHandler as any)}
            onMouseLeave={() =>
              setDialogData({ visible: false, positionX: 0, positionY: 0 })
            }
            key={i}
            style={{ left: item?.positionX, top: item?.positionY }}
            className="tagged"
          ></div>
        ))}
      </div>
      {dialogData.visible ? (
        <Dialog
          top={dialogData.positionY}
          left={dialogData.positionX}
          setValue={setValue}
          toggle={setData}
        />
      ) : null}
    </Fragment>
  );
};

export default Photo;
