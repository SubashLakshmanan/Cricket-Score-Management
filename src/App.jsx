import { useState } from 'react'
import './App.css'

import Home from './Pages/Home'
import Tournament from './Pages/Tournament'
import New from './Pages/New_tournament'
import History from './Pages/History'
import Players from './Pages/Players'
import Match from './Pages/Match'
import {Route,Routes} from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element ={<Home/>} />  
        <Route path = '/tournament/:noOfOvers' element ={<Tournament/>} />
        <Route path = '/new_tournament' element ={<New/>} />
        <Route path = '/history' element ={<History/>} />
        <Route path='/match/:t1/:t2/:id1/:over' element={<Match/>} />
        <Route path = '/players/:id/:nop/:name' element ={<Players/>} />
      </Routes> 
    </>
  )
}

export default App
