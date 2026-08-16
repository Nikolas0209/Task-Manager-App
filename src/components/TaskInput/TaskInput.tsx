import './TaskInput.css';
import { useState } from 'react';
import axios from 'axios';
import type { TaskSource } from '../../types/taskType';

type InputSection = {
  fetchTasksToday: () => Promise<void>;
  fetchTasksTomorrow: () => Promise<void>;
  fetchTasksInTwoDays: () => Promise<void>;
};

function TaskInput({ fetchTasksToday, fetchTasksTomorrow, fetchTasksInTwoDays }: InputSection ){
  const [addTask, setAddTask] = useState <string>('');

  const addTaskButton = async( source: TaskSource): Promise<void> => {
    let url: string;
    let fetchTasks: () => Promise<void>;
    
    try{
      if(!addTask) return;

      if(source === 'today'){
        url = 'https://692488a63ad095fb8474968f.mockapi.io/tasks';
        fetchTasks = fetchTasksToday;
      } else if(source === 'tomorrow'){
        url = 'https://692488a63ad095fb8474968f.mockapi.io/tasks-tomorrow';
        fetchTasks = fetchTasksTomorrow;
      } else{
        url = 'https://69288e25b35b4ffc50161e2b.mockapi.io/tasks-in-two-days';
        fetchTasks = fetchTasksInTwoDays;
      }

      await axios.post(url, {
        task: addTask,
        createdAt: new Date().toISOString()
      });

      setAddTask('');
      await fetchTasks();
    } 
    catch(error){
      console.log('Could not add a task. Please try again later.', error);
    }
  }

  const typeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAddTask(event.target.value);
  };
 
  const handleEscapeButton = (event: React.KeyboardEvent<HTMLInputElement>):void => {
    if(event.key === 'Escape') setAddTask('');
  };

 return(
  <div className="input-container">
   <input type="text" className="search-input" 
     name="newTask" onChange={typeInput} onKeyDown={handleEscapeButton} 
     value={addTask}
     placeholder="Add new task here"/>
   <button className="add-button" onClick={() => addTaskButton('today')}>
     Add to today
   </button>
   <button className="add-button" onClick={() => addTaskButton('tomorrow')}>
     Add to tomorrow
   </button>
   <button className="add-button" onClick={() => addTaskButton('twoDaysAfter')}>
     Add in two days
   </button>
</div>
 )
}

export default TaskInput;