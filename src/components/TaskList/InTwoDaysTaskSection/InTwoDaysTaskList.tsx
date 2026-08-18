import axios from 'axios';
import TaskDetails from '../../TaskDetails/TaskDetails';
import '../TaskList.css';
import { useTaskContext } from '../../../context/useTaskContext';
import { useState } from 'react';
import { moveTaskHistory } from '../../../utils/moveTaskHistory';
import type { TaskList } from '../../../types/taskListType';

function InTwoDaysTaskList({ task, isOpen, toggleTaskDetails,  setTaskDetails, 
  markTask, status }: TaskList) {
  const [isLoading, setIsLoading] = useState <boolean>(false);
  const { tasksInTwoDays } = useTaskContext();
  const { fetchTasks: fetchTasksInTwoDays, setTasks: setTasksInTwoDays } = tasksInTwoDays;

  const handleMoveTaskToHistory = () => {
    return moveTaskHistory({ taskId: task.id, source: 'twoDaysAfter', task, setTasks: setTasksInTwoDays, setIsLoading });
   }

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
       handleMoveTaskToHistory={handleMoveTaskToHistory} isLoading={isLoading}  />
      )
     }
   </li>              
 )
}

export default InTwoDaysTaskList;