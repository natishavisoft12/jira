import logo from './logo.svg';
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

function App() {
  return (
    <div className="App">
      
   
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/developer/:id'element={<DeveloperList/>}/>
        <Route path='/alltask/:id'element={<TaskList/>}/>
        <Route path='/complete' element={<Complete/>}/>
        <Route path='/pending' element={<Pending/>}/>
        <Route path='/ongoing' element={<Ongoing/>}/>
        <Route path="/task/:taskId" element={<TaskDetails />} />
        <Route path='/addNewtask' element={<AddNewTask/>}/>
        
      </Routes>
     
    </div>
  );
}

export default App;
// {
//   "listOfProjects": [
//     {
//       "id": "1",
//       "name": "project1",
//       "listOfDevelopers": [
//         {
//           "devID": "",
//           "devName": "",
//           "listOfTasks": [
//             {
//               "taskId": "",
//               "taskName": "",
//               "status": "pending"
//             },
//             {
//               "taskId": "",
//               "taskName": "",
//               "status": "qa"
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "project2": {}
//     }
//   ]
// }