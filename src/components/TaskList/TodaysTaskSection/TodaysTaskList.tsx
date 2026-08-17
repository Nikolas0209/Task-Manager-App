import '../TaskList.css';
import type { Task, TaskSource } from '../../../types/taskType';
import axios from 'axios';
import TaskDetails from '../../TaskDetails/TaskDetails';
import type { TaskStatusType } from '../../../types/taskStatusType';

type TaskToday = {
  setTaskDetails: React.Dispatch<React.SetStateAction<string | null >>;
  isOpen: boolean;
  toggleTaskDetails: () => void;
  markTask: (id: string, status: TaskStatusType) => void;
  status: string;
  moveTaskToHistory: (taskId: string, source: TaskSource) => void;
  isLoading: boolean;
  columnClass?: string;
  task: Task;
  fetchTasksToday: () => Promise<void>
};

function TodaysTaskList({task, fetchTasksToday, setTaskDetails, isOpen, toggleTaskDetails, markTask, 
  status, moveTaskToHistory, isLoading, columnClass }: TaskToday){
  
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
      <TaskDetails task={task} onDelete={deleteTask} markTask={markTask} source='today'
       moveTaskToHistory={moveTaskToHistory} isLoading={isLoading} columnClass={columnClass} />
      )
    }
   </li> 
 )
}

export default TodaysTaskList;