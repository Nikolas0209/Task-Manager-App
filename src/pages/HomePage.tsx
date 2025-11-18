import './HomePage.css';

function HomePage(){
  return(
    <>
     <div className="task-manager-container">
      <div className="task-manager-header">
         <p>TASK MANAGER SUMMARY</p>
      </div>
      <div className="task-manager-cards">
       <div className="task-manager-card">
          <div className="task-manager-date">
            YESTERDAY
          </div>
          card1
        </div>
        <div className="task-manager-card">
        <div className="task-manager-date">
            TODAY
          </div>
          card2
        </div>
        <div className="task-manager-card">
        <div className="task-manager-date">
            TOMORROW
          </div>
          card3
        </div>
      </div>
     
     </div>
    </>
  )
};

export default HomePage;