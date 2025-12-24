import './TaskManagerInstructions.css';

type Instructions = {
  toggleInstructions: () => void
};

function TaskManagerInstructions({ toggleInstructions }: Instructions){
  return(
    <div className="instructions-container">
      <div className="instructions-go-back-button-wrapper">
       <button className="instructions-go-back-button" 
         onClick={toggleInstructions}>
          Go Back
       </button>
      </div>
      <div className="instructions-on">

      <h3>Welcome to the Task Manager App</h3>
    
      <section className="instructions-text-container">
        <p className="instructions-paragraphs"> 
          This guide explains how to use the app efficiently and understand its core features.
        </p>

        <section className="instructions-sections"> 
          <span>Getting Started:</span>
            <ul> 1.	Use the input field at the top to type a new task.</ul>
            <ul> 2.	Choose when the task should be added:</ul>
             <li>•	Add to Today – adds the task to today’s list</li>
             <li>•	Add to Tomorrow – schedules the task for tomorrow</li>
             <li>• Add in Two Days – schedules the task two days ahead</li>  
        </section>

       <section className="instructions-sections">
        <span>Task Columns Overview:</span>
          <ul>The app is divided into three main columns:</ul>
            <li>•	Yesterday – completed or past tasks</li>
            <li>•	Today – tasks you should focus on now</li>
            <li>• Tomorrow – upcoming tasks</li>  

          <p className="instructions-paragraphs">
            Tasks automatically belong to one of these columns based on how they were added.
          </p>
       </section>

       <section className="instructions-sections">
         <span>Task Status:</span>
           <ul>Each task can have three visual states:</ul>
            <li>• Finished → 🟢 Green text</li>
            <li>• Unfinished → 🔴 Red text</li>
            <li>• Neutral → ⚫ Default (black) text</li>

          <p className="instructions-paragraphs">
            You can switch between these states using the action buttons on each task.
          </p>
       </section>

       <section className="instructions-sections"> 
         <span> Task Details:</span>
           <li>• Click on a task to open its details menu.</li>
           <li>• Only one task’s details can be open at a time.</li>
           <li>• Clicking the same task again will close the details.</li>
       </section>

       <section className="instructions-sections">
         <span>Managing Tasks:</span>
           <li>• Delete a task to remove it permanently.</li>
           <li>• The task list refreshes automatically after every change.</li>
       </section>

       <section className="instructions-sections">
         <span>Task History:</span>
           <li>• Click “See all previous tasks” to review older tasks and track your progress.</li>
       </section>
    
       <section className="instructions-sections">
          <span>Instructions Panel:</span>
            <li>• Click Instructions to open this guide.</li>
            <li>• While instructions are open, the background is blurred.</li>
            <li>• Click Go Back to return to the app.</li>
       </section>

       <section className="instructions-sections">
         <span>Tips for better better user expirience:</span>
           <li>•	Keep tasks short and clear.</li>
           <li>•	Use task states instead of deleting tasks to track progress.</li>
           <li>•	Plan ahead using the Tomorrow and Two Days options.</li>
       </section> 

       <p className="instructions-paragraphs">
          Happy organizing!
       </p>
    </section>
  </div>
</div>
)
}

export default TaskManagerInstructions;