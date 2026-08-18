import '../TaskList.css';
import axios from 'axios';
import TaskDetails from '../../TaskDetails/TaskDetails';
import { useTaskContext } from '../../../context/useTaskContext';
import { useState } from 'react';
import { moveTaskHistory } from '../../../utils/moveTaskHistory';
import type { TaskList } from '../../../types/taskListType';

function TomorrowsTaskList({ task, isOpen, toggleTaskDetails, setTaskDetails,  
  markTask, status }: TaskList){
  const [isLoading, setIsLoading] = useState <boolean>(false);
  const { tasksTomorrow } = useTaskContext();
  const { fetchTasks: fetchTasksTomorrow, setTasks: setTasksTomorrow } = tasksTomorrow;

  const handleMoveTaskToHistory = () => {
    return moveTaskHistory({ taskId: task.id, source: 'tomorrow', task, setTasks: setTasksTomorrow, setIsLoading });
   }

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
      <TaskDetails task={task} onDelete={deleteTaskTomorrow} markTask={markTask} 
        handleMoveTaskToHistory={handleMoveTaskToHistory} isLoading={isLoading} />
     )
    }
   </li> 
  )
}

export default TomorrowsTaskList;

