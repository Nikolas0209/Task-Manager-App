import NoTasksAssigned from "../../NoTasksAssigned";
import type { Task } from "../../../pages/HomePage";
import TodaysTaskList from "./TodaysTaskList";
import type {TaskStatusType} from '../../../pages/HomePage';

type TaskSections = {
 taskDetails: string | null;
 setTaskDetails: React.Dispatch<React.SetStateAction<string | null>>;
 taskStatus: Record<string, TaskStatusType>;
 markTask: (status: string) => void;
 markedTask: (status: string) => void;
 unmarkedTask: (status: string) => void;
 tasksToday: Task[];
 fetchTasksToday: () => Promise<void>;
};

function TodaysTaskSection({ taskDetails, setTaskDetails, taskStatus, markTask, markedTask, unmarkedTask, tasksToday, fetchTasksToday }: TaskSections ){

  return(
    <> 
     {tasksToday.length === 0 ? <NoTasksAssigned /> : (
       <ul className="todo-list">
         {tasksToday.map(task => {
           const isOpen = taskDetails === task.localId;

           const toggleTaskDetails = (): void => {
             setTaskDetails(prev => (prev === task.localId ? null : task.localId));
           };

           const status = taskStatus[task.localId] || 'not marked';

           return(
             <TodaysTaskList task={task} key={task.id} setTaskDetails={setTaskDetails} 
               fetchTasksToday={fetchTasksToday} isOpen={isOpen} toggleTaskDetails={toggleTaskDetails} 
               markTask={markTask} markedTask={markedTask} unmarkedTask={unmarkedTask} status={status} />
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