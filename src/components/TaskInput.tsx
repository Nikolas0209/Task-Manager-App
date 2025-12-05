import './TaskInput.css';
import { useState } from 'react';
import axios from 'axios';

type InputSection = {
  fetchTasks: () => Promise<void>
  fetchTasksTomorrow: () => Promise<void>
} 

function TaskInput({ fetchTasks, fetchTasksTomorrow }: InputSection ){
  const [addTask, setAddTask] = useState <string>('');

  const addTodaysTask = async(): Promise<void> => {
    try{
      if(!addTask) return;

      await axios.post('https://692488a63ad095fb8474968f.mockapi.io/tasks', {task: addTask,
        isFinished: false,
        createdAt: new Date().toISOString()
      });
      setAddTask('');
      await fetchTasks();
    } 
    catch(error){
      console.log('Could not add a task. Please try again later.', error);
    }
  }

  const addTomorrowsTask = async(): Promise<void> => {
    try{
      if(!addTask) return;

      await axios.post('https://692488a63ad095fb8474968f.mockapi.io/tasks-tomorrow', {
        task: addTask,
        isFinished: false,
        createdAt: new Date().toISOString()
      });
      setAddTask('');
      await fetchTasksTomorrow();
    }
    catch(error){
      console.log('Could not delete a task. Please try again later.', error);
    }
  }

  const typeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAddTask(event.target.value);
  }
 
  const handleEscapeButton = (event: React.KeyboardEvent<HTMLInputElement>):void => {
    if(event.key === 'Escape') setAddTask('');
  }

 return(
  <div className="input-container">
   <input type="text" className="search-input" 
     name="newTask" onChange={typeInput} onKeyDown={handleEscapeButton} 
     value={addTask}
     placeholder="Add new task here"/>
   <button className="add-button" onClick={addTodaysTask}>
     Add to today
   </button>
   <button className="add-button" onClick={addTomorrowsTask}>
     Add to tomorrow
   </button>
</div>
 )
}

export default TaskInput;