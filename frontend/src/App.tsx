import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './Navbar.tsx';
import Home from './home/Home.tsx';
import Dashboard from './dashboard/Dashboard.tsx';
import Portfolio from './portfolio/Portfolio.tsx';
import About from './about/About.tsx';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Home /> }></Route>
        <Route path="/dashboard" element={ <Dashboard /> }></Route>
        <Route path="/portfolio" element={ <Portfolio /> }></Route>
        <Route path="/about" element={ <About /> }></Route>
      </Routes>
    </>
  )
}

export default App
