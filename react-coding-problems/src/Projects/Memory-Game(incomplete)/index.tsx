import { useEffect, useState } from "react";
export interface Emoji {
  key: number;
  isMatch: boolean;
  isVisible: boolean;
  text: string;
}
const emojis: Emoji[][] = [
  [
    { key: 1, isVisible: false, isMatch: false, text: "🐵" },
    { key: 2, isVisible: false, isMatch: false, text: "🐶" },
    { key: 3, isVisible: false, isMatch: false, text: "🦊" },
    { key: 4, isVisible: false, isMatch: false, text: "🐱" },
  ],
  [
    { key: 5, isVisible: false, isMatch: false, text: "🦁" },
    { key: 6, isVisible: false, isMatch: false, text: "🐯" },
    { key: 7, isVisible: false, isMatch: false, text: "🐴" },
    { key: 8, isVisible: false, isMatch: false, text: "🦄" },
  ],
  [
    { key: 9, isVisible: false, isMatch: false, text: "🐵" },
    { key: 10, isVisible: false, isMatch: false, text: "🐶" },
    { key: 11, isVisible: false, isMatch: false, text: "🦊" },
    { key: 12, isVisible: false, isMatch: false, text: "🐱" },
  ],
  [
    { key: 13, isVisible: false, isMatch: false, text: "🦁" },
    { key: 14, isVisible: false, isMatch: false, text: "🐯" },
    { key: 15, isVisible: false, isMatch: false, text: "🐴" },
    { key: 16, isVisible: false, isMatch: false, text: "🦄" },
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
      if (item1.text === item2.text) {
        // const newItems = items.map((row) => {
        //   return row.map((col) => {
        //     if (col.key === item1.key || col.key === item2.key) {
        //       col.isMatch = true;
        //     }
        //     return col;
        //   });
        // });
        // const newItems = _toggleMatchOrVisible(item1, item2, "isMatch");
        // setItems(newItems);
        // setActiveItems([]);
      } else {
        setTimeout(() => {
          // const resetItems = items.map((row) => {
          //   return row.map((col) => {
          //     if (col.key === item1.key || col.key === item2.key) {
          //       col.isVisible = false;
          //     }
          //     return col;
          //   });
          // });
          const newItems = _toggleMatchOrVisible(item1, item2, "isVisible");
          setItems(newItems);
        }, 700);
      }
      setActiveItems([]);
    }
  };
  const _toggleMatchOrVisible = (item1: Emoji, item2: Emoji, key: any) => {
    return items.map((row) => {
      return row.map((col) => {
        if (col.key === item1.key || col.key === item2.key) {
          col[key as "isMatch" | "isVisible"] = false;
        }
        return col;
      });
    });
  };

  return (
    <div className="container">
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl bold">Memory game</div>
        <div className="border inline-block rounded-md p-2">
          {items.map((row, index) => {
            return (
              <div key={index} className="flex justify-center gap-0.5">
                {row.map(({ isMatch, text, key, isVisible }) => {
                  return (
                    <div
                      key={key}
                      onClick={() => handleMatch(key)}
                      className={`border border-3 
                      rounded-md inline-block m-2 p-5 h-4 w-5 
                      flex justify-center items-center ${
                        isMatch || isVisible
                          ? "pointer-events-none"
                          : "hover:bg-slate-300 bg-slate-100 "
                      }`}
                    >
                      {isMatch || isVisible ? text : ""}
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
