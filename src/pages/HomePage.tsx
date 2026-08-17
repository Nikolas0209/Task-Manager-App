import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TaskManagerInstructions from '../components/TaskManagerInstructions/TaskManagerInstructions';
import TaskInput from '../components/TaskInput/TaskInput';
import TodaysTaskSection from '../components/TaskList/TodaysTaskSection/TodaysTaskSection';
import TomorrowsTaskSection from '../components/TaskList/TomorrowsTaskSection/TomorrowsTaskSection';
import InTwoDaysTaskSection from '../components/TaskList/InTwoDaysTaskSection/InTwoDaysTaskSection';
import type {TaskSource } from '../types/taskType';
import type { TaskStatusType } from '../types/taskStatusType';
import { useTasks } from '../hooks/useTasks';
import { moveTaskHistory } from '../utils/moveTaskHistory';

function HomePage(){
  const navigate = useNavigate(); 
  const [isInstructions, setIsInstructions] = useState<boolean>(false);
  const [taskDetails, setTaskDetails] = useState <string | null>(null);
  const [taskStatus, setTaskStatus] = useState<Record<string, TaskStatusType>>({});
  const [isLoading, setIsLoading] = useState <boolean>(false);
  
  const { tasks: tasksToday, setTasks: setTasksToday, fetchTasks: fetchTasksToday } = 
   useTasks('https://692488a63ad095fb8474968f.mockapi.io/tasks');
  const { tasks: tasksTomorrow, setTasks: setTasksTomorrow, fetchTasks: fetchTasksTomorrow } = 
   useTasks('https://692488a63ad095fb8474968f.mockapi.io/tasks-tomorrow');
  const { tasks: tasksInTwoDays, setTasks: setTasksInTwoDays, fetchTasks: fetchTasksInTwoDays } = 
   useTasks('https://69288e25b35b4ffc50161e2b.mockapi.io/tasks-in-two-days');
 
  const handleMoveTaskToHistory = (taskId: string, source: TaskSource): Promise<void> => {
    return moveTaskHistory({ taskId, source, tasksToday, tasksTomorrow, tasksInTwoDays, setTasksToday,
       setTasksTomorrow, setTasksInTwoDays, setIsLoading });
  };

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
             setTaskDetails={setTaskDetails} markTask={markTask} tasksToday={tasksToday} 
             fetchTasksToday={fetchTasksToday} moveTaskToHistory={handleMoveTaskToHistory} 
             isLoading={isLoading} />
        </div>
      
        <div className="task-manager-card task-manager-card-tomorrow">
          <TomorrowsTaskSection taskDetails={taskDetails} setTaskDetails={setTaskDetails} 
             taskStatus={taskStatus} markTask={markTask} tasksTomorrow={tasksTomorrow} 
             fetchTasksTomorrow={fetchTasksTomorrow} moveTaskToHistory={handleMoveTaskToHistory} 
             isLoading={isLoading} />
        </div>

        <div className="task-manager-card">
          <InTwoDaysTaskSection taskDetails={taskDetails} taskStatus={taskStatus} 
             setTaskDetails={setTaskDetails} markTask={markTask} tasksInTwoDays={tasksInTwoDays}
             fetchTasksInTwoDays={fetchTasksInTwoDays} moveTaskToHistory={handleMoveTaskToHistory}
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