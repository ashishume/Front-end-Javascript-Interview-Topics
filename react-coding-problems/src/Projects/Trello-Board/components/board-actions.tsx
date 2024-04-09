import { ITasks } from "../models/models";
import InputField from "./Input";
import { Button } from "@/components/ui/button";

const BoardActions = ({
  inputActive,
  addNewBoard,
  tasks,
  boardValue,
  setBoardValue,
  setInputActive,
}: {
  inputActive: number | null;
  addNewBoard: () => void;
  tasks: ITasks[];
  boardValue: string;
  setBoardValue: (e: string) => void;
  setInputActive: (e: number) => void;
}) => {
  return (
    <div className="board-container">
      {inputActive !== null &&
      !tasks.filter((v: any) => v.boardId === inputActive).length ? (
        <>
          <InputField
            placeholder="Add new board"
            onChange={(e) => setBoardValue(e.target.value)}
            value={boardValue}
          />
          <Button
            variant="outline"
            size="sm"
            className="board-btn"
            onClick={addNewBoard}
          >
            + Add Board
          </Button>
        </>
      ) : (
        <Button
          variant="outline"
          className="board-btn"
          size="sm"
          onClick={() => setInputActive(-1)} // add any number to make not null and value shud not be any boardId
        >
          + Add More
        </Button>
      )}
    </div>
  );
};

export default BoardActions;
