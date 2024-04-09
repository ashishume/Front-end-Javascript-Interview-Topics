import { useEffect, useState } from "react";
import "./style.scss";
import { tasksData } from "./mock-data/data";
import TaskCard from "./components/TaskCard";
import { IDraggedItem, ITask, ITasks } from "./models/models";
import { ButtonActions } from "./components/button-actions";
import BoardActions from "./components/board-actions";

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
  const [isPointerEventsDisabled, setIsPointerEventsDisabled] = useState(false);
  const [draggedItem, setDraggedItem] = useState(
    dragInitialValue as IDraggedItem
  );
  const [inputActive, setInputActive] = useState(null as number | null);
  const [taskValue, setTaskValue] = useState("");
  const [boardValue, setBoardValue] = useState("");

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
    setIsPointerEventsDisabled(true);
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
    setIsPointerEventsDisabled(false);

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

  /** create new board */
  async function addNewBoard() {
    if (boardValue.trim() !== "") {
      await setTasks((prev) => {
        const newObj = {
          boardName: boardValue,
          boardId: generateUniqueId(),
          tasks: [],
        };
        const newArr = [...prev, newObj];

        /** update localstorage on addition of new board */
        updateLocalStorage(newArr);

        return newArr;
      });

      await resetAddTask();
    }
  }

  /** update localstorage with new data */
  function updateLocalStorage(updatedTasks: ITasks[]) {
    /** update the latest data to localstorage */
    const stringified = JSON.stringify(updatedTasks);
    localStorage.setItem("tasks", stringified);
  }

  /**
   * add new card in the board
   * @param boardId
   */
  function addNewCard(boardId: number) {
    //clear any previous values then show new input field
    setTaskValue("");
    setInputActive(boardId);
  }

  /**
   * add new task with title value
   * @param boardId
   */
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

  /** reset after adding new task or board name */
  async function resetAddTask() {
    await setTaskValue("");
    await setInputActive(null);
    await setBoardValue("");
  }

  /** generate random id  */
  function generateUniqueId(): number {
    return Math.floor(Math.random() * 1000000000) + 1;
  }

  return (
    <div className="trello-board-container">
      <h1 className="text-xl text-white">Axpo board</h1>
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
                    isPointerEventsDisabled={isPointerEventsDisabled}
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

              <ButtonActions
                isPointerEventsDisabled={isPointerEventsDisabled}
                inputActive={inputActive}
                boardId={boardId}
                updateTaskValue={(e) => setTaskValue(e.target.value)}
                taskValue={taskValue}
                addNewTask={addNewTask}
                resetAddTask={resetAddTask}
                addNewCard={addNewCard}
              />
            </div>
          );
        })}

        <BoardActions
          inputActive={inputActive}
          addNewBoard={addNewBoard}
          tasks={tasks}
          boardValue={boardValue}
          setBoardValue={setBoardValue}
          setInputActive={setInputActive}
        />
      </div>
    </div>
  );
};

export default TrelloBoard;
