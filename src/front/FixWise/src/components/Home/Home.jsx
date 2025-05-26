import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import MainContent from '../Dashboard/Dashboard'

const Home = () => {
  return (
    <div className='flex  min-h-screen'>
        <Sidebar />
        <MainContent />
    </div>
  )
}

export default Home
