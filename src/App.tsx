import './App.css'
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskHistory from './pages/TaskHistory';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export type Task = {
  createdAt: Date;
  task: string;
  isFinished: boolean;
  id: string;
  localId: string;
}

function App(){
  const [tasksToday, setTasksToday] = useState<Task[]>([]);
  const [tasksTomorrow, setTasksTomorrow] = useState<Task[]>([]);
  const [tasksInTwoDays, setTasksInTwoDays] = useState<Task[]>([]);

  const fetchTasksToday = useCallback(async(): Promise<void> => {
    try{
      const response = await axios.get('https://692488a63ad095fb8474968f.mockapi.io/tasks');
     
      const tasksWithLocalId = response.data.map((task: Task) => ({
        ...task,
        localId: crypto.randomUUID()
      }))
      setTasksToday(tasksWithLocalId);

    } catch(error){
      console.log("Cannot load the today's data. Please try again later.", error);
    }
  },[]);


  const fetchTasksTomorrow = useCallback(async(): Promise<void> => {
    try{
     const response = await axios.get('https://692488a63ad095fb8474968f.mockapi.io/tasks-tomorrow');

     const tasksWithLocalId = response.data.map((task: Task) => ({
      ...task,
      localId: crypto.randomUUID()
     }))
     setTasksTomorrow(tasksWithLocalId);

    } 
    catch(error){
     console.log("Could not load tomorrow's tasks. Please try again later", error);
    }
  }, []);


  const fetchTasksInTwoDays = useCallback(async(): Promise<void> => {
    try{
      const response = await axios.get('https://69288e25b35b4ffc50161e2b.mockapi.io/tasks-in-two-days');

      const tasksWithLocalId = response.data.map((task: Task) => ({
        ...task,
        localId: crypto.randomUUID()
      }))
      setTasksInTwoDays(tasksWithLocalId);

    }
    catch(error){
      console.log('Could not load tasks for the next two days. Please try again later.', error);
    }
  }, []);

  useEffect(() => {
   fetchTasksToday();
   fetchTasksTomorrow();
   fetchTasksInTwoDays();
  }, [fetchTasksToday, fetchTasksTomorrow, fetchTasksInTwoDays]);
 
  return (
    <BrowserRouter>
     <Routes>
       <Route index element={<HomePage tasksToday={tasksToday} tasksTomorrow={tasksTomorrow} 
         tasksInTwoDays={tasksInTwoDays} fetchTasksToday={fetchTasksToday} 
         fetchTasksTomorrow={fetchTasksTomorrow} fetchTasksInTwoDays={fetchTasksInTwoDays} />} />
       <Route path='/task-history' element={<TaskHistory />} />
     </Routes>
    </BrowserRouter>
  )
}

export default App;
