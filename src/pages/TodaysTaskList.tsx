import './TodaysTaskList.css';
import type { Task } from './HomePage';
import axios from 'axios';
import TaskDetails from '../components/TaskDetails';

type TodaysTaskListProp = {
  task: Task,
  setTaskDetails: React.Dispatch<React.SetStateAction<string | null >>,
  fetchTasks: () => Promise<void>,
  isOpen: boolean,
  toggleTaskDetails: () => void
};

function TodaysTaskList({ task, setTaskDetails, fetchTasks, isOpen, toggleTaskDetails }: TodaysTaskListProp){

  const deleteTask = async(): Promise<void> => {
    try{
     await axios.delete(`https://692488a63ad095fb8474968f.mockapi.io/tasks/${task.id}`);
     setTaskDetails(null);
    } catch(error){
      console.log('Could not delete the task. Please try again later.', error);
    }

    await fetchTasks();
  };

 return(
   <li>
    <div className="more-info-button-container">
      <div className="task-text">
         <span className="dash-span"></span>
         {task.task}
      </div>
      <div>
       <button className="more-info-button" onClick={toggleTaskDetails}>
         ...
       </button>
      </div>
    </div>

    {isOpen && (
      <TaskDetails task={task} onDelete={deleteTask}/>
      )
    }
   </li> 
 )
}

export default TodaysTaskList;