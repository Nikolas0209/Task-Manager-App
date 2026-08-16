import NoTasksAssigned from "../../NoTasksAssigned/NoTasksAssigned";
import type { TaskStatusType } from "../../../types/taskStatusType";
import type { Task } from '../../../types/taskType';
import TodaysTaskList from "./TodaysTaskList";
import type { TaskSource } from "../../../hooks/useTaskHistory";

type TaskSections = {
 taskDetails: string | null;
 setTaskDetails: React.Dispatch<React.SetStateAction<string | null>>;
 taskStatus: Record<string, TaskStatusType>;
 markTask: (status: string) => void;
 markedTask: (status: string) => void;
 unmarkedTask: (status: string) => void;
 fetchTasksToday: () => Promise<void>;
 moveTaskToHistory: (taskId: string, source: TaskSource) => Promise<void>;
 isLoading: boolean;
 tasksToday: Task[];
};

function TodaysTaskSection({ taskDetails, setTaskDetails, taskStatus, markTask, markedTask, unmarkedTask, tasksToday, fetchTasksToday, moveTaskToHistory, isLoading }: TaskSections ){

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
             <TodaysTaskList task={task} key={task.id} setTaskDetails={setTaskDetails} 
               fetchTasksToday={fetchTasksToday} isOpen={isOpen} toggleTaskDetails={toggleTaskDetails} 
               markTask={markTask} markedTask={markedTask} unmarkedTask={unmarkedTask} status={status} 
               moveTaskToHistory={moveTaskToHistory} isLoading={isLoading} 
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