import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
        <Header />

        <div className="content">
          <Sidebar />
          
          <div className="hotel-view">

          </div>
        </div>
      </div>      
    </>
  )
}

export default App
