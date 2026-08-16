import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TaskManagerInstructions from '../components/TaskManagerInstructions/TaskManagerInstructions';
import TaskInput from '../components/TaskInput/TaskInput';
import TodaysTaskSection from '../components/TaskList/TodaysTaskSection/TodaysTaskSection';
import TomorrowsTaskSection from '../components/TaskList/TomorrowsTaskSection/TomorrowsTaskSection';
import InTwoDaysTaskSection from '../components/TaskList/InTwoDaysTaskSection/InTwoDaysTaskSection';
import type { Task, TaskSource } from '../types/taskType';
import type { TaskStatusType } from '../types/taskStatusType';

type HomePageTask = {
  tasksToday: Task[];
  tasksTomorrow: Task[];
  tasksInTwoDays: Task[];
  fetchTasksToday: () => Promise<void>;
  fetchTasksTomorrow: () => Promise<void>;
  fetchTasksInTwoDays: () => Promise<void>;
  moveTaskToHistory: (taskId: string, source: TaskSource) => Promise<void>
  isLoading: boolean;
};

function HomePage({ moveTaskToHistory, isLoading, tasksToday, tasksTomorrow, tasksInTwoDays,
  fetchTasksToday, fetchTasksTomorrow, fetchTasksInTwoDays }: HomePageTask ){
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

  const markTask = (id: string): void => {
    setTaskStatus(prev => ({ ...prev, [id]: 'not marked' }));
   }; 

   const markedTask = (id: string): void => {
    setTaskStatus(prev => ({ ...prev, [id]: 'marked' }));
   };

   const unmarkedTask = (id: string): void => {
    setTaskStatus(prev => ({ ...prev, [id]: 'unmarked' }));
   };

  return(
    <>
    <div className={`${isInstructions ? 'blurred' : ''}`}>
     <div className="title-wrapper">
       <h1 className="task-manager-title">
          Task Manager App
       </h1>
     </div>

     <TaskInput fetchTasksToday={fetchTasksToday} fetchTasksTomorrow={fetchTasksTomorrow} 
       fetchTasksInTwoDays={fetchTasksInTwoDays}/>

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
             setTaskDetails={setTaskDetails} markTask={markTask} markedTask={markedTask} 
             unmarkedTask={unmarkedTask} tasksToday={tasksToday} 
             fetchTasksToday={fetchTasksToday} moveTaskToHistory={moveTaskToHistory} 
             isLoading={isLoading} />
        </div>
      
        <div className="task-manager-card task-manager-card-tomorrow">
          <TomorrowsTaskSection taskDetails={taskDetails} taskStatus={taskStatus} 
             setTaskDetails={setTaskDetails} markTask={markTask} markedTask={markedTask} 
             unmarkedTask={unmarkedTask} tasksTomorrow={tasksTomorrow} 
             fetchTasksTomorrow={fetchTasksTomorrow} moveTaskToHistory={moveTaskToHistory} 
             isLoading={isLoading} />
        </div>

        <div className="task-manager-card">
          <InTwoDaysTaskSection taskDetails={taskDetails} taskStatus={taskStatus} 
             setTaskDetails={setTaskDetails} markTask={markTask} markedTask={markedTask} 
             unmarkedTask={unmarkedTask} tasksInTwoDays={tasksInTwoDays} 
             fetchTasksInTwoDays={fetchTasksInTwoDays} moveTaskToHistory={moveTaskToHistory}
             isLoading={isLoading} />
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