import './App.css'
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskHistory from './pages/TaskHistory';
import { useTasks } from './hooks/useTasks';
import { useState } from 'react';
import type { Task, TaskSource } from './types/taskType';
import { moveTaskToHistoryApi } from './api/moveTaskToHistroryApi';

function App(){
  const [isLoading, setIsLoading] = useState <boolean>(false);
  const { tasks: tasksToday, setTasks: setTasksToday, fetchTasks: fetchTasksToday } = 
   useTasks('https://692488a63ad095fb8474968f.mockapi.io/tasks');
  const { tasks: tasksTomorrow, setTasks: setTasksTomorrow, fetchTasks: fetchTasksTomorrow } = 
   useTasks('https://692488a63ad095fb8474968f.mockapi.io/tasks-tomorrow');
  const { tasks: tasksInTwoDays, setTasks: setTasksInTwoDays, fetchTasks: fetchTasksInTwoDays } = 
   useTasks('https://69288e25b35b4ffc50161e2b.mockapi.io/tasks-in-two-days');

  const moveTaskToHistory = async(taskId: string, source: TaskSource): Promise<void> => {
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

  return (
    <BrowserRouter>
     <Routes>
       <Route index element={<HomePage tasksToday={tasksToday} fetchTasksToday={fetchTasksToday} 
         tasksTomorrow={tasksTomorrow} tasksInTwoDays={tasksInTwoDays} fetchTasksTomorrow={fetchTasksTomorrow}
         fetchTasksInTwoDays={fetchTasksInTwoDays} moveTaskToHistory={moveTaskToHistory} isLoading={isLoading} />} />
       <Route path='/task-history' element={<TaskHistory />} />
     </Routes>
    </BrowserRouter>
  )
}

export default App;
