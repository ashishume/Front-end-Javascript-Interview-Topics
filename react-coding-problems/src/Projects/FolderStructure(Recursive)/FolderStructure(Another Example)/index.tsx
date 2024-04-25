import { useState } from "react";

const TreeItem = ({ item }: any) => {
  /** create a state for opening and closing the folder */
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)}>
        {/* if children is present show + and - icons */}
        {item.children ? (isOpen ? "[-] " : "[+] ") : ""}
        {item.label}
      </div>

      {/* based on the children availability make a recursive call to itself for more data */}
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

export default function FolderStructure2() {
  return (
    <div className="App">
      {/* loop through each data */}
      {data.data.map((item: any) => {
        return <TreeItem key={item.id} item={item} />;
      })}
    </div>
  );
}

const data = {
  data: [
    {
      label: "Chooky",
      id: 1,
      children: [
        {
          label: "Wendy",
          id: 2,
        },
        {
          label: "Natsu",
          id: 3,
        },
        {
          label: "Lufy",
          id: 4,
          children: [
            {
              label: "Yaga",
              id: 5,
              children: [
                {
                  label: "Pinocchio",
                  id: 6,
                },
                {
                  label: "Lucy",
                  id: 7,
                },
                {
                  label: "Jack",
                  id: 8,
                  children: [
                    {
                      label: "Tinker Bell",
                      id: 9,
                    },
                    {
                      label: "Yesta",
                      id: 10,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "",
          id: 11,
        },
      ],
    },
    {
      label: "Juvia",
      id: 12,
    },
    {
      label: "Fairy",
      id: 13,
      children: [
        {
          label: "Hag",
          id: 14,
          children: [
            {
              label: "Geppetto",
              id: 15,
            },
            {
              label: "Erza",
              id: 16,
            },
            {
              label: "Ariel",
              id: 17,
            },
          ],
        },
      ],
    },
  ],
};
