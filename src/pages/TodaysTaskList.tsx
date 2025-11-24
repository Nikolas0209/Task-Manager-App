import './TodaysTaskList.css';
import type { Task } from './HomePage';
import axios from 'axios';

type TodaysTaskListProp = {
  task: Task,
  taskDetails: string | null,
  setTaskDetails: React.Dispatch<React.SetStateAction<string | null >>,
  fetchTasks: () => Promise<void>
};

function TodaysTaskList({ task, taskDetails, setTaskDetails, fetchTasks }: TodaysTaskListProp){
  const isOpen = taskDetails === task.id;

  const toggleTaskDetails = (): void => {
    setTaskDetails(prev => (prev === task.id ? null : task.id ));
  };

  const deleteTask = async(): Promise<void> => {
    try{
    const result = await axios.delete(`https://692488a63ad095fb8474968f.mockapi.io/tasks/${task.id}`);
    console.log(result)
    } catch(error){
      console.log('Could not delete the task. Please try again later.', error);
    }

    await fetchTasks();
    console.log('button clicked')
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
           <button className="delete-task-button" onClick={deleteTask}>
            del
           </button>
         </div>
        </div> 
        )
      }
    </li>  
  </>
 )
}

export default TodaysTaskList;