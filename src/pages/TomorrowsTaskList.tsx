import './TomorrowsTaskList.css';
import axios from 'axios';
import { useEffect } from 'react';
import type { Task } from './HomePage';

type TaskToday = {
  task: Task,
  //setTasksTomorrow: React.Dispatch<React.SetStateAction<Task[]>>
}

function TomorrowsTaskList({task}: TaskToday){
  
  /*
  useEffect(() => {
    const fetchTasksTomorrow = async(): Promise<void> => {
     try{
      const response = await axios.get('https://692488a63ad095fb8474968f.mockapi.io/tasks-tomorrow');
      setTasksTomorrow(response.data);
      console.log(response);
     } 
     catch(error){
      console.log("Could not load today's tasks. Please try again later", error);
     }
    } 

    fetchTasksTomorrow();

  }, [setTasksTomorrow]);
*/

  return(
    <>
     <li>
       {task.task}
     </li>
    </>
  )
}

export default TomorrowsTaskList;

