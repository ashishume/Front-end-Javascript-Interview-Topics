import { useState } from "react";

const NestedCheckbox = () => {
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

    const utilHelper = (data: any, checked: boolean, item: any) => {
      if (!item.children) {
        item.checked = checked;
      } else {
        /** check all the children as well when parent is clicked */
        item.checked = checked;
        item.children.forEach((child: any) => {
          child.checked = checked;
        });
      }
      /** loop through nested children if any child is clicked */
      res = data.map((value: any) => {
        if (value.id === item.id) {
          return {
            ...value,
            ...item,
          };
        }
        if (value?.children) {
          utilHelper(value.children, checked, item);
        }
        return value;
      });
    };

    utilHelper(data, checked, item);
    setCheckedStateData(res);
  };

  function handler(e: any, item: any) {
    handleCheckedItem(checkedStateData, e?.target?.checked, item);
  }

  return (
    <div
      className="checkbox-container"
      style={{
        margin: "10px",
      }}
    >
      <div className="checkbox-content">
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

export default NestedCheckbox;
