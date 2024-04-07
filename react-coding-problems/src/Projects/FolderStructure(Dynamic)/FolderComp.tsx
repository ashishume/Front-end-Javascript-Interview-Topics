import { useState } from "react";

const FolderComp = ({ item, handleAddItem, handleRemoveItem }:any) => {
  const [isOpen, setOpen] = useState(false);
  const onHandleAddItem = (e:any, item:any) => {
    e.preventDefault();
    handleAddItem(item);
  };

  const onHandleRemoveItem = (e:any, item:any) => {
    e.preventDefault();
    handleRemoveItem(item);
  };

  return (
    <>
      <div onClick={() => setOpen(!isOpen)}>
        {item.children ? (isOpen ? "[-]" : "[+]") : ""}
        <span>
          {item.name}
          {"   "}
          {item.type == "folder" ? (
            <span onClick={(e) => onHandleAddItem(e, item)}>
              <strong>[Add file]</strong>
            </span>
          ) : (
            <span onClick={(e) => onHandleRemoveItem(e, item)}>
              <strong>[Remove file]</strong>
            </span>
          )}
        </span>
      </div>

      {item.children && isOpen && (
        <div
          style={{
            marginLeft: "20px",
          }}
        >
          {item.children.map((child:any) => {
            return (
              <FolderComp
                key={child.id}
                item={child}
                handleAddItem={handleAddItem}
                handleRemoveItem={handleRemoveItem}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default FolderComp;
