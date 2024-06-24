import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

const apiUrl = "http://localhost:8080/";
function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get(apiUrl + "users")
    .then(response => {
      setName(response.data.name);
    })
    .catch(error => console.log(error));
  }, []);
  

  return (
    <>
      <h1>Someone named { name } used this app.</h1>
    </>
  )
}

export default App
