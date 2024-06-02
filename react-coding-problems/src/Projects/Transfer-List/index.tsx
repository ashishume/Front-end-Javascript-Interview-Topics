import { useState } from "react";
import "./styles.scss";

export interface IItem {
  id: number;
  label: string;
  checked: boolean;
  isLeftList?: boolean;
}
const TransferList = () => {
  const [leftList, setLeftList] = useState<IItem[]>([
    {
      id: 5,
      label: "HTML",
      checked: false,
    },
    {
      id: 6,
      label: "Javascript",
      checked: false,
    },
    {
      id: 7,
      label: "CSS",
      checked: false,
    },
    {
      id: 8,
      label: "Typescript",
      checked: false,
    },
  ]);
  const [rightList, setRightList] = useState<IItem[]>([
    {
      id: 1,
      label: "React",
      checked: false,
    },
    {
      id: 2,
      label: "Angular",
      checked: false,
    },
    {
      id: 3,
      label: "Vue",
      checked: false,
    },
    {
      id: 4,
      label: "Preact",
      checked: false,
    },
  ]);

  const [leftItemsToTransfer, setLeftTransferList] = useState<IItem[]>([]);
  const [rightItemsToTransfer, setRightTransferList] = useState<IItem[]>([]);

  async function shiftHandler(shiftType: string) {
    switch (shiftType) {
      case "leftAll": {
        if (rightList?.length) {
          await setLeftList((prev) => [...prev, ...rightList]);
          await setRightList([]);
          await setLeftList((prev) =>
            prev.map((val) => {
              val.checked = false;
              return val;
            })
          );
        }
        break;
      }
      case "leftSelected": {
        if (rightItemsToTransfer?.length) {
          await setLeftList((prev) => [...prev, ...rightItemsToTransfer]);
          await setRightList((prev) =>
            prev.filter(
              (val) => !rightItemsToTransfer.some((item) => item.id === val.id)
            )
          );

          await setLeftList((prev) =>
            prev.map((val) => {
              val.checked = false;
              return val;
            })
          );
        }
        break;
      }
      case "rightAll": {
        if (leftList?.length) {
          await setRightList((prev) => [...prev, ...leftList]);
          await setLeftList([]);
          await setRightList((prev) =>
            prev.map((val) => {
              val.checked = false;
              return val;
            })
          );
        }
        break;
      }
      case "rightSelected": {
        if (leftItemsToTransfer?.length) {
          await setRightList((prev) => [...prev, ...leftItemsToTransfer]);
          await setLeftList((prev) =>
            prev.filter(
              (val) => !leftItemsToTransfer.some((item) => item.id === val.id)
            )
          );
          await setRightList((prev) =>
            prev.map((val) => {
              val.checked = false;
              return val;
            })
          );
        }
        break;
      }
    }

    //empty the list after operation is completed
    await setLeftTransferList([]);
    await setRightTransferList([]);
  }


  
  function onListSelect(
    isLeftList: boolean = false,
    event: React.ChangeEvent<HTMLInputElement>,
    item: IItem
  ) {
    const list = isLeftList ? leftList : rightList;
    const tempArr = list.map((value) => {
      if (value.id === item.id) {
        value.checked = event.target.checked;
      }
      return { ...value, ...{ isLeftList } };
    });

    isLeftList ? setLeftList(tempArr) : setRightList(tempArr);

    if (isLeftList) {
      if (event.target.checked) {
        setLeftTransferList((prev) => [...prev, item]);
      } else {
        setLeftTransferList((prev) => prev.filter((v) => v.id !== item.id));
      }
    } else {
      if (event.target.checked) {
        setRightTransferList((prev) => [...prev, item]);
      } else {
        setRightTransferList((prev) => prev.filter((v) => v.id !== item.id));
      }
    }
  }
  return (
    <div className="transfer-list-container">
      <h2>Transfer list</h2>
      <div className="content">
        <ul className="from-list">
          {leftList?.map((item: IItem) => {
            return (
              <li key={item?.id}>
                <input
                  type="checkbox"
                  checked={item?.checked}
                  onChange={(e) => onListSelect(true, e, item)}
                />
                {item?.label}
              </li>
            );
          })}
        </ul>

        <div className="tranfer-item">
          <button
            className="shift-btn"
            title="leftAll"
            onClick={() => shiftHandler("leftAll")}
          >{`<<`}</button>
          <button
            className="shift-btn"
            title="leftSelected"
            onClick={() => shiftHandler("leftSelected")}
          >{`<`}</button>
          <button
            className="shift-btn"
            title="rightSelected"
            onClick={() => shiftHandler("rightSelected")}
          >{`>`}</button>
          <button
            className="shift-btn"
            title="rightAll"
            onClick={() => shiftHandler("rightAll")}
          >{`>>`}</button>
        </div>
        <ul className="to-list">
          {rightList?.map((item: IItem) => {
            return (
              <li key={item?.id}>
                <input
                  type="checkbox"
                  checked={item?.checked}
                  onChange={(e) => onListSelect(false, e, item)}
                />
                {item?.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TransferList;
