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
  return (
    <>
      {inputActive === boardId ? (
        <InputField onChange={updateTaskValue} value={taskValue} />
      ) : null}
      {inputActive !== null && inputActive === boardId ? (
        <>
          <Button
            style={{
              pointerEvents: isPointerEventsDisabled ? "none" : "auto",
              display: isPointerEventsDisabled ? "block" : "inline-block",
            }}
            className="add-task-btn"
            variant="secondary"
            size="sm"
            disabled={!taskValue.trim()}
            onClick={() => addNewTask(boardId)} // add pointer events and also make the button work (find another way)
          >
            Add task
          </Button>
          <Button
            style={{
              pointerEvents: isPointerEventsDisabled ? "none" : "auto",
              display: isPointerEventsDisabled ? "block" : "inline-block",
            }}
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
          style={{
            width: "100%",
            pointerEvents: isPointerEventsDisabled ? "none" : "auto",
          }}
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
