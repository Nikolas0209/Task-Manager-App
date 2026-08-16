import { useCallback, useEffect, useState } from "react";
import type { Task } from "../types/taskType";
import axios from "axios";

export function useTasks(url: string){
  const [task, setTask] = useState<Task[]>([]);

  const fetchTasks = useCallback (async() => {
   try{
    const response = await axios.get<Task[]>(url);
    setTask(response.data);
   }catch(error){
    console.log('Could not fetch the data', error)
   }
  }, [url]);

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks]);

  return {task, fetchTasks}
}