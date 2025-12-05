import './TaskList.css';
import type { Task } from './HomePage';
import axios from 'axios';
import TaskDetails from '../components/TaskDetails';

type TaskToday = {
  task: Task,
  isOpen: boolean
  setTaskDetails: React.Dispatch<React.SetStateAction<string | null>>,
  toggleTaskDetails: () => void,
  fetchTasksTomorrow: () => Promise<void>
}

function TomorrowsTaskList({ task, isOpen, toggleTaskDetails, setTaskDetails, fetchTasksTomorrow }: TaskToday){
  const deleteTaskTomorrow = async (): Promise<void>  => {
    try{
      await axios.delete(`https://692488a63ad095fb8474968f.mockapi.io/tasks-tomorrow/${task.id}`);
     setTaskDetails(null);
    }
    catch(error){
     console.log('Could not delete the task. Please try again later.', error);
    }
   
     await fetchTasksTomorrow();
   }

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
      <TaskDetails task={task} onDelete={deleteTaskTomorrow} />
     )
    }
   </li> 
  )
}

export default TomorrowsTaskList;

