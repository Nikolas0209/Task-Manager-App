import './App.css'
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskHistory from './pages/TaskHistory';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { Task } from './types/taskType';

function App(){
  const [tasksToday, setTasksToday] = useState <Task[]>([]);
  const [tasksTomorrow, setTasksTomorrow] = useState <Task[]>([]);
  const [tasksInTwoDays, setTasksInTwoDays] = useState <Task[]>([]);
  const [taskHistory, setTaskHistory] = useState <Task[]>([]);
  const [isLoading, setIsLoading] = useState <boolean>(false);

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

  const fetchTaskHistoryTasks = useCallback(async(): Promise<void> => {
    try{
      const response = await axios.get('https://69288e25b35b4ffc50161e2b.mockapi.io/task-history');
      setTaskHistory(response.data);
    }
    catch(error){
      console.log('Could not load task history. Please try again later.', error);
    }
  }, []);

  useEffect(() => {
   fetchTasksToday();
   fetchTasksTomorrow();
   fetchTasksInTwoDays();
   fetchTaskHistoryTasks();
  }, [fetchTasksToday, fetchTasksTomorrow, fetchTasksInTwoDays, fetchTaskHistoryTasks]);

  const moveTodaysTaskToHistory = async(taskId: string): Promise<void> => {
    const moveTask = tasksToday.find((foundTask: Task) => foundTask.id === taskId);
    if(!moveTask) return;

    setIsLoading(true);

    try{
     const response = await axios.post('https://69288e25b35b4ffc50161e2b.mockapi.io/task-history', moveTask);
     const newHistoryTask = response.data;

     await axios.delete(`https://692488a63ad095fb8474968f.mockapi.io/tasks/${taskId}`);

     setTaskHistory(prev => [...prev, newHistoryTask]);
     setTasksToday(prev => prev.filter((task: Task) => task.id !== taskId));
    } 
    catch(error){
      console.log('Could not move the task. Please try again later.', error);
    }
    finally{
      setIsLoading(false);
    }
  };

  const moveTomorrowsTaskToHistory = async(taskId: string): Promise<void> => {
    const moveTask = tasksTomorrow.find((foundTask: Task) => taskId === foundTask.id);
    if(!moveTask) return;

    setIsLoading(true);

    try{
     const response = await axios.post('https://69288e25b35b4ffc50161e2b.mockapi.io/task-history', moveTask);
     const newHistoryTask = response.data;

     await axios.delete(`https://692488a63ad095fb8474968f.mockapi.io/tasks-tomorrow/${taskId}`);
   
     setTaskHistory(prev => [...prev, newHistoryTask]);
     setTasksTomorrow(prev => prev.filter((task: Task) => task.id !== taskId));
    }
    catch(error){
      console.log('Could not move the task. Please try again later.', error);
    }
    finally{
      setIsLoading(false);
    }
  };

  const moveTaskInTwoDaysToHistory = async(taskId: string): Promise<void> => {
    const moveTask = tasksInTwoDays.find((foundTask: Task) => taskId === foundTask.id);
    if(!moveTask) return;

    setIsLoading(true);

    try{
     const response = await axios.post('https://69288e25b35b4ffc50161e2b.mockapi.io/task-history', moveTask);
     const newHistoryTask = response.data;

     await axios.delete(`https://69288e25b35b4ffc50161e2b.mockapi.io/tasks-in-two-days/${taskId}`);

     setTaskHistory(prev => [...prev, newHistoryTask]);
     setTasksInTwoDays(prev => prev.filter((task: Task) => task.id !== taskId));
    }
    catch(error){
      console.log('Could not move the task. Please try again later.', error);
    }
    finally{
      setIsLoading(false);
    }
  };

  const deleteHistoryTask = async(taskId: string): Promise<void> => {
    setIsLoading(true);

    try{
      await axios.delete(`https://69288e25b35b4ffc50161e2b.mockapi.io/task-history/${taskId}`);
      await fetchTaskHistoryTasks();
    }
    catch(error){
      console.log('Could not delete the task. Please try again later.', error);
    } 
    finally{
      setIsLoading(false);
    } 
  };

  return (
    <BrowserRouter>
     <Routes>
       <Route index element={<HomePage tasksToday={tasksToday} tasksTomorrow={tasksTomorrow} 
         tasksInTwoDays={tasksInTwoDays} fetchTasksToday={fetchTasksToday} 
         fetchTasksTomorrow={fetchTasksTomorrow} fetchTasksInTwoDays={fetchTasksInTwoDays} 
         moveTaskToHistory={{
          today: moveTodaysTaskToHistory,
          tomorrow: moveTomorrowsTaskToHistory,
          twoDaysAfter: moveTaskInTwoDaysToHistory
          }} isLoading={isLoading} />} />
       <Route path='/task-history' element={<TaskHistory taskHistory={taskHistory} 
         deleteHistoryTask={deleteHistoryTask} isLoading={isLoading}/>} />
     </Routes>
    </BrowserRouter>
  )
}

export default App;
