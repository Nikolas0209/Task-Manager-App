import './TaskHistory.css';
import { useNavigate } from 'react-router-dom';

function TaskHistory(){
  const navigate = useNavigate();
 
  const goBack = (): void => {
   navigate('/');
  }

  return(
   <>
    Some Text
    <button onClick={goBack}>Go Back</button>
   </>
  )
}

export default TaskHistory;