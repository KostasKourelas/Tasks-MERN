import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShowTasks from './pages/ShowTasks';
import DeleteTask from './pages/DeleteTask';
import EditTask from './pages/EditTask';
import CreateTask from './pages/CreateTask';
import TaskBoard from './pages/TaskBoard';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/tasks/board' element={<TaskBoard />} />
      <Route path='/tasks/create' element={<CreateTask />} />
      <Route path='/tasks/details/:id' element={<ShowTasks />} />
      <Route path='/tasks/edit/:id' element={<EditTask />} />
      <Route path='/tasks/delete/:id' element={<DeleteTask />} />
    </Routes>
  )
}

export default App