import NoTasksAssigned from "../../NoTasksAssigned";
import YesterdaysTaskList from "../../../pages/YesterdaysTaskList";
import type { Task, TaskStatusType } from "../../../pages/HomePage";

type YesterdaysTaskSections = {
  tasksYesterday: Task[];
  setTaskDetails:  React.Dispatch<React.SetStateAction<string | null>>;
  taskDetails: string | null;
  fetchTasksYesterday: () => Promise<void>;
  markTask: (status: string) => void;
  markedTask: (status: string) => void;
  unmarkedTask: (status: string) => void;
  taskStatus: Record<string, TaskStatusType>;
}

function YesterdaysTaskSection({ taskDetails, setTaskDetails, taskStatus, markTask, markedTask, unmarkedTask, fetchTasksYesterday, tasksYesterday }: YesterdaysTaskSections){

  return(
    <>
     {tasksYesterday.length === 0 ? <NoTasksAssigned /> : ( 
       <ul className="todo-list">
         {tasksYesterday.map(task => {
           const isOpen = taskDetails === task.localId;

           const toggleTaskDetails = ():void => {
             setTaskDetails(prev => (prev === task.localId ? null : task.localId));
           }

           const status = taskStatus[task.localId] || 'not marked';
                
           return(
             <YesterdaysTaskList key={task.id} isOpen={isOpen} toggleTaskDetails={toggleTaskDetails} 
               tasksYesterday={tasksYesterday} task={task} fetchTasksYesterday={fetchTasksYesterday} 
               setTaskDetails={setTaskDetails} markTask={markTask} markedTask={markedTask}
               unmarkedTask={unmarkedTask} status={status} />
           )
          })}
        </ul>
       )
      }   
   </>
  )
}

export default YesterdaysTaskSection;