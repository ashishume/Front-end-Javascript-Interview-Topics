import { useEffect, useRef, useState } from "react";
import mole from "./Whack-a-mole.png";
import moleHill from "./mole-hill.png";
import "./style.scss";
import { Button } from "@mui/material";

export interface IHole {
  isVisible: boolean;
  value: number;
}

const arr = [
  [
    { isVisible: false, value: 0 },
    { isVisible: false, value: 1 },
    { isVisible: false, value: 2 },
    { isVisible: false, value: 3 },
  ],
  [
    { isVisible: false, value: 4 },
    { isVisible: false, value: 5 },
    { isVisible: false, value: 6 },
    { isVisible: false, value: 7 },
  ],
  [
    { isVisible: false, value: 8 },
    { isVisible: false, value: 9 },
    { isVisible: false, value: 10 },
    { isVisible: false, value: 11 },
  ],
];
const WhackAMole = () => {
  const [holeData, setHoleData] = useState<IHole[][]>(arr);
  const [score, setScore] = useState<number>(0);
  const [timer, setTimer] = useState(15);
  const moleRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  const SECONDS = 1000;
  const MOLE_DELAY = 2000;

  /**
   * start game
   */
  const startGame = () => {
    setTimer(15);
    setScore(0);
    /** start interval */
    moleRef.current = setInterval(async () => {
      // generate 2 different random numbers from 0 to 16
      const randomNumber1 = Math.floor(Math.random() * 6); // 0 to 5
      const randomNumber2 = Math.floor(Math.random() * 6) + 6; // 6 to 11
      await changeVisibility(randomNumber1, true, randomNumber2);
    }, MOLE_DELAY);

    timerRef.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, SECONDS);
  };

  /** if time is 0 then clear all intervals and reset mole data */
  useEffect(() => {
    if (timer === 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      if (moleRef.current) {
        clearInterval(moleRef.current);
        moleRef.current = null;
        setHoleData(arr);
      }
    }
  }, [timer]);

  /** clear on unmount */
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
      clearInterval(moleRef.current);
      moleRef.current = null;
    };
  }, []);

  /** increment score if clicked successfully */
  const handleScore = async (index: number) => {
    await setScore((prev) => prev + 1);
    await changeVisibility(index, false);
  };

  /**
   * change the visibilty of the mole from the hill
   * @param index
   * @param isVisible
   */
  const changeVisibility = async (
    index1: number,
    isVisible: boolean,
    index2?: number
  ) => {
    const arr = holeData.map((row) => {
      return row.map((col) => {
        if (col.value === index1) {
          return {
            ...col,
            isVisible,
          };
        }

        if (index2 && col.value === index2) {
          return {
            ...col,
            isVisible,
          };
        }
        return col;
      });
    });
    await setHoleData(arr);
  };

  return (
    <div className="container">
      <div className="text-center ">Whack a mole</div>
      <div className="text-center">
        <Button onClick={startGame} variant="outlined">
          Start Game
        </Button>
      </div>
      <div className="flex flex-row justify-between	">
        <div className="text-2xl bold text-center">Score: {score}</div>
        <div className="text-2xl bold text-center">Time left: {timer}s</div>
      </div>
      <div className="my-1">
        {holeData?.map((row, index) => {
          return (
            <div
              key={index}
              className="flex flex-row gap-10 justify-center h-40"
            >
              {row.map(({ value, isVisible }) => {
                return (
                  <div
                    key={value}
                    className="hole my-1 flex flex-col rounded-md justify-center"
                  >
                    <img
                      src={mole}
                      onClick={() => handleScore(value)}
                      className={`mole w-20 h-20 ${
                        isVisible ? "show-mole" : ""
                      }`}
                    />

                    <img src={moleHill} className="w-auto h-10" />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhackAMole;
