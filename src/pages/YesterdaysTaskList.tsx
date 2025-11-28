import bin from '../assets/bin.png';
import type { Task } from './HomePage';
import axios from 'axios';

type TaskTomorrow = {
  isOpen: boolean,
  toggleTaskDetails: () => void,
  tasksYesterday: Task[],
  task: Task,
  fetchTasksYesterday: () => Promise<void>,
  setTaskDetails: React.Dispatch<React.SetStateAction<string | null>>
}

function YesterdaysTaskList({ task, isOpen, toggleTaskDetails, fetchTasksYesterday,
  setTaskDetails
 }: TaskTomorrow) {

 const deleteTaskYesterday = async(): Promise<void> => {
  const response = await axios.delete(`https://69288e25b35b4ffc50161e2b.mockapi.io/tasks-yesterday/${task.id}`);
  setTaskDetails(null);
  await fetchTasksYesterday();
  console.log(response)
 }

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
          <button className="delete-task-button" onClick={deleteTaskYesterday} >
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