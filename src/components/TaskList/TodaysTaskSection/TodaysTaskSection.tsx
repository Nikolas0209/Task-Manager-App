import NoTasksAssigned from "../../NoTasksAssigned/NoTasksAssigned";
import type { TaskStatusType } from "../../../types/taskStatusType";
import type { Task, TaskSource } from '../../../types/taskType';
import TodaysTaskList from "./TodaysTaskList";

type TaskSections = {
 taskDetails: string | null;
 setTaskDetails: React.Dispatch<React.SetStateAction<string | null>>;
 taskStatus: Record<string, TaskStatusType>;
 markTask: (id:string, status: TaskStatusType) => void;
 fetchTasksToday: () => Promise<void>;
 moveTaskToHistory: (taskId: string, source: TaskSource) => Promise<void>;
 isLoading: boolean;
 tasksToday: Task[];
};

function TodaysTaskSection({ taskDetails, setTaskDetails, taskStatus, markTask, tasksToday, fetchTasksToday, moveTaskToHistory, isLoading }: TaskSections ){

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
               markTask={markTask} status={status} moveTaskToHistory={moveTaskToHistory} isLoading={isLoading} 
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