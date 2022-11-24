import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import './App.css';

const App: React.FC = () => {

  return (
    <>
      <Routes>
        <Route path='/' index element={<Login />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
