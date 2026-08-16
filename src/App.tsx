import './App.css'
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskHistory from './pages/TaskHistory';
import { useTasks } from './hooks/useTasks';
import { useTaskHistory } from './hooks/useTaskHistory';

function App(){
  const { tasks: tasksToday, setTasks: setTasksToday, fetchTasks: fetchTasksToday } = 
   useTasks('https://692488a63ad095fb8474968f.mockapi.io/tasks');
  const { tasks: tasksTomorrow, setTasks: setTasksTomorrow, fetchTasks: fetchTasksTomorrow } = 
   useTasks('https://692488a63ad095fb8474968f.mockapi.io/tasks-tomorrow');
  const { tasks: tasksInTwoDays, setTasks: setTasksInTwoDays, fetchTasks: fetchTasksInTwoDays } = 
   useTasks('https://69288e25b35b4ffc50161e2b.mockapi.io/tasks-in-two-days');
  const { taskHistory, moveTaskToHistory, isLoading, deleteHistoryTask } = useTaskHistory({
    tasksToday, 
    tasksTomorrow,
    tasksInTwoDays,
    setTasksToday, 
    setTasksTomorrow,
    setTasksInTwoDays
  });

  return (
    <BrowserRouter>
     <Routes>
       <Route index element={<HomePage tasksToday={tasksToday} fetchTasksToday={fetchTasksToday} 
         tasksTomorrow={tasksTomorrow} tasksInTwoDays={tasksInTwoDays} fetchTasksTomorrow={fetchTasksTomorrow}
         fetchTasksInTwoDays={fetchTasksInTwoDays} moveTaskToHistory={moveTaskToHistory} isLoading={isLoading} />} />
       <Route path='/task-history' element={<TaskHistory taskHistory={taskHistory} 
         deleteHistoryTask={deleteHistoryTask} isLoading={isLoading}/>} />
     </Routes>
    </BrowserRouter>
  )
}

export default App;
