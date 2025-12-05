import type { Task } from './HomePage';
import axios from 'axios';
import TaskDetails from '../components/TaskDetails';
import './TaskList.css';

type TaskTomorrow = {
  isOpen: boolean,
  toggleTaskDetails: () => void,
  tasksYesterday: Task[],
  task: Task,
  fetchTasksYesterday: () => Promise<void>,
  setTaskDetails: React.Dispatch<React.SetStateAction<string | null>>
}

function YesterdaysTaskList({ task, isOpen, toggleTaskDetails, fetchTasksYesterday,
  setTaskDetails
 }: TaskTomorrow) {

 const deleteTaskYesterday = async(): Promise<void> => {
  try{
   await axios.delete(`https://69288e25b35b4ffc50161e2b.mockapi.io/tasks-yesterday/${task.id}`);
   setTaskDetails(null);
  } 
  catch(error){
    console.log('Could not delete the task. Please try again later.', error);
  }

  await fetchTasksYesterday();
 };

 return(      
   <li>
     <div className="more-info-button-container">
       <div className="task-text">{task.task}</div> 
       <div>
         <button className="more-info-button" onClick={toggleTaskDetails}>
         ...
         </button>
       </div>
  
     </div>
     {isOpen && (
      <TaskDetails task={task} onDelete={deleteTaskYesterday} />
      )
     }
   </li>              
 )
}

export default YesterdaysTaskList;