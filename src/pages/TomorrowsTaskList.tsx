import './TaskList.css';
import type { Task } from './HomePage';
import axios from 'axios';
import TaskDetails from '../components/TaskDetails';

type TaskTomorrow = {
  task: Task;
  isOpen: boolean;
  setTaskDetails: React.Dispatch<React.SetStateAction<string | null>>;
  toggleTaskDetails: () => void;
  fetchTasksTomorrow: () => Promise<void>;
  markTask: (status: string) => void;
  markedTask: (status: string) => void;
  unmarkedTask: (status: string) => void;
  status: string;
}

function TomorrowsTaskList({ task, isOpen, toggleTaskDetails, setTaskDetails, fetchTasksTomorrow, 
   markTask, markedTask, unmarkedTask, status }: TaskTomorrow){

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
    <div className="more-info-container">
     <div className={
        "task-text " +
         (status === "marked"
           ? "marked-task"
           : status === "unmarked"
           ? "unmarked-task"
           : "not-marked-task"
          )}>
           {task.task}
      </div>
      <div>
        <button className="more-info-button" onClick={toggleTaskDetails}>
        ...
        </button>
      </div>
    </div>

    {isOpen && (
      <TaskDetails task={task} onDelete={deleteTaskTomorrow} markTask={markTask} markedTask={markedTask} 
       unmarkedTask={unmarkedTask} />
     )
    }
   </li> 
  )
}

export default TomorrowsTaskList;

