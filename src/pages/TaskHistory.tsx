import './TaskHistory.css';
import { useNavigate } from 'react-router-dom';
import type { Task } from '../App';
import EmptyTaskHistory from '../components/EmptyTaskHistory/EmptyTaskHistory';

type TaskHistory = {
  taskHistory: Task[];
  deleteHistoryTask: (taskId: string) => Promise<void>;
  isLoading: boolean
}

function TaskHistory({ taskHistory, deleteHistoryTask, isLoading }: TaskHistory ){
  const navigate = useNavigate();
 
  const goBack = (): void => {
   navigate('/');
  }

  return(
   <>
    <div className="title-wrapper">
       <h1 className="task-manager-title">
          Task Manager App
       </h1>
     </div>
    <div className="go-back-div">
      <button className="go-back-button" onClick={goBack}> 
        Go Home
      </button>
    </div>
    <div className="task-history-div">
      <h2 className="task-history-title">
        Task History
      </h2>
      <div className="task-history-details">
       {taskHistory.length === 0 ? <EmptyTaskHistory/> :
         taskHistory.map(task => {
          return(
            <div className="history-task-div" key={task.id}>
              <div>{task.task}</div>
              <div>Date assigned: {new Date(task.createdAt).toLocaleDateString()}</div>
              <div>
                <button className="delete-history-task" disabled={isLoading} 
                 onClick={() => deleteHistoryTask(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          )
         })
        }
      </div>
    </div> 
   </>
  )
}

export default TaskHistory;