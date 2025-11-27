import './TomorrowsTaskList.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import type { Task } from './HomePage'; 

function TomorrowsTaskList(){
  const [todaysTask, setTodaysTask] = useState<Task[]>([]);
  
  useEffect(() => {
    const fetchTasksToday = async(): Promise<void> => {
     try{
      const response = await axios.get('https://692488a63ad095fb8474968f.mockapi.io/tasks-tomorrow');
      setTodaysTask(response.data);
      console.log(response);
     } 
     catch(error){
      console.log("Could not load today's tasks. Please try again later", error);
     }
    } 

    fetchTasksToday();

  }, []);

  return(
    <>
     <li>wash dishes</li>
    </>
  )
}

export default TomorrowsTaskList;