import type { TaskStatusType } from "./taskStatusType"; 
import type { Task } from "./taskType";

export type TaskList = {
  setTaskDetails: React.Dispatch<React.SetStateAction<string | null >>;
  isOpen: boolean;
  toggleTaskDetails: () => void;
  markTask: (id: string, status: TaskStatusType) => void;
  status: string;
  columnClass?: string;
  task: Task;
};