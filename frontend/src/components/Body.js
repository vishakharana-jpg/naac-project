import React from 'react'
import Sidebar from './Sidebar'
import FaculityPage from '../pages/FaculityPage.js'

const Body = () => {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <FaculityPage />
      </div>
    </div>
  )
}

export default Body;