import { useEffect, useState } from 'react'
import './App.css'
import './output.css';
import { BrowserRouter } from 'react-router-dom';
import Pages from './Pages/Pages';


function App() {    
  
  const [data, setData] =useState([])

  useEffect(() =>
    {
      fetch('http://localhost:8081/users')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
    }, [])

  return (
   <div>
      <BrowserRouter>
          <Pages></Pages>
      </BrowserRouter>
   </div>
  )
}

export default App
