import './TaskDetails.css';
import bin from '../assets/bin.png';
import type { Task } from '../pages/HomePage';

type TaskDetails = {
  task: Task,
  onDelete: () => Promise<void>
}

function TaskDetails({ task, onDelete }: TaskDetails){ 

 return(
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
         <button className="delete-task-button" onClick={onDelete}>
           <img src={bin} className="bin-image"/>
         </button>
       </div>
    </div> 
 )
};

export default TaskDetails;