import React from 'react'
import Content1 from './DashboardComp/Content1/Content1.js'
import Content3 from './DashboardComp/Content3/Content3.js'
import './CSS/Notes/Notes.css'

export default function Notes() {
  return (
    <div className='subHome'>
      <Content1 className="homeCon1"></Content1>
      <Content3 className="homeCon3"></Content3>
    </div>
  )
}
