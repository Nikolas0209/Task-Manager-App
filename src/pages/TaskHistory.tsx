import './TaskHistory.css';
import { useNavigate } from 'react-router-dom';
import EmptyTaskHistory from '../components/EmptyTaskHistory/EmptyTaskHistory';
import { useTaskHistory } from '../hooks/useTaskHistory';
import { useState } from 'react';

function TaskHistory(){
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { taskHistory, deleteHistoryTask } = useTaskHistory({ setIsLoading });
 
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