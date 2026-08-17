import { createContext } from 'react';
import { useTasks } from '../hooks/useTasks';

export type TaskContextType = {
  tasksToday: ReturnType<typeof useTasks>;
  tasksTomorrow: ReturnType<typeof useTasks>;
  tasksInTwoDays: ReturnType<typeof useTasks>;
}

export const TaskContext = createContext<TaskContextType | null>(null);


