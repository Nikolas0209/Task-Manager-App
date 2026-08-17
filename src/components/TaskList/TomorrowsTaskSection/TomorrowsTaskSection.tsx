import NoTasksAssigned from "../../NoTasksAssigned/NoTasksAssigned";
import TomorrowsTaskList from "./TomorrowsTaskList";
import type { TaskStatusType } from '../../../types/taskStatusType';
import type { Task, TaskSource } from '../../../types/taskType';
 
type TodaysTaskSections = {
 tasksTomorrow: Task[];
 taskDetails: string | null;
 setTaskDetails: React.Dispatch<React.SetStateAction<string | null>>;
 taskStatus: Record<string, TaskStatusType>;
 markTask: (id:string, status: TaskStatusType) => void;
 fetchTasksTomorrow: () => Promise<void>;
 moveTaskToHistory: (taskId: string, source: TaskSource) => void;
 isLoading: boolean
}

function TomorrowsTaskSection({ tasksTomorrow, taskDetails, setTaskDetails, taskStatus, fetchTasksTomorrow, markTask,  moveTaskToHistory, isLoading }: TodaysTaskSections ){

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
               toggleTaskDetails={toggleTaskDetails} fetchTasksTomorrow={fetchTasksTomorrow} 
               setTaskDetails={setTaskDetails} markTask={markTask} status={status}
               moveTaskToHistory={moveTaskToHistory} isLoading={isLoading} />
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