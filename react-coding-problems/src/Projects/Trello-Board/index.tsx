import { useEffect, useState } from "react";
import "./style.scss";
import { ITasks, IDraggedItem, ITask } from "./models";
import { tasksData } from "./data";
import TaskCard from "./TaskCard";
import { Button } from "@/components/ui/button";
import InputField from "./Input";

/**
 * TODO: tasks should be able to add at the middle of the board (currently can only be added at the bottom)
 */
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
  const [inputActive, setInputActive] = useState(null as number | null);
  const [taskValue, setTaskValue] = useState("");

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

  /**
   * drag event handler
   * @param e drag event
   * @param item dragged item
   * @param fromBoardId source board id
   */
  function handleDragStart(e: any, item: ITask, fromBoardId: number) {
    /** store the dragged item */
    setDraggedItem({
      item,
      fromBoardId,
      toBoardId: null,
    });
    setItemHeight(e.target.getBoundingClientRect()?.height);
  }

  /**
   * handle drag movement
   * @param e drag event
   */
  function handleDragOver(e: any) {
    e.preventDefault();
    const el = e.target;
    /** while dragging set the target container */
    setDraggedItem((prev) => ({ ...prev, toBoardId: parseInt(el.id) }));
  }

  /**
   * on drop of the dragged element
   * @param event drag event
   * @returns
   */
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
    updateLocalStorage(updatedTasks);
    // Reset dragged item state
    await setDraggedItem(dragInitialValue);
  }

  function addNewBoard() {
    setTasks((prev) => {
      const newObj = {
        boardName: "Random board", // TODO: add via input field
        boardId: generateUniqueId(),
        tasks: [],
      };
      const newArr = [...prev, newObj];

      /** update localstorage on addition of new board */
      updateLocalStorage(newArr);

      return newArr;
    });
  }

  function updateLocalStorage(updatedTasks: ITasks[]) {
    /** update the latest data to localstorage */
    const stringified = JSON.stringify(updatedTasks);
    localStorage.setItem("tasks", stringified);
  }

  function addNewCard(boardId: number) {
    //clear any previous values then show new input field
    setTaskValue("");
    setInputActive(boardId);
  }

  async function addNewTask(boardId: number) {
    if (taskValue.trim() !== "") {
      const newTasks = tasks.map((task) => {
        if (boardId === task.boardId) {
          task.tasks.push({
            id: generateUniqueId(),
            title: taskValue,
            description: "",
            author: "Ashish",
            createdAt: new Date().toLocaleDateString(),
          });
        }
        return task;
      });

      await setTasks(newTasks);
      await resetAddTask();
    }
  }


  async function resetAddTask() {
    await setTaskValue("");
    await setInputActive(null);
  }

  function generateUniqueId(): number {
    return Math.floor(Math.random() * 1000000000) + 1;
  }
  function updateTaskValue(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTaskValue(e.target.value);
  }
  return (
    <div className="trello-board-container">
      <h1 className="text-xl text-white">Trello Board (Clone)</h1>
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
              <div className="font-bold text-white">{boardName}</div>
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
              {inputActive === boardId ? (
                <InputField onChange={updateTaskValue} value={taskValue} />
              ) : null}
              {inputActive !== null && inputActive === boardId ? (
                <>
                  <Button
                    className="add-task-btn"
                    variant="secondary"
                    size="sm"
                    disabled={!taskValue.trim()}
                    onClick={() => addNewTask(boardId)} // add pointer events and also make the button work (find another way)
                  >
                    Add task
                  </Button>
                  <Button
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
                  className="add-task-btn"
                  variant="secondary"
                  size="sm"
                  onClick={() => addNewCard(boardId)}
                >
                  Add Card
                </Button>
              )}
            </div>
          );
        })}
        <div>
          <Button variant="outline" size="sm" onClick={addNewBoard}>
            + Add Board
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrelloBoard;
