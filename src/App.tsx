import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskHistory from './pages/TaskHistory';
import { TaskProvider } from './context/TaskProvider';

function App(){
 
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
         <Route index element={<HomePage />} />
         <Route path='/task-history' element={<TaskHistory />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
   
  )
}

export default App;
