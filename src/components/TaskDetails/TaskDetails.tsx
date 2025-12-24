import './TaskDetails.css';
import bin from '../../assets/bin.png';
import type { Task } from '../../pages/HomePage';
import undo from '../../assets/undo.png';
import checkedTask from '../../assets/check.png';
import uncheckedTask from '../../assets/close.png';
 
type TaskDetails = {
  task: Task;
  onDelete: () => Promise<void>;
  markTask: (status: string) => void;
  markedTask: (status: string) => void;
  unmarkedTask: (status: string) => void;
}

function TaskDetails({ task, onDelete, markTask, markedTask, unmarkedTask }: TaskDetails){ 
 
 return(
   <div className="task-details task-details-tomorrow">
     <div className="task-state-container">
       Select status:
       <div>
         <button className="status-update-button" onClick={() => markTask(task.localId)}>
           <img className="status-button-image" src={undo} />
         </button>
         <button className="status-update-button" onClick={() => markedTask(task.localId)}>
           <img className="status-button-image" src={checkedTask} />
         </button>
         <button className="status-update-button" onClick={() => unmarkedTask(task.localId)}>
           <img className="status-button-image" src={uncheckedTask} />
         </button>
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