import NoTasksAssigned from "../../NoTasksAssigned/NoTasksAssigned";
import type { TaskStatusType } from "../../../types/taskStatusType";
import TodaysTaskList from "./TodaysTaskList";
import { useTaskContext } from "../../../context/useTaskContext";

type TaskSections = {
 taskDetails: string | null;
 setTaskDetails: React.Dispatch<React.SetStateAction<string | null>>;
 taskStatus: Record<string, TaskStatusType>;
 markTask: (id:string, status: TaskStatusType) => void;
};

function TodaysTaskSection({ taskDetails, setTaskDetails, taskStatus, markTask }: TaskSections ){
  const {tasksToday: { tasks: tasksToday }} = useTaskContext()

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