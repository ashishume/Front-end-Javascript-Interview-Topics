import { produce } from "immer";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NestedCheckboxes = () => {
  const [checkedStateData, setCheckedStateData] = useState<any>([
    {
      id: 1,
      label: "parent 1",
      checked: false,
      children: [
        {
          id: 2,
          label: "child 1",
          checked: true,
        },
        {
          id: 3,
          label: "child 2",
          checked: false,
        },
      ],
    },
    {
      id: 4,
      label: "parent 2",
      checked: false,
      children: [
        {
          id: 5,
          label: "child 4",
          checked: false,
        },
        {
          id: 6,
          label: "child 5",
          checked: false,
        },
      ],
    },
    {
      id: 7,
      label: "orphan item",
      checked: false,
    },
  ]);

  const handleCheckedItem = (data: any, checked: boolean, item: any) => {
    let res = null;

    item.checked = checked;
    res = data.map((value: any) => {
      if (value.id === item.id) {
        return {
          ...value,
          ...item,
        };
      }
      if (value?.children) {
        handleCheckedItem(value.children, checked, item);
      }
      return value;
    });
    setCheckedStateData(res);
  };

  function handler(e: any, item: any) {
    handleCheckedItem(checkedStateData, e?.target?.checked, item);
  }

  return (
    <div className="container">
      <div className="content">
        {checkedStateData?.map((value: any) => {
          return (
            <HelperFunc
              key={value.id}
              data={value}
              handleCheckedItem={handler}
            />
          );
        })}
      </div>
    </div>
  );
};

const HelperFunc = ({ data, handleCheckedItem }: any) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={data?.checked}
        onChange={(e) => handleCheckedItem(e, data)}
      />
      <label>{data?.label}</label>
      {data?.children && (
        <div
          style={{
            marginLeft: "20px",
            marginBottom: "20px",
          }}
        >
          {data.children.map((item: any) => {
            return (
              <HelperFunc
                key={item.id}
                data={item}
                handleCheckedItem={(e: any) => handleCheckedItem(e, item)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NestedCheckboxes;
