/**
 * Requirements
- Display a grid of faced-down cards on the screen, with each card representing a different item or image. You can use emojis as the image, a list of emojis has been provided.
- The grid should consist of an equal number of cards to make pairs.
- When a player clicks on a card, it should flip over and reveal its image.
- Allow the player to select two cards at a time.
- If the two selected cards have the same image, it's a match and they should remain face-up.
- If the two selected cards have different images and the player
- Selects other cards, the two selected cards should flip back.
- Do nothing, the two selected cards should flip back facedown after a short delay.
- When all pairs have been successfully matched, end the game and display a "Play again" button.
 */

import { Button } from "@mui/material";
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
    findMatchBetweenItems();
  }, [activeItems]);

  const handleMatch = (key: number) => {
    /** more than 2 items should not be allowed to click */
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
    /** only 2 items should be allowed for matching */
    if (activeItems.length <= 2 && activeItems.length === 2) {
      /** if items doesnt match then set the visible to false,
       * else keep it visible as done previously */
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

  const checkIfGameIsCompleted = (): boolean => {
    return items.every((row) => row.every((col) => col.isVisible));
  };

  const playAgain = () => {
    setActiveItems([]);
    const newItems = items.map((row) =>
      row.map((col) => {
        col.isVisible = false;
        return col;
      })
    );
    setItems(newItems);
  };

  return (
    <div className="container">
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl bold">Memory game</div>
        <div className="border-2 inline-block rounded-md p-2">
          {items.map((row, index) => {
            return (
              <div key={index} className="flex justify-center gap-0.5">
                {row.map(({ text, key, isVisible }) => {
                  return (
                    <div
                      key={key}
                      onClick={() => handleMatch(key)}
                      className={`border border-2 border-slate-500
                      rounded-md inline-block m-2 p-5 h-4 w-5 
                      flex justify-center items-center ${
                        isVisible
                          ? "pointer-events-none"
                          : "hover:bg-slate-300 bg-slate-200"
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

        {checkIfGameIsCompleted() ? (
          <div className="m-4">
            <Button
              variant="outlined"
              color="secondary"
              onClick={playAgain}
              size="small"
            >
              Play Again
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MemoryGame;
