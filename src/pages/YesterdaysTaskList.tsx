import bin from '../assets/bin.png';
import type { Task } from './HomePage';

type TaskTomorrow = {
  isOpen: boolean,
  toggleTaskDetails: () => void,
  tasksYesterday: Task[]
  task: Task
}

function YesterdaysTaskList({task, isOpen, toggleTaskDetails}: TaskTomorrow) {
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

export default YesterdaysTaskList;