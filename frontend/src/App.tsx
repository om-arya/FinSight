import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from 'axios';

import {API_URL, getUser} from './api/UserAPI.ts';
import './App.css';

const App: React.FC = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}users`)
    .then(response => {
      setName(response.data.name);
    })
    .catch(error => console.log(error));
  }, []);
  
  return (
    <>
      <h1>Welcome to FinSight</h1>
      <h2>Get started now.</h2>
      <Router>
        <Link className="signup" to="/signup">Sign Up</Link>

        <Routes>
          <Route path="/signup" element={< App />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
