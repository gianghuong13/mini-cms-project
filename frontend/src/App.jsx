import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch("http://localhost:1337/api/ping")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage("Error calling API"))
  }, []);

  return (
    <>
      <h1>Welcome to My CMS</h1>
      <p>Ping result: {message}</p>
    </>
  )
}

export default App
