import '../TaskList.css';
import axios from 'axios';
import TaskDetails from '../../TaskDetails/TaskDetails';
import { useTaskContext } from '../../../context/useTaskContext';
import { moveTaskHistory } from '../../../utils/moveTaskHistory';
import { useState } from 'react';
import type { TaskList } from '../../../types/taskListType';

function TodaysTaskList({task, setTaskDetails, isOpen, toggleTaskDetails, markTask, 
  status, columnClass }: TaskList){
  const [isLoading, setIsLoading] = useState <boolean>(false);  
  const { tasksToday } = useTaskContext();
  const { fetchTasks: fetchTasksToday, setTasks: setTasksToday } = tasksToday;

  const handleMoveTaskToHistory = () => {
    return moveTaskHistory({ taskId: task.id, source: 'today', task, setTasks: setTasksToday, setIsLoading });
   }
  
  const deleteTask = async(): Promise<void> => {
    try{
     await axios.delete(`https://692488a63ad095fb8474968f.mockapi.io/tasks/${task.id}`);
     setTaskDetails(null);
    } catch(error){
      console.log('Could not delete the task. Please try again later.', error);
    }

    await fetchTasksToday();
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
      <TaskDetails task={task} onDelete={deleteTask} markTask={markTask} isLoading={isLoading}
        columnClass={columnClass} handleMoveTaskToHistory={handleMoveTaskToHistory} />
      )
    }
   </li> 
 )
}

export default TodaysTaskList;