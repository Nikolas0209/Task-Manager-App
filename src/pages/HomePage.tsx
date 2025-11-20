import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage(){
  const navigate = useNavigate(); 

  const taskHistory = (): void => {
    navigate('/task-history');
  }

  return(
    <>
     <div className="title-wrapper">
       <h1 className="task-manager-title">
          Task Manager App
       </h1>
     </div>
     <div className="input-container">
       <input type="text" className="search-input" 
        name="newTask"
        placeholder="Add new task here"/>
       <button className="add-button">
        Add to today
       </button>
       <button className="add-button">
        Add to tomorrow
       </button>
     </div>
     <div className="task-manager-summary-container">
      <div className="task-manager-header">
         <p>TASK MANAGER SUMMARY</p>
      </div>
      <div className="task-manager-cards">
        <div className="task-manager-date yesterday-class">
            YESTERDAY
        </div>
        <div className="task-manager-date today-class">
            TODAY
        </div>
        <div className="task-manager-date tomorrow-class">
            TOMORROW
        </div>
        <div className="task-manager-card">
          <ul className="todo-list">
            <li>Wash dishes</li>
            <li>Watch TV</li>
            <li>Go outside</li>
          </ul>
        </div>
      
        <div className="task-manager-card">
          <ul className="todo-list">
            <li>Wash dishes</li>
            <li>Watch TV</li>
            <li>Go outside</li>
          </ul>
        </div>

        <div className="task-manager-card">
          <ul className="todo-list">
            <li>Wash dishes</li>
            <li>Watch TV</li>
            <li>Go outside</li>
          </ul>
        </div>

      </div>
     </div>

     <div className="past-tasks-and-instructions-container">
      <button className="past-tasks-review-button" onClick={taskHistory} >
        See all previous tasks
      </button>
      <a href="" className="instructions-link">
        Instructions
      </a>
     </div>

    </>
  )
};

export default HomePage;