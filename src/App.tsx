import './App.css'
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskHistory from './pages/TaskHistory';

function App() {
 
  return (
    <BrowserRouter>
     <Routes>
       <Route index element={<HomePage />} />
       <Route path='/task-history' element={<TaskHistory />} />
     </Routes>
      
    </BrowserRouter>
   
  )
}

export default App
