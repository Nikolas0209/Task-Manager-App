import type { TaskSource, Task } from "../types/taskType";
import { moveTaskToHistoryApi } from "../api/moveTaskToHistroryApi";

type MoveTaskProps = {
  taskId: string;
  source: TaskSource;
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export async function moveTaskHistory({ taskId, source, setIsLoading, setTasks, task }: MoveTaskProps): Promise<void> {
  let url: string;

  if(source === 'today'){
    url = 'https://692488a63ad095fb8474968f.mockapi.io/tasks';
  }else if(source === 'tomorrow'){
    url = 'https://692488a63ad095fb8474968f.mockapi.io/tasks-tomorrow';
  }else {
    url = 'https://69288e25b35b4ffc50161e2b.mockapi.io/tasks-in-two-days';
  }
  
  setIsLoading(true);

  try{
   await moveTaskToHistoryApi({url, taskId, task });
   setTasks(prev => prev.filter((task: Task) => task.id !== taskId));
  }
  catch(error){
    console.log('Could not move the task. Please try again later.', error);
  }
  finally{
    setIsLoading(false);
  }
};


