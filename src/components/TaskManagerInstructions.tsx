import './TaskManagerInstructions.css';

type Instructions = {
  toggleInstructions: () => void
}

function TaskManagerInstructions({ toggleInstructions }: Instructions){
  return(
    <div className="instructions-section">
      <div className="instructions-go-back-button-wrapper">
       <button className="instructions-go-back-button" 
         onClick={toggleInstructions}>
          Go Back
       </button>
      </div>
      <div className="instructions-on">
         Welcome to instructions
      </div>
    </div>
  )
}

export default TaskManagerInstructions;