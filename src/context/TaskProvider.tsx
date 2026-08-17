import { useTasks } from '../hooks/useTasks';
import { TaskContext } from './TaskContext';

export function TaskProvider({ children }: { children: React.ReactNode }){
  const tasksToday = useTasks(
    'https://692488a63ad095fb8474968f.mockapi.io/tasks'
  );

  const tasksTomorrow = useTasks(
    'https://692488a63ad095fb8474968f.mockapi.io/tasks-tomorrow'
  );

  const tasksInTwoDays = useTasks(
    'https://69288e25b35b4ffc50161e2b.mockapi.io/tasks-in-two-days'
  );

  return(
    <TaskContext.Provider value={{ tasksToday, tasksTomorrow, tasksInTwoDays }}>
      {children}
     </TaskContext.Provider> 
  )
}