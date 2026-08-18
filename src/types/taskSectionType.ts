import type { TaskStatusType } from "./taskStatusType";

export type TaskSection = {
  taskDetails: string | null;
  setTaskDetails: React.Dispatch<React.SetStateAction<string | null>>;
  taskStatus: Record<string, TaskStatusType>;
  markTask: (id:string, status: TaskStatusType) => void;
 };