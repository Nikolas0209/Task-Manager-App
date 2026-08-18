import NoTasksAssigned from "../../NoTasksAssigned/NoTasksAssigned";
import TomorrowsTaskList from "./TomorrowsTaskList";
import { useTaskContext } from "../../../context/useTaskContext";
import type { TaskSection } from "../../../types/taskSectionType";
 
function TomorrowsTaskSection({taskDetails, setTaskDetails, taskStatus, markTask }: TaskSection ){
  const { tasksTomorrow: { tasks: tasksTomorrow }} = useTaskContext();

  return(
    <>
      {tasksTomorrow.length === 0 ? <NoTasksAssigned /> : (
        <ul className="todo-list">
         {tasksTomorrow.map(task => {
           const isOpen = taskDetails === task.localId;

           const toggleTaskDetails = (): void => {
             setTaskDetails(prev => (prev === task.localId ? null : task.localId));
           };

           const status = taskStatus[task.localId] || 'not marked';

           return(
             <TomorrowsTaskList task={task} key={task.id} isOpen={isOpen} 
               toggleTaskDetails={toggleTaskDetails} setTaskDetails={setTaskDetails} 
               markTask={markTask} status={status} />
            )
           })
          }
        </ul> 
       )
      }
    </>
  )
}

export default TomorrowsTaskSection;