import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TaskManagerInstructions from '../components/TaskManagerInstructions/TaskManagerInstructions';
import TaskInput from '../components/TaskInput/TaskInput';
import TodaysTaskSection from '../components/TaskList/TodaysTaskSection/TodaysTaskSection';
import TomorrowsTaskSection from '../components/TaskList/TomorrowsTaskSection/TomorrowsTaskSection';
import InTwoDaysTaskSection from '../components/TaskList/InTwoDaysTaskSection/InTwoDaysTaskSection';
import type { TaskStatusType } from '../types/taskStatusType';

function HomePage(){
  const navigate = useNavigate(); 
  const [isInstructions, setIsInstructions] = useState<boolean>(false);
  const [taskDetails, setTaskDetails] = useState <string | null>(null);
  const [taskStatus, setTaskStatus] = useState<Record<string, TaskStatusType>>({});

  const toggleInstructions = (): void => {
    setIsInstructions(prev => !prev);
  } 

  const taskHistory = (): void => {
    navigate('/task-history');
  }

  useEffect(() => {
    if(isInstructions === true){
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    return(() => {
      document.body.classList.remove('no-scroll')
    });

  }, [isInstructions])

  const markTask = (id: string, status: TaskStatusType) => {
    setTaskStatus(prev => ({...prev, [id]: status}));
  }

  return(
    <>
    <div className={`${isInstructions ? 'blurred' : ''}`}>
     <div className="title-wrapper">
       <h1 className="task-manager-title">
          Task Manager App
       </h1>
     </div>

     <TaskInput />

     <div className="task-manager-summary-container">
      <div className="task-manager-header">
         <p>TASK MANAGER SUMMARY</p>
      </div>
      <div className="task-manager-cards">
        <div className="task-manager-date today-class">
            TODAY
        </div>
        <div className="task-manager-date tomorrow-class">
            TOMORROW
        </div>
        <div className="task-manager-date in-two-days-class">
            IN TWO DAYS
        </div>

        <div className="task-manager-card">
          <TodaysTaskSection taskDetails={taskDetails} taskStatus={taskStatus} 
             setTaskDetails={setTaskDetails} markTask={markTask}/>
        </div>
      
        <div className="task-manager-card task-manager-card-tomorrow">
          <TomorrowsTaskSection taskDetails={taskDetails} setTaskDetails={setTaskDetails} 
             taskStatus={taskStatus} markTask={markTask} />
        </div>

        <div className="task-manager-card">
          <InTwoDaysTaskSection taskDetails={taskDetails} taskStatus={taskStatus} 
             setTaskDetails={setTaskDetails} markTask={markTask}  />
        </div>

      </div>
     </div>

     <div className="past-tasks-and-instructions-container">
      <button className="past-tasks-review-button" onClick={taskHistory}>
        See all previous tasks
      </button>
      
      <button
        className="instructions-button" onClick={toggleInstructions}
         disabled={isInstructions}>
         instructions
      </button>
      </div>
     </div>

      {isInstructions &&
       <div className="instructions-overlay">
         <TaskManagerInstructions toggleInstructions={toggleInstructions} />
       </div>
      }
    </>
  )
};

export default HomePage;