import React, { useState } from "react";
import data from "./data.json";
const TreeItem = ({ item }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)}>
        {item.children ? (isOpen ? "[-] " : "[+] ") : ""}
        {item.label}
      </div>
      {item.children && isOpen && (
        <div style={{ marginLeft: "20px" }}>
          {item.children.map((child: any) => (
            <TreeItem key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      {data.data.map((item: any) => {
        return <TreeItem key={item.id} item={item} />;
      })}
    </div>
  );
}
