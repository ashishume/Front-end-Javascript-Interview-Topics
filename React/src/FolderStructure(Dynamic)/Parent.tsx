import FolderComp from "./FolderComp";
import { useEffect, useState } from "react";
// Tree component where user can add and delete node at any level
// https://codesandbox.io/p/sandbox/determined-babbage-9pvjt8?file=%2Fsrc%2FApp.js%3A20%2C6
const itemsData = {
  data: [
    {
      name: "App",
      type: "folder",
      id: 1,
      children: [
        {
          name: "RandomFile",
          type: "file",
          id: 2,
        },
      ],
    },
    {
      name: "Components",
      type: "folder",
      id: 3,
      children: [
        {
          name: "RandomFile1",
          type: "file",
          id: 4,
        },
        {
          name: "RandomFile2",
          type: "file",
          id: 5,
        },
        {
          name: "RandomFolder",
          type: "folder",
          id: 6,
          children: [
            {
              name: "RandomFile3",
              type: "file",
              id: 6,
            },
          ],
        },
      ],
    },
  ],
};
export default function DyamicFolder() {
  const [isInputHidden, setIsInputHidden] = useState(true);
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [items, setItems] = useState(null as any);
  useEffect(() => {
    setItems(itemsData);
  }, []);

  const handleAddItem = async (selected: any) => {
    await setIsInputHidden(false);
    await setFileData(selected);
  };

  const insertFileInsideFolder = (e: any) => {
    e.preventDefault();
    const findFile = (items: any, selected: any) => {
      items?.map((item: any) => {
        if (item?.id === selected?.id) {
          selected.children.push({
            type: "file",
            id: Math.floor(Math.random() * (10000 - 0 + 1)) + 0, // here uuid generator is req
            name: fileName,
          });
          setFileData(null);
          setFileName("");
          setIsInputHidden(true);
          return;
        }
        if (item?.children?.length) {
          findFile(item?.children, selected);
        }
      });
    };
    findFile(items?.data, fileData);
  };

  const handleRemoveItem = (items: any, itemToRemove: any) => {
    function removeFromChildren(items: any, itemToRemove: any) {
      const index = items?.findIndex(
        (child: any) => child?.id === itemToRemove.id
      );
      if (index !== -1) {
        items.splice(index, 1);
      } else {
        items?.forEach((child: any) => {
          if (child.type === "folder") {
            removeFromChildren(child.children, itemToRemove);
          }
        });
      }
      return items;
    }

    const res = removeFromChildren(items, itemToRemove);
    setItems({
      data: res,
    });
  };

  return (
    <div>
      <h2>File explorer</h2>
      {!isInputHidden ? (
        <form onSubmit={insertFileInsideFolder}>
          <input
            type="text"
            placeholder="enter file name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <button>Submit</button>
        </form>
      ) : null}
      {items?.data &&
        items?.data.map((item: any) => {
          return (
            <FolderComp
              key={item.id}
              item={item}
              handleAddItem={handleAddItem}
              handleRemoveItem={(e: any) => handleRemoveItem(items?.data, e)}
            />
          );
        })}
    </div>
  );
}
