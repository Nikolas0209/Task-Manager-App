import type { Task } from '../../../pages/HomePage';
import axios from 'axios';
import TaskDetails from '../../TaskDetails';
import '../TaskList.css';

type TaskInTwoDays = {
  isOpen: boolean;
  toggleTaskDetails: () => void;
  task: Task;
  fetchTasksInTwoDays: () => Promise<void>;
  setTaskDetails: React.Dispatch<React.SetStateAction<string | null>>;
  markTask: (status: string) => void;
  markedTask: (status: string) => void;
  unmarkedTask: (status: string) => void;
  status: string;
}

function InTwoDaysTaskList({ task, isOpen, toggleTaskDetails, fetchTasksInTwoDays,
 setTaskDetails, markTask, markedTask, unmarkedTask, status }: TaskInTwoDays) {

 const deleteTaskInTwoDays = async(): Promise<void> => {
  try{
   await axios.delete(`https://69288e25b35b4ffc50161e2b.mockapi.io/tasks-in-two-days/${task.id}`);
   setTaskDetails(null);
  } 
  catch(error){
    console.log('Could not delete the task. Please try again later.', error);
  }

  await fetchTasksInTwoDays();
 };

 return(      
   <li>
     <div className="more-info-container">
       <div className={"task-text " +
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
      <TaskDetails task={task} onDelete={deleteTaskInTwoDays} markTask={markTask} markedTask={markedTask}
       unmarkedTask={unmarkedTask} />
      )
     }
   </li>              
 )
}

export default InTwoDaysTaskList;