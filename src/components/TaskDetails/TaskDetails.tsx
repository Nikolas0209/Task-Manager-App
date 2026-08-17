import './TaskDetails.css';
import bin from '../../assets/bin.png';
import type { Task } from '../../types/taskType';
import undo from '../../assets/undo.png';
import checkedTask from '../../assets/check.png';
import uncheckedTask from '../../assets/close.png';
import type { TaskStatusType } from '../../types/taskStatusType';
 
type TaskDetails = {
  task: Task;
  onDelete: () => Promise<void>;
  markTask: (id:string, status: TaskStatusType) => void;
  isLoading: boolean;
  columnClass?: string;
  handleMoveTaskToHistory: () => Promise<void>;
}

function TaskDetails({ task, onDelete, markTask, isLoading, columnClass, handleMoveTaskToHistory }: TaskDetails){ 
 
 return(
   <div className={`task-details ${columnClass || ''}`}>
     <div className="task-state-container">
       Select status:
       <div>
         <button className="status-update-button" onClick={() => markTask(task.localId, 'not marked')}>
           <img className="status-button-image" src={undo} />
         </button>
         <button className="status-update-button" onClick={() => markTask(task.localId, 'marked')}>
           <img className="status-button-image" src={checkedTask} />
         </button>
         <button className="status-update-button" onClick={() => markTask(task.localId, 'unmarked')}>
           <img className="status-button-image" src={uncheckedTask} />
         </button>
       </div>
     </div>
       Assigned on: <span className="date-span">{new Date(task.createdAt).toLocaleDateString()}</span>
       <div className="delete-task-container">
         Delete Task:
         <button className="delete-task-button" onClick={onDelete}>
           <img src={bin} className="bin-image"/>
         </button>
       </div>
       <div className="move-to-history-container">
        <button className="move-to-history-button" disabled={isLoading} onClick={handleMoveTaskToHistory}>
          Move to History
        </button>
       </div>
    </div> 
 )
};

export default TaskDetails;