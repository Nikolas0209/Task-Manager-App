import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import TodaysTaskList from './TodaysTaskList';
import TomorrowsTaskList from './TomorrowsTaskList';
import YesterdaysTaskList from './YesterdaysTaskList';
import TaskManagerInstructions from '../components/TaskManagerInstructions';
import TaskInput from '../components/TaskInput';
import NoTasksAssigned from '../components/NoTasksAssigned';

export type Task = {
  createdAt: Date,
  task: string,
  isFinished?: boolean,
  id: string,
  localId: string
}

function HomePage(){
  const navigate = useNavigate(); 
  const [isInstructions, setIsInstructions] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDetails, setTaskDetails] = useState <string | null>(null);
  const [tasksTomorrow, setTasksTomorrow] = useState<Task[]>([]);
  const [tasksYesterday, setTasksYesterday] = useState<Task[]>([]);

  const toggleInstructions = (): void => {
    setIsInstructions(prev => !prev);
  } 

  const taskHistory = (): void => {
    navigate('/task-history');
  }

  const fetchTasks = useCallback(async(): Promise<void> => {
    try{
      const response = await axios.get('https://692488a63ad095fb8474968f.mockapi.io/tasks');
     
      const tasksWithLocalId = response.data.map((task: Task) => ({
        ...task,
        localId: crypto.randomUUID()
      }))
      setTasks(tasksWithLocalId);

    } catch(error){
      console.log('Cannot load the data. Please try again later.', error);
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
     console.log("Could not load today's tasks. Please try again later", error);
    }
  }, []);

  const fetchTasksYesterday = useCallback(async(): Promise<void> => {
    try{
      const response = await axios.get('https://69288e25b35b4ffc50161e2b.mockapi.io/tasks-yesterday');

      const tasksWithLocalId = response.data.map((task: Task) => ({
        ...task,
        localId: crypto.randomUUID()
      }))
      setTasksYesterday(tasksWithLocalId);

    }
    catch(error){
      console.log("Could not load yesterday's tasks. Please try again later.", error);
    }
  }, []);

  useEffect(() => {
   fetchTasks();
   fetchTasksTomorrow();
   fetchTasksYesterday()
  }, [fetchTasks, fetchTasksTomorrow, fetchTasksYesterday])

  return(
    <>
    <div className={`${isInstructions ? 'blurred' : ''}`}>
     <div className="title-wrapper">
       <h1 className="task-manager-title">
          Task Manager App
       </h1>
     </div>

     <TaskInput fetchTasks={fetchTasks} fetchTasksTomorrow={fetchTasksTomorrow} />

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
          {tasksYesterday.length === 0 ? <NoTasksAssigned /> : ( 
            <ul className="todo-list">
              {tasksYesterday.map(task => {
                const isOpen = taskDetails === task.localId;

                const toggleTaskDetails = ():void => {
                  setTaskDetails(prev => (prev === task.localId ? null : task.localId));
                }

               return(
                <YesterdaysTaskList key={task.id} isOpen={isOpen} toggleTaskDetails={toggleTaskDetails} tasksYesterday={tasksYesterday} task={task} fetchTasksYesterday={fetchTasksYesterday} setTaskDetails={setTaskDetails} />
               )
              })}
            </ul>
           )
          }
        </div>
      
        <div className="task-manager-card">
          {tasks.length === 0 ? <NoTasksAssigned /> : (
            <ul className="todo-list">
              {tasks.map(task => {
                 const isOpen = taskDetails === task.localId;

                 const toggleTaskDetails = (): void => {
                   setTaskDetails(prev => (prev === task.localId ? null : task.localId));
                 };

                 return (
                  <TodaysTaskList task={task} key={task.id} setTaskDetails={setTaskDetails} 
                  fetchTasks={fetchTasks} isOpen={isOpen} toggleTaskDetails={toggleTaskDetails}/>
                 )
               })
              }
            </ul>
            )
          }
        </div>

        <div className="task-manager-card">
          {tasksTomorrow.length === 0 ? <NoTasksAssigned /> : (
            <ul className="todo-list">
             {tasksTomorrow.map(task => {
               const isOpen = taskDetails === task.localId;

               const toggleTaskDetails = (): void => {
                setTaskDetails(prev => (prev === task.localId ? null : task.localId));
               };

               return(
                <TomorrowsTaskList task={task} key={task.id} isOpen={isOpen} 
                 toggleTaskDetails={toggleTaskDetails} fetchTasksTomorrow={fetchTasksTomorrow} 
                 setTaskDetails={setTaskDetails}/>
                )
               })
              }
            </ul> 
           )
          }
        </div>

      </div>
     </div>

     <div className="past-tasks-and-instructions-container">
      <button className="past-tasks-review-button" onClick={taskHistory} >
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
       <TaskManagerInstructions toggleInstructions={toggleInstructions}/>
      }
    </>
  )
};

export default HomePage;