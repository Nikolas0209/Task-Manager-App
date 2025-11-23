import './TodaysTaskList.css';
import { useState } from 'react';
import type { Task } from './HomePage';

type TodaysTaskListProp = {
  task: Task
}

function TodaysTaskList({ task }: TodaysTaskListProp){
  const [isTaskDetails, setIsTaskDetails] = useState<boolean>(false);

  const toggleTaskDetails = (): void => {
    setIsTaskDetails(prev => !prev);
  };

 return(
  <>
    <li>
      {task.task} 
      <button className="" onClick={toggleTaskDetails}>
        ...
      </button>
      {isTaskDetails ?
        <div className="task-details">
        <div className="task-state-container">
          Select status:
          <button className="finished-task">✅</button>
          <button className="unfinished-task">❌</button>
        </div>
        {new Date(task.createdAt).toLocaleDateString()}
        </div> : ''
      }
    </li>  
  </>
 )
}

export default TodaysTaskList;