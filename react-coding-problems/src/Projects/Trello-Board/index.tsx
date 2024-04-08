import { useEffect, useState } from "react";
import "./style.scss";
import { ITasks, IDraggedItem, ITask } from "./models";
import { tasksData } from "./data";
import TaskCard from "./TaskCard";

const dragInitialValue = {
  item: null,
  fromBoardId: null,
  toBoardId: null,
};

const TrelloBoard = () => {
  const [tasks, setTasks] = useState(tasksData);
  const [itemHeight, setItemHeight] = useState(0);
  const [draggedItem, setDraggedItem] = useState(
    dragInitialValue as IDraggedItem
  );

  useEffect(() => {
    /** if any data available in localstorage then fetch */
    const data = localStorage.getItem("tasks");
    if (data && JSON.parse(data)) {
      setTasks(JSON.parse(data));
    }
    return () => {
      localStorage.removeItem("tasks");
    };
  }, []);

  function handleDragStart(e: any, item: ITask, fromBoardId: number) {
    /** store the dragged item */
    setDraggedItem({
      item,
      fromBoardId,
      toBoardId: null,
    });
    setItemHeight(e.target.getBoundingClientRect()?.height);
  }
  function handleDragOver(e: any) {
    e.preventDefault();
    const el = e.target;
    console.log(el.id);
    setDraggedItem((prev) => ({ ...prev, toBoardId: parseInt(el.id) }));
  }

  async function handleDrop(event: any) {
    event.preventDefault();
    const targetBoardId = parseInt(event.target.id);
    /** if the element is dropped in same board id or there is no target id then cancel the event */
    if (targetBoardId === draggedItem.fromBoardId || isNaN(targetBoardId)) {
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

    /** update the latest data to localstorage */
    const stringified = JSON.stringify(updatedTasks);
    localStorage.setItem("tasks", stringified);

    // Reset dragged item state
    await setDraggedItem(dragInitialValue);
  }

  return (
    <div className="trello-board-container">
      <h1 className="text-xl">Trello Board (Clone)</h1>
      <div className="content font-mono">
        {tasks.map(({ boardId, boardName, tasks }) => {
          return (
            <div
              className="task-board"
              key={boardId}
              id={`${boardId}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="font-bold">{boardName}</div>
              {tasks.map((value: ITask) => {
                return (
                  <TaskCard
                    key={value.id}
                    value={value}
                    onDragStart={(e) => handleDragStart(e, value, boardId)}
                    className={`${
                      draggedItem?.item?.id === value.id ? "hide" : ""
                    }`}
                  />
                );
              })}
              {draggedItem.toBoardId === boardId && itemHeight !== 0 ? (
                <div
                  className={`${itemHeight !== 0 ? "dummy-task" : ""}`}
                  style={{
                    height: itemHeight,
                    display: itemHeight !== 0 ? "inline-block" : "none",
                  }}
                ></div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrelloBoard;
