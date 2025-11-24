import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import TodaysTaskList from './TodaysTaskList';

export type Task = {
  id: number,
  task: string,
  isFinished?: boolean,
  createdAt: Date;
}

function HomePage(){
  const navigate = useNavigate(); 
  const [isInstructions, setIsInstructions] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDetails, setTaskDetails] = useState <number | null>(null);
 
  type ApiTask = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  };

  const toggleInstructions = (): void => {
    setIsInstructions(prev => !prev);
  } 

  const taskHistory = (): void => {
    navigate('/task-history');
  }

  const fetchTasks = useCallback(async(): Promise<void> => {
    try{
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

      const realDataDisplay: Task[] = response.data.map((task: ApiTask) => ({
        id: task.id,
        task: task.title,
        isFinished: task.completed,
        createdAt: new Date() 
      }))

      setTasks(realDataDisplay);
    } catch(error){
      console.log('Cannot load the data. Please try again later.', error);
    }
  },[]);
   
  useEffect(() => {
    /*
    const fetchTasks = async (): Promise<void> => {
      try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

        const realDataDisplay: Task[] = response.data.map((task: ApiTask) => ({
          id: task.id,
          task: task.title,
          isFinished: task.completed,
          createdAt: new Date() 
        }))

        setTasks(realDataDisplay);
      } catch(error){
        console.log('Cannot load the data. Please try again later.', error);
      }
    }
    */
    fetchTasks();
  }, [fetchTasks])

  return(
    <>
    <div className={`${isInstructions ? 'blurred' : ''}`}>
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
            { tasks.map(task => {
                return (
                 <TodaysTaskList task={task} key={task.id} taskDetails={taskDetails} setTaskDetails={setTaskDetails} fetchTasks={fetchTasks}/>
                )
              })
            }
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
      
      <button
        className="instructions-button" onClick={toggleInstructions}
         disabled={isInstructions}>
         instructions
      </button>
      </div>
     </div>
        {isInstructions &&
         <div className="instructions-section">
          <div className="instructions-go-back-button-wrapper">
           <button className="instructions-go-back-button" 
             onClick={toggleInstructions}>
             Go Back
           </button>
          </div>
          <div className="instructions-on">
            Welcome to instructions
          </div>
         </div>
        }
    </>
  )
};

export default HomePage;