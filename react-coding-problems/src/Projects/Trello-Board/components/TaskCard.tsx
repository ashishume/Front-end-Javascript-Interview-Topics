import { memo } from "react";
import { ITask } from "../models/models";

const TaskCard = memo(
  ({
    value,
    onDragStart,
    className,
    handleDoubleClick,
  }: {
    handleDoubleClick: () => void;
    value: ITask;
    onDragStart: (event: any, item: ITask) => void;
    className: string;
  }) => {
    return (
      <div
        draggable
        onDoubleClick={handleDoubleClick}
        onDragStart={(event) => onDragStart(event, value)}
        className={`trello-task-card ${className}`}
      >
        {value.title}
      </div>
    );
  }
);

TaskCard.displayName = "TaskCard";

export default TaskCard;
