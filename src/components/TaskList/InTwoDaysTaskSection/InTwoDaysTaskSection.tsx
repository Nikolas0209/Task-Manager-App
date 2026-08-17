import NoTasksAssigned from "../../NoTasksAssigned/NoTasksAssigned";
import type {TaskStatusType } from "../../../types/taskStatusType";
import type { Task, TaskSource } from '../../../types/taskType';
import InTwoDaysTaskList from './InTwoDaysTaskList';

type InTwoDaysTaskSections = {
  tasksInTwoDays: Task[];
  setTaskDetails:  React.Dispatch<React.SetStateAction<string | null>>;
  taskDetails: string | null;
  fetchTasksInTwoDays: () => Promise<void>;
  markTask: (id:string, status: TaskStatusType) => void;
  taskStatus: Record<string, TaskStatusType>;
  moveTaskToHistory: (taskId: string, source: TaskSource) => void;
  isLoading: boolean;
}

function InTwoDaysTaskSection({ taskDetails, setTaskDetails, taskStatus, markTask, fetchTasksInTwoDays, tasksInTwoDays, moveTaskToHistory, isLoading }: InTwoDaysTaskSections){

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
               task={task} fetchTasksInTwoDays={fetchTasksInTwoDays} setTaskDetails={setTaskDetails}
                markTask={markTask} status={status} moveTaskToHistory={moveTaskToHistory} isLoading={isLoading} />
            )
          })}
        </ul>
       )
      }   
   </>
  )
}

export default InTwoDaysTaskSection;