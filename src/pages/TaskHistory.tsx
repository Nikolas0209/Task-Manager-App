import './TaskHistory.css';
import { useNavigate } from 'react-router-dom';

function TaskHistory(){
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
        Task 1 status: unfinished date  delete task<br/>
        Task 2 status: finished datev delete task
      </div>
    </div> 
   </>
  )
}

export default TaskHistory;