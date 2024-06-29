import { useEffect, useState } from "react";
export interface Emoji {
  key: number;
  isVisible: boolean;
  text: string;
}
const emojis: Emoji[][] = [
  [
    { key: 1, isVisible: false, text: "🐵" },
    { key: 2, isVisible: false, text: "🐶" },
    { key: 3, isVisible: false, text: "🦊" },
    { key: 4, isVisible: false, text: "🐱" },
  ],
  [
    { key: 5, isVisible: false, text: "🐭" },
    { key: 6, isVisible: false, text: "🐯" },
    { key: 7, isVisible: false, text: "🐴" },
    { key: 8, isVisible: false, text: "🦄" },
  ],
  [
    { key: 9, isVisible: false, text: "🐵" },
    { key: 10, isVisible: false, text: "🐶" },
    { key: 11, isVisible: false, text: "🦊" },
    { key: 12, isVisible: false, text: "🐱" },
  ],
  [
    { key: 13, isVisible: false, text: "🐭" },
    { key: 14, isVisible: false, text: "🐯" },
    { key: 15, isVisible: false, text: "🐴" },
    { key: 16, isVisible: false, text: "🦄" },
  ],
];

const MemoryGame = () => {
  const [items, setItems] = useState<Emoji[][]>(emojis);
  const [activeItems, setActiveItems] = useState<Emoji[]>([]);

  useEffect(() => {
    if (activeItems.length <= 2) {
      findMatchBetweenItems();
    }
  }, [activeItems]);

  const handleMatch = (key: number) => {
    if (activeItems.length < 2) {
      items.forEach((row) => {
        row.forEach((col) => {
          if (col.key === key) {
            setActiveItems((prev) => [...prev, col]);
            col.isVisible = true;
          }
        });
      });
    }
  };

  const findMatchBetweenItems = () => {
    const [item1, item2] = activeItems;
    if (activeItems.length === 2) {
      if (item1.text !== item2.text) {
        setTimeout(() => {
          const newItems = items.map((row) => {
            return row.map((col) => {
              if (col.key === item1.key || col.key === item2.key) {
                col.isVisible = false;
              }
              return col;
            });
          });
          setItems(newItems);
        }, 700);
      }
      setActiveItems([]);
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl bold">Memory game</div>
        <div className="border inline-block rounded-md p-2">
          {items.map((row, index) => {
            return (
              <div key={index} className="flex justify-center gap-0.5">
                {row.map(({ text, key, isVisible }) => {
                  return (
                    <div
                      key={key}
                      onClick={() => handleMatch(key)}
                      className={`border border-3 
                      rounded-md inline-block m-2 p-5 h-4 w-5 
                      flex justify-center items-center ${
                        isVisible
                          ? "pointer-events-none"
                          : "hover:bg-slate-300 bg-slate-100 "
                      }`}
                    >
                      {isVisible ? text : ""}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
