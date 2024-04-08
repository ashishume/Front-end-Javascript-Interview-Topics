import { ITask } from ".";
const TaskCard = ({
  value,
  onDragStart,
  className,
}: // onDragOver,
{
  value: ITask;
  onDragStart: (event: any, item: ITask) => void;
  className: string;
  // onDragOver: (event: any, item: ITask | null) => void;
}) => {
  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, value)}
      // onDragOver={(event) => onDragOver(event, value)}
      className={`trello-task-card ${className}`}
    >
      {value.title}
    </div>
  );
};

export default TaskCard;
