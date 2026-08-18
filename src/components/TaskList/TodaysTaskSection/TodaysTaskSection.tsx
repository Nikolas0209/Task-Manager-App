import NoTasksAssigned from "../../NoTasksAssigned/NoTasksAssigned";
import TodaysTaskList from "./TodaysTaskList";
import { useTaskContext } from "../../../context/useTaskContext";
import type { TaskSection } from "../../../types/taskSectionType";

function TodaysTaskSection({ taskDetails, setTaskDetails, taskStatus, markTask }: TaskSection ){
  const {tasksToday: { tasks: tasksToday }} = useTaskContext();

  return(
    <> 
     {tasksToday.length === 0 ? <NoTasksAssigned /> : (
       <ul className="todo-list">
         {tasksToday.map((task, index) => {
           const isOpen = taskDetails === task.localId;

           const toggleTaskDetails = (): void => {
             setTaskDetails(prev => (prev === task.localId ? null : task.localId));
           };

           const status = taskStatus[task.localId] || 'not marked';

           return(
             <TodaysTaskList task={task} key={task.id} setTaskDetails={setTaskDetails} isOpen={isOpen} 
               toggleTaskDetails={toggleTaskDetails} markTask={markTask} status={status} 
               columnClass={index === 0 ? 'first-column' : ''} />
            )
           })
         }
       </ul>
       )
      }
   </>
  )
};

export default TodaysTaskSection;