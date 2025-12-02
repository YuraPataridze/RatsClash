import Header from './comp/Header/Header'
import PlayField from './comp/PlayField/PlayField'
import './App.css'
import {useState } from 'react'

export default function App() {
  const [user_name, set_user_name] = useState<string>("pataridze19")

  return (
    <div className='App'>
      <div className="header">
        <Header userName={user_name}/>
      </div>
       <div className="play-field">
        <PlayField />
       </div>
    </div>
  )
}
