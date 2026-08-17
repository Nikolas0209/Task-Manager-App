import { useState, useCallback, useEffect } from "react";
import type { Task } from "../types/taskType";
import axios from "axios";

type TaskType = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useTaskHistory({ setIsLoading }: TaskType){
  const [taskHistory, setTaskHistory] = useState <Task[]>([]);
 
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

  return{ taskHistory, setTaskHistory, deleteHistoryTask }
}

