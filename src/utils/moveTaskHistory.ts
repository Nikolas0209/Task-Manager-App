import type { TaskSource, Task } from "../types/taskType";
import { moveTaskToHistoryApi } from "../api/moveTaskToHistroryApi";

type MoveTaskProps = {
  taskId: string;
  source: TaskSource;
  tasksToday: Task[];
  tasksTomorrow: Task[];
  tasksInTwoDays: Task[];
  setTasksToday: React.Dispatch<React.SetStateAction<Task[]>>;
  setTasksTomorrow: React.Dispatch<React.SetStateAction<Task[]>>;
  setTasksInTwoDays: React.Dispatch<React.SetStateAction<Task[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export async function moveTaskHistory({ taskId, source, tasksToday, tasksTomorrow, tasksInTwoDays,
  setTasksInTwoDays, setTasksToday, setTasksTomorrow, setIsLoading
 }: MoveTaskProps): Promise<void> {
  let tasks: Task[];
  let setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  let url: string;

  if(source === 'today'){
    tasks = tasksToday;
    setTasks = setTasksToday;
    url = 'https://692488a63ad095fb8474968f.mockapi.io/tasks';
  }else if(source === 'tomorrow'){
    tasks = tasksTomorrow;
    setTasks = setTasksTomorrow;
    url = 'https://692488a63ad095fb8474968f.mockapi.io/tasks-tomorrow';
  }else {
    tasks = tasksInTwoDays;
    setTasks = setTasksInTwoDays;
    url = 'https://69288e25b35b4ffc50161e2b.mockapi.io/tasks-in-two-days';
  }

  const moveTask = tasks.find((foundTask: Task) => taskId === foundTask.id);
  if(!moveTask) return;

  setIsLoading(true);

  try{
   await moveTaskToHistoryApi({url, taskId, task: moveTask});
   setTasks(prev => prev.filter((task: Task) => task.id !== taskId));
  }
  catch(error){
    console.log('Could not move the task. Please try again later.', error);
  }
  finally{
    setIsLoading(false);
  }
};


