import NoTasksAssigned from "../../NoTasksAssigned/NoTasksAssigned";
import type {TaskStatusType } from "../../../types/taskStatusType";
import InTwoDaysTaskList from './InTwoDaysTaskList';
import { useTaskContext } from "../../../context/useTaskContext";

type InTwoDaysTaskSections = {
  setTaskDetails:  React.Dispatch<React.SetStateAction<string | null>>;
  taskDetails: string | null;
  markTask: (id:string, status: TaskStatusType) => void;
  taskStatus: Record<string, TaskStatusType>;
}

function InTwoDaysTaskSection({ taskDetails, setTaskDetails, taskStatus, markTask }: InTwoDaysTaskSections){
  const { tasksInTwoDays: { tasks: tasksInTwoDays }} = useTaskContext();

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
               task={task} setTaskDetails={setTaskDetails} markTask={markTask} status={status} />
            )
          })}
        </ul>
       )
      }   
   </>
  )
}

export default InTwoDaysTaskSection;