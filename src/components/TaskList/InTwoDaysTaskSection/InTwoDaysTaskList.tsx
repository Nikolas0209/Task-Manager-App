import type { Task, TaskSource } from '../../../types/taskType';
import axios from 'axios';
import TaskDetails from '../../TaskDetails/TaskDetails';
import '../TaskList.css';
import type { TaskStatusType } from '../../../types/taskStatusType';

type TaskInTwoDays = {
  isOpen: boolean;
  toggleTaskDetails: () => void;
  task: Task;
  fetchTasksInTwoDays: () => Promise<void>;
  setTaskDetails: React.Dispatch<React.SetStateAction<string | null>>;
  markTask: (id: string, status: TaskStatusType) => void;
  status: string;
  moveTaskToHistory: (taskId: string, source: TaskSource) => void;
  isLoading: boolean
}

function InTwoDaysTaskList({ task, isOpen, toggleTaskDetails, fetchTasksInTwoDays,
 setTaskDetails, markTask, status, moveTaskToHistory, isLoading }: TaskInTwoDays) {

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
      <TaskDetails task={task} onDelete={deleteTaskInTwoDays} markTask={markTask} 
       moveTaskToHistory={moveTaskToHistory} isLoading={isLoading} source='twoDaysAfter' />
      )
     }
   </li>              
 )
}

export default InTwoDaysTaskList;