import './HomePage.css';

function HomePage(){
  return(
    <>
     <div className="task-manager-container">
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

     <div className="past-tasks-button-container">
      <button className="past-tasks-review-button">
        See all previous tasks
      </button>
     </div>

    </>
  )
};

export default HomePage;