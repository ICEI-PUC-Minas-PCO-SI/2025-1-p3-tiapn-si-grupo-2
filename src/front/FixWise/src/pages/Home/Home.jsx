import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header'
import MainContent from '../../components/Dashboard/Dashboard'

const Home = () => {
  return (
    <div className='flex  min-h-screen'>
        <Sidebar />
        <MainContent />
    </div>
  )
}

export default Home
