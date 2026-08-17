import NoTasksAssigned from "../../NoTasksAssigned/NoTasksAssigned";
import TomorrowsTaskList from "./TomorrowsTaskList";
import type { TaskStatusType } from '../../../types/taskStatusType';
import { useTaskContext } from "../../../context/useTaskContext";
 
type TodaysTaskSections = {
 taskDetails: string | null;
 setTaskDetails: React.Dispatch<React.SetStateAction<string | null>>;
 taskStatus: Record<string, TaskStatusType>;
 markTask: (id:string, status: TaskStatusType) => void;
}

function TomorrowsTaskSection({taskDetails, setTaskDetails, taskStatus, markTask }: TodaysTaskSections ){
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