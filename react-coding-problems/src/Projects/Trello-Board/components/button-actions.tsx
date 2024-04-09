import { Button } from "@/components/ui/button";
import InputField from "./Input";
import { ChangeEvent } from "react";

export const ButtonActions = ({
  isPointerEventsDisabled,
  inputActive,
  boardId,
  updateTaskValue,
  taskValue,
  addNewTask,
  resetAddTask,
  addNewCard,
}: {
  isPointerEventsDisabled: boolean;
  inputActive: number | null;
  boardId: number;
  updateTaskValue: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  taskValue: string;
  addNewTask: (boardId: number) => void;
  resetAddTask: () => void;
  addNewCard: (boardId: number) => void;
}) => {
  /** disable pointer events so that drag event doesnt get hindered */
  const btnStyles = {
    pointerEvents: isPointerEventsDisabled ? "none" : "auto",
    display: isPointerEventsDisabled ? "block" : "inline-block",
  };

  return (
    <>
      {inputActive === boardId ? (
        <InputField
          isPointerEventsDisabled={isPointerEventsDisabled}
          onChange={updateTaskValue}
          value={taskValue}
        />
      ) : null}
      {inputActive !== null && inputActive === boardId ? (
        <>
          <Button
            style={btnStyles as any}
            className="add-task-btn"
            variant="secondary"
            size="sm"
            disabled={!taskValue.trim()}
            onClick={() => addNewTask(boardId)} // add pointer events and also make the button work (find another way)
          >
            Add task
          </Button>
          <Button
            style={btnStyles as any}
            className="add-task-btn"
            variant="destructive"
            size="sm"
            onClick={resetAddTask}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Button
          style={{ width: "100", ...(btnStyles as any) }}
          className="add-task-btn"
          variant="secondary"
          size="sm"
          onClick={() => addNewCard(boardId)}
        >
          Add Card
        </Button>
      )}
    </>
  );
};
