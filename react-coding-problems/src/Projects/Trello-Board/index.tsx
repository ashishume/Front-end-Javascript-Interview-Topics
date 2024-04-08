import { useState } from "react";
import TaskCard from "./TaskCard";
import "./style.scss";

export interface ITasks {
  todo: ITask[];
  pending: ITask[];
  completed: ITask[];
}
export interface ITask {
  id: number;
  title: string;
  description: string;
  author: string;
  createdAt: string;
}
export interface IDraggedItem {
  item: ITask | null;
  parentContainer: string;
}

export enum TaskClassNames {
  pending = "pending-tasks",
  todo = "todo-tasks",
  completed = "completed-tasks",
}
const TrelloBoard = () => {
  const tasksData: ITasks = {
    todo: [
      {
        id: 1,
        title:
          " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt",
        description: "",
        author: "",
        createdAt: "",
      },
      {
        id: 2,
        title: "Animi esse voluptatum possimus p",
        description: "",
        author: "",
        createdAt: "",
      },
      {
        id: 3,
        title: "llum reiciendis ipsam dolorem ",
        description: "",
        author: "",
        createdAt: "",
      },
      {
        id: 10,
        title: "My self Ashish Debnath",
        description: "",
        author: "",
        createdAt: "",
      },
    ],
    pending: [
      {
        id: 4,
        title: " Lorem ipsum, ectetur adipisicing elit. Deserunt",
        description: "",
        author: "",
        createdAt: "",
      },
      {
        id: 5,
        title: "Animi esse voluptatum possimus p",
        description: "",
        author: "",
        createdAt: "",
      },
      {
        id: 6,
        title: "llum ripsam dolorem ",
        description: "",
        author: "",
        createdAt: "",
      },
    ],
    completed: [
      {
        id: 7,
        title: " Lorem ipsum, dolor dipisicing elit. Deserunt",
        description: "",
        author: "",
        createdAt: "",
      },
      {
        id: 8,
        title: "Animi esse volupta p",
        description: "",
        author: "",
        createdAt: "",
      },
      {
        id: 9,
        title: "llum reicie dolorem ",
        description: "",
        author: "",
        createdAt: "",
      },
    ],
  };

  const [tasks, setTasks] = useState(tasksData);
  const [draggedItem, setDraggedItem] = useState({
    item: null,
    parentContainer: "",
  } as IDraggedItem);

  function handleDragStart(e: any, item: ITask) {
    setDraggedItem({
      item,
      parentContainer: e.nativeEvent.target.parentNode.className,
    });
  }
  function handleDragOver(e: any) {
    e.preventDefault();
  }
  
  function handleDrop(e: any) {
    e.preventDefault();
    if (e.target.className === TaskClassNames.pending && draggedItem.item) {
      console.log("on drop", draggedItem);
      setTasks((prevTasks: ITasks) => {
        if (draggedItem.parentContainer === TaskClassNames.todo) {
          const newArr = prevTasks.todo.filter(
            (val) => val.id !== draggedItem.item?.id
          );
          prevTasks.todo = newArr;
          prevTasks.pending.push(draggedItem.item as any);
        }
        return prevTasks;
      });
      setDraggedItem({
        item: null,
        parentContainer: "",
      });
    }
  }
  return (
    <div className="trello-board-container">
      <h1 className="text-xl">Trello Board</h1>
      <div className="content">
        {Object.keys(tasks).map((key) => {
          return (
            <div
              className={
                key === "todo"
                  ? TaskClassNames.todo
                  : key === "pending"
                  ? TaskClassNames.pending
                  : TaskClassNames.completed
              }
              key={key}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {tasks[key as keyof ITasks].map((value: ITask) => {
                return (
                  <TaskCard
                    key={value.id}
                    value={value}
                    onDragStart={handleDragStart}
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
