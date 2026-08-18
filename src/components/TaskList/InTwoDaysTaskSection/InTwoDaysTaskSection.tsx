import NoTasksAssigned from "../../NoTasksAssigned/NoTasksAssigned";
import InTwoDaysTaskList from './InTwoDaysTaskList';
import { useTaskContext } from "../../../context/useTaskContext";
import type { TaskSection } from "../../../types/taskSectionType";

function InTwoDaysTaskSection({ taskDetails, setTaskDetails, taskStatus, markTask }: TaskSection){
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