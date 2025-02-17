
import './App.css';
import Home from './components/Page/Home';
import DeveloperList from './components/Page/DevloperList';
import { Route, Routes } from 'react-router-dom';
import TaskList from './components/Page/TaskList';
import Complete from './components/taskStates/Complete';
import Pending from './components/taskStates/Pending';
import Ongoing from './components/taskStates/Ongoing';
import TaskDetails from './components/Page/TaskDetails';
import AddNewTask from './components/forms/AddNewTask';
import AddDevelopers from './components/forms/AddDevlopers';
import AddNewProject from './components/forms/AddNewProject';
import Navbar from './components/Page/Navbar';



function App() {

  return (
    <div className="App">
      
      <Navbar  />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/developer/:id'element={<DeveloperList/>}/>
        <Route path='/alltask/:id'element={<TaskList/>}/>
        <Route path='/complete' element={<Complete/>}/>
        <Route path='/pending' element={<Pending/>}/>
        <Route path='/ongoing' element={<Ongoing/>}/>
        <Route path="/task/:taskId" element={<TaskDetails />} />
        <Route path='/addNewtask' element={<AddNewTask/>}/>
        <Route path='/addNewDevloper' element={<AddDevelopers/>}/>
        <Route path='/addNewProject' element={<AddNewProject/>}/>
        
      </Routes>
     
    </div>
  );
}

export default App;
