import { ITask } from "../models/models";

const TaskCard = ({
  value,
  onDragStart,
  className,
  isPointerEventsDisabled,
}: {
  isPointerEventsDisabled: boolean;
  value: ITask;
  onDragStart: (event: any, item: ITask) => void;
  className: string;
}) => {
  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, value)}
      className={`trello-task-card ${className}`}
    >
      {value.title}
    </div>
  );
};

export default TaskCard;