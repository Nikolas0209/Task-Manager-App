import NoTasksAssigned from "../../NoTasksAssigned";
import TomorrowsTaskList from "../../../pages/TomorrowsTaskList";
import type {Task, TaskStatusType } from '../../../pages/HomePage';

type TodaysTaskSections = {
 tasksTomorrow: Task[];
 taskDetails: string | null;
 setTaskDetails: React.Dispatch<React.SetStateAction<string | null>>;
 taskStatus: Record<string, TaskStatusType>;
 markTask: (status: string) => void;
 markedTask: (status: string) => void;
 unmarkedTask: (status: string) => void;
 fetchTasksTomorrow: () => Promise<void>;
}

function TomorrowsTaskSection({ tasksTomorrow, taskDetails, setTaskDetails, taskStatus, fetchTasksTomorrow, markTask, markedTask, unmarkedTask }: TodaysTaskSections ){

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
               setTaskDetails={setTaskDetails} markTask={markTask} markedTask={markedTask}
               unmarkedTask={unmarkedTask}  status={status} />
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