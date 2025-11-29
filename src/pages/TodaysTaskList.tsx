import './TodaysTaskList.css';
import type { Task } from './HomePage';
import axios from 'axios';
import bin from '../assets/bin.png';

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
      <div className="task-details">
        <div className="task-state-container">
          Select status:
          <div>
            <button className="finished-task">✅</button>
            <button className="unfinished-task">❌</button>
          </div>
       </div>
        Assigned on: {new Date(task.createdAt).toLocaleDateString()}
       <div className="delete-task-container">
          Delete Task:
          <button className="delete-task-button" onClick={deleteTask}>
            <img src={bin} className="bin-image"/>
          </button>
        </div>
      </div> 
      )
    }
   </li> 
 )
}

export default TodaysTaskList;