import { useState, useCallback, useEffect } from "react";
import type { Task } from "../types/taskType";
import axios from "axios";

export type TaskSource = 'today' | 'tomorrow' | 'twoDaysAfter';

type TaskType = {
  tasksToday: Task[];
  tasksTomorrow: Task[];
  tasksInTwoDays: Task[];
  setTasksToday: React.Dispatch<React.SetStateAction<Task[]>>;
  setTasksTomorrow: React.Dispatch<React.SetStateAction<Task[]>>;
  setTasksInTwoDays: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function useTaskHistory({ tasksToday, tasksTomorrow, tasksInTwoDays, setTasksToday, setTasksTomorrow, setTasksInTwoDays}: TaskType){
  const [taskHistory, setTaskHistory] = useState <Task[]>([]);
  const [isLoading, setIsLoading] = useState <boolean>(false);

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
   fetchTaskHistoryTasks();
  }, [fetchTaskHistoryTasks]);

  const moveTaskToHistory = async(taskId: string, source:TaskSource): Promise<void> => {
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
     const response = await axios.post('https://69288e25b35b4ffc50161e2b.mockapi.io/task-history', moveTask);
     const newHistoryTask = response.data;
  
     await axios.delete(`${url}/${taskId}`);
  
     setTaskHistory(prev => [...prev, newHistoryTask]);
     setTasks(prev => prev.filter((task: Task) => task.id !== taskId));
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

  return{ taskHistory, setTaskHistory, moveTaskToHistory, isLoading, deleteHistoryTask }
}

