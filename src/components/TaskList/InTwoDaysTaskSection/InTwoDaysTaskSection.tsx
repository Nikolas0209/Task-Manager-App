import NoTasksAssigned from "../../NoTasksAssigned";
import type { Task, TaskStatusType } from "../../../pages/HomePage";
import InTwoDaysTaskList from './InTwoDaysTaskList';

type InTwoDaysTaskSections = {
  tasksInTwoDays: Task[];
  setTaskDetails:  React.Dispatch<React.SetStateAction<string | null>>;
  taskDetails: string | null;
  fetchTasksInTwoDays: () => Promise<void>;
  markTask: (status: string) => void;
  markedTask: (status: string) => void;
  unmarkedTask: (status: string) => void;
  taskStatus: Record<string, TaskStatusType>;
}

function InTwoDaysTaskSection({ taskDetails, setTaskDetails, taskStatus, markTask, markedTask, unmarkedTask, fetchTasksInTwoDays, tasksInTwoDays }: InTwoDaysTaskSections){

  return(
    <>
     {tasksInTwoDays.length === 0 ? <NoTasksAssigned /> : ( 
       <ul className="todo-list">
         {tasksInTwoDays.map(task => {
           const isOpen = taskDetails === task.localId;

           const toggleTaskDetails = ():void => {
             setTaskDetails(prev => (prev === task.localId ? null : task.localId));
           }

           const status = taskStatus[task.localId] || 'not marked';
                
           return(
             <InTwoDaysTaskList key={task.id} isOpen={isOpen} toggleTaskDetails={toggleTaskDetails} 
               task={task} fetchTasksInTwoDays={fetchTasksInTwoDays} 
               setTaskDetails={setTaskDetails} markTask={markTask} markedTask={markedTask}
               unmarkedTask={unmarkedTask} status={status} />
           )
          })}
        </ul>
       )
      }   
   </>
  )
}

export default InTwoDaysTaskSection;