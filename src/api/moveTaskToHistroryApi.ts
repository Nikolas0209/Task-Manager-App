import type { Task } from "../types/taskType"
import axios from "axios";
 
type MoveTaskToHistory = {
  task: Task,
  taskId: string,
  url: string
}

export async function moveTaskToHistoryApi({ task, taskId, url }: MoveTaskToHistory): Promise<Task> {
 try{
  const response = await axios.post('https://69288e25b35b4ffc50161e2b.mockapi.io/task-history', task);
  const newHistoryTask = response.data;

  await axios.delete(`${url}/${taskId}`);
  return newHistoryTask;
 } catch(error){
  console.log('Could not move the task. Please try again later.', error);
  throw error
 }
}

