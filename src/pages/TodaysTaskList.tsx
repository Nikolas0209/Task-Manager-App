import './TodaysTaskList.css';
import type { Task } from './HomePage';

type TodaysTaskListProp = {
  task: Task
  taskDetails: number | null,
  setTaskDetails: React.Dispatch<React.SetStateAction<number | null >>
}

function TodaysTaskList({ task, taskDetails, setTaskDetails }: TodaysTaskListProp){
  const isOpen = taskDetails === task.id;

  const toggleTaskDetails = (): void => {
    setTaskDetails(prev => (prev === task.id ? null : task.id ));
  };

 return(
  <>
    <li>
      {task.task} 
      <button className="" onClick={toggleTaskDetails}>
        ...
      </button>
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
           <button className="delete-task-button">del</button>
         </div>
        </div> 
        )
      }
    </li>  
  </>
 )
}

export default TodaysTaskList;