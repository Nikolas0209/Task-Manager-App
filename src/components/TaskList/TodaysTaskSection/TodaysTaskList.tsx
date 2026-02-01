import '../TaskList.css';
import type { Task } from '../../../types/taskType';
import axios from 'axios';
import TaskDetails from '../../TaskDetails/TaskDetails';

type TaskToday = {
  task: Task;
  setTaskDetails: React.Dispatch<React.SetStateAction<string | null >>;
  fetchTasksToday: () => Promise<void>;
  isOpen: boolean;
  toggleTaskDetails: () => void;
  markTask: (status: string) => void;
  markedTask: (status: string) => void;
  unmarkedTask: (status: string) => void;
  status: string;
  moveTaskToHistory: (taskId: string) => void;
  isLoading: boolean;
  columnClass?: string;
};

function TodaysTaskList({ task, setTaskDetails, fetchTasksToday, isOpen, toggleTaskDetails, markTask, 
  markedTask, unmarkedTask, status, moveTaskToHistory, isLoading, columnClass }: TaskToday){

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
      <TaskDetails task={task} onDelete={deleteTask} markTask={markTask} unmarkedTask={unmarkedTask} 
        markedTask={markedTask} moveTaskToHistory={moveTaskToHistory} isLoading={isLoading} columnClass={columnClass} />
      )
    }
   </li> 
 )
}

export default TodaysTaskList;