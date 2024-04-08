export interface ITasks {
  boardId: number;
  tasks: ITask[];
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
  fromBoardId: number | null;
  toBoardId: number | null;
}
export enum TaskClassNames {
  ongoing = "ongoing-tasks",
  todo = "todo-tasks",
  completed = "completed-tasks",
}
