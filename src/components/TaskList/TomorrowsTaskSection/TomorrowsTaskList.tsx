import '../TaskList.css';
import type { Task, TaskSource } from '../../../types/taskType';
import axios from 'axios';
import TaskDetails from '../../TaskDetails/TaskDetails';
import type { TaskStatusType } from '../../../types/taskStatusType';
import { useTaskContext } from '../../../context/useTaskContext';

type TaskTomorrow = {
  task: Task;
  isOpen: boolean;
  setTaskDetails: React.Dispatch<React.SetStateAction<string | null>>;
  toggleTaskDetails: () => void;
  markTask: (id:string, status: TaskStatusType) => void;
  status: string;
  moveTaskToHistory: (taskId: string, source: TaskSource) => void;
  isLoading: boolean;
}

function TomorrowsTaskList({ task, isOpen, toggleTaskDetails, setTaskDetails,  
  markTask, status, moveTaskToHistory, isLoading }: TaskTomorrow){

  const { tasksTomorrow } = useTaskContext();
  const { fetchTasks: fetchTasksTomorrow } = tasksTomorrow;

  const deleteTaskTomorrow = async (): Promise<void>  => {
    try{
      await axios.delete(`https://692488a63ad095fb8474968f.mockapi.io/tasks-tomorrow/${task.id}`);
     setTaskDetails(null);
    }
    catch(error){
     console.log('Could not delete the task. Please try again later.', error);
    }
   
     await fetchTasksTomorrow();
   }

  return( 
   <li>
    <div className="more-info-container">
     <div className={
        "task-text " +
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
      <TaskDetails task={task} onDelete={deleteTaskTomorrow} markTask={markTask} 
        moveTaskToHistory={moveTaskToHistory} isLoading={isLoading} source='tomorrow'/>
     )
    }
   </li> 
  )
}

export default TomorrowsTaskList;

