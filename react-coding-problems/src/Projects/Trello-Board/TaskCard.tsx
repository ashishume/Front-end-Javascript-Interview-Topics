import { ITask } from "./models";

const TaskCard = ({
  value,
  onDragStart,
  className,
}: {
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
      {value.id}: {value.title}
    </div>
  );
};

export default TaskCard;
