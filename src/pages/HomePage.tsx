import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import TaskManagerInstructions from '../components/TaskManagerInstructions/TaskManagerInstructions';
import TaskInput from '../components/TaskInput/TaskInput';
import TodaysTaskSection from '../components/TaskList/TodaysTaskSection/TodaysTaskSection';
import TomorrowsTaskSection from '../components/TaskList/TomorrowsTaskSection/TomorrowsTaskSection';
import InTwoDaysTaskSection from '../components/TaskList/InTwoDaysTaskSection/InTwoDaysTaskSection';

export type TaskStatusType = 'marked' | 'unmarked' | 'not marked';

export type Task = {
  createdAt: Date;
  task: string;
  isFinished: boolean;
  id: string;
  localId: string;
}

function HomePage(){
  const navigate = useNavigate(); 
  const [isInstructions, setIsInstructions] = useState<boolean>(false);
  const [tasksToday, setTasksToday] = useState<Task[]>([]);
  const [taskDetails, setTaskDetails] = useState <string | null>(null);
  const [tasksTomorrow, setTasksTomorrow] = useState<Task[]>([]);
  const [tasksInTwoDays, setTasksInTwoDays] = useState<Task[]>([]);
  const [taskStatus, setTaskStatus] = useState<Record<string, TaskStatusType>>({});

  const toggleInstructions = (): void => {
    setIsInstructions(prev => !prev);
  } 

  const taskHistory = (): void => {
    navigate('/task-history');
  }

  const fetchTasksToday = useCallback(async(): Promise<void> => {
    try{
      const response = await axios.get('https://692488a63ad095fb8474968f.mockapi.io/tasks');
     
      const tasksWithLocalId = response.data.map((task: Task) => ({
        ...task,
        localId: crypto.randomUUID()
      }))
      setTasksToday(tasksWithLocalId);

    } catch(error){
      console.log("Cannot load the today's data. Please try again later.", error);
    }
  },[]);


  const fetchTasksTomorrow = useCallback(async(): Promise<void> => {
    try{
     const response = await axios.get('https://692488a63ad095fb8474968f.mockapi.io/tasks-tomorrow');

     const tasksWithLocalId = response.data.map((task: Task) => ({
      ...task,
      localId: crypto.randomUUID()
     }))
     setTasksTomorrow(tasksWithLocalId);

    } 
    catch(error){
     console.log("Could not load tomorrow's tasks. Please try again later", error);
    }
  }, []);


  const fetchTasksInTwoDays = useCallback(async(): Promise<void> => {
    try{
      const response = await axios.get('https://69288e25b35b4ffc50161e2b.mockapi.io/tasks-in-two-days');

      const tasksWithLocalId = response.data.map((task: Task) => ({
        ...task,
        localId: crypto.randomUUID()
      }))
      setTasksInTwoDays(tasksWithLocalId);

    }
    catch(error){
      console.log('Could not load tasks for the next two days. Please try again later.', error);
    }
  }, []);

  useEffect(() => {
   fetchTasksToday();
   fetchTasksTomorrow();
   fetchTasksInTwoDays();
  }, [fetchTasksToday, fetchTasksTomorrow, fetchTasksInTwoDays]);

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
             fetchTasksToday={fetchTasksToday} />
        </div>
      
        <div className="task-manager-card task-manager-card-tomorrow">
          <TomorrowsTaskSection taskDetails={taskDetails} taskStatus={taskStatus} 
             setTaskDetails={setTaskDetails} markTask={markTask} markedTask={markedTask} 
             unmarkedTask={unmarkedTask} tasksTomorrow={tasksTomorrow} 
             fetchTasksTomorrow={fetchTasksTomorrow} />
        </div>

        <div className="task-manager-card">
          <InTwoDaysTaskSection taskDetails={taskDetails} taskStatus={taskStatus} 
             setTaskDetails={setTaskDetails} markTask={markTask} markedTask={markedTask} 
             unmarkedTask={unmarkedTask} tasksInTwoDays={tasksInTwoDays} 
             fetchTasksInTwoDays={fetchTasksInTwoDays} />
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