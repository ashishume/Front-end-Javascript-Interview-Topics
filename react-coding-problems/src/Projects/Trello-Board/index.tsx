import { useState } from "react";
import TaskCard from "./TaskCard";
import "./style.scss";
import { ITasks, IDraggedItem, ITask } from "./models";
import { tasksData } from "./data";

const dragInitialValue = {
  item: null,
  fromBoardId: null,
  toBoardId: null,
};

const TrelloBoard = () => {
  const [tasks, setTasks] = useState(tasksData);
  const [draggedItem, setDraggedItem] = useState(
    dragInitialValue as IDraggedItem
  );

  function handleDragStart(item: ITask, fromBoardId: number) {
    /** store the dragged item */
    setDraggedItem({
      item,
      fromBoardId,
      toBoardId: null,
    });
  }
  function handleDragOver(e: any) {
    e.preventDefault();
  }

  async function handleDrop(event: any) {
    event.preventDefault();
    const targetBoardId = parseInt(event.target.id);
    /** if the element is dropped in same board id then cancel the event */
    if (targetBoardId === draggedItem.fromBoardId) {
      setDraggedItem({
        item: null,
        fromBoardId: null,
        toBoardId: null,
      });
      return false;
    }

    const updatedTasks: ITasks[] = tasks.map((taskList) => {
      // If the current task list is the source board, remove the dragged item
      if (taskList.boardId === draggedItem.fromBoardId) {
        return {
          ...taskList,
          tasks: taskList.tasks.filter(
            (task) => task.id !== draggedItem.item?.id
          ),
        };
      }
      // If the current task list is the target board, add the dragged item
      if (taskList.boardId === targetBoardId && draggedItem.item) {
        return {
          ...taskList,
          tasks: [...taskList.tasks, draggedItem.item],
        };
      }
      return taskList; // Return unchanged task list if not source or target board
    });

    // Update state with the modified task list
    await setTasks(updatedTasks);

    // Reset dragged item state
    await setDraggedItem(dragInitialValue);
  }

  return (
    <div className="trello-board-container">
      <h1 className="text-xl">Trello Board (Clone)</h1>
      <div className="content">
        {tasks.map(({ boardId, tasks }) => {
          return (
            <div
              className="task-board"
              key={boardId}
              id={`${boardId}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {tasks.map((value: ITask) => {
                return (
                  <TaskCard
                    key={value.id}
                    value={value}
                    onDragStart={() => handleDragStart(value, boardId)}
                    className={`${
                      draggedItem?.item?.id === value.id ? "hide" : ""
                    }`}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrelloBoard;
