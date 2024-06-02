import { useState } from "react";
import "./styles.scss";

export interface IItem {
  id: number;
  label: string;
  checked: boolean;
  disabled: boolean;
  isLeftList?: boolean;
}
const TransferList = () => {
  const [leftList, setLeftList] = useState<IItem[]>([
    {
      id: 5,
      label: "HTML",
      checked: false,
      disabled: false,
    },
    {
      id: 6,
      label: "Javascript",
      checked: false,
      disabled: false,
    },
    {
      id: 7,
      label: "CSS",
      checked: false,
      disabled: false,
    },
    {
      id: 8,
      label: "Typescript",
      checked: false,
      disabled: false,
    },
  ]);
  const [rightList, setRightList] = useState<IItem[]>([
    {
      id: 1,
      label: "React",
      checked: false,
      disabled: false,
    },
    {
      id: 2,
      label: "Angular",
      checked: false,
      disabled: false,
    },
    {
      id: 3,
      label: "Vue",
      checked: false,
      disabled: false,
    },
    {
      id: 4,
      label: "Preact",
      checked: false,
      disabled: false,
    },
  ]);

  /**
   * shift items among left and right list
   * @param shiftType
   */
  async function shiftHandler(shiftType: string) {
    switch (shiftType) {
      case "leftAll": {
        if (rightList.every((val) => !val.disabled)) {
          //transfer all the right items to left
          await setLeftList((prev) => [...prev, ...rightList]);

          //make right list empty
          await setRightList([]);

          //mark all the previously checked items as false
          await setLeftList((prev) =>
            prev.map((val) => ({ ...val, checked: false, disabled: false }))
          );
        }
        break;
      }
      case "leftSelected":
        {
          //find all the checked items
          const rightCheckedItems = rightList.filter((val) => val.checked);
          if (rightCheckedItems?.length) {
            //copy the checked items
            await setLeftList((prev) => [...prev, ...rightCheckedItems]);

            // remove the items which have already been copied
            await setRightList((prev) =>
              prev.filter(
                (val) => !rightCheckedItems.some((item) => item.id === val.id)
              )
            );

            // mark the already checked items as false
            await setLeftList((prev) =>
              prev.map((val) => ({ ...val, checked: false, disabled: false }))
            );
          }
        }
        break;
      case "rightAll": {
        // same proces as leftAll (just vice versa)
        if (leftList.every((val) => !val.disabled)) {
          await setRightList((prev) => [...prev, ...leftList]);
          await setLeftList([]);
          await setRightList((prev) =>
            prev.map((val) => ({ ...val, checked: false, disabled: false }))
          );
        }
        break;
      }
      case "rightSelected": {
        // same proces as leftSelected (just vice versa)
        const leftCheckedItems = leftList.filter((val) => val.checked);
        if (leftCheckedItems?.length) {
          await setRightList((prev) => [...prev, ...leftCheckedItems]);
          await setLeftList((prev) =>
            prev.filter(
              (val) => !leftCheckedItems.some((item) => item.id === val.id)
            )
          );
          await setRightList((prev) =>
            prev.map((val) => ({ ...val, checked: false, disabled: false }))
          );
          break;
        }
      }
    }
  }

  /**
   * mark checkbox of each list item
   * @param isLeftList
   * @param event
   * @param item
   */
  function onListSelect(
    isLeftList: boolean = false,
    event: React.ChangeEvent<HTMLInputElement>,
    item: IItem
  ) {
    setDisableOrEnableCheckbox(isLeftList, event.target.checked);

    const list = isLeftList ? leftList : rightList;
    const tempArr = list.map((value) => {
      if (value.id === item.id) {
        value.checked = event.target.checked;
      }
      return { ...value, ...{ isLeftList } };
    });

    isLeftList ? setLeftList(tempArr) : setRightList(tempArr);
  }

  /**
   * if left list item is checked then disable all the right items (vice versa)
   * @param isLeftList
   * @param isChecked
   */
  function setDisableOrEnableCheckbox(isLeftList: boolean, isChecked: boolean) {
    isLeftList
      ? setRightList((rightList) =>
          rightList.map((val) => ({ ...val, disabled: isChecked }))
        )
      : setLeftList((leftList) =>
          leftList.map((val) => ({ ...val, disabled: isChecked }))
        );
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
                  disabled={item?.disabled}
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
                  disabled={item?.disabled}
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
