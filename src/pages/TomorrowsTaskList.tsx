import './TomorrowsTaskList.css';
import type { Task } from './HomePage';
import bin from '../assets/bin.png';
import axios from 'axios';

type TaskToday = {
  task: Task,
  isOpen: boolean
  //setTasksTomorrow: React.Dispatch<React.SetStateAction<Task[]>>,
  toggleTaskDetails: () => void
}

function TomorrowsTaskList({ task, isOpen, toggleTaskDetails }: TaskToday){
  
  

  return(
    <>
        <li>
    {task.task} 
    <div className="more-info-button-container">
      <button className="more-info-button" onClick={toggleTaskDetails}>
        ...
      </button>
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
          <button className="delete-task-button" >
            <img src={bin} className="bin-image"/>
          </button>
        </div>
      </div> 
      )
    }
   </li> 
    </>
  )
}

export default TomorrowsTaskList;

