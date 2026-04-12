import { useState } from 'react'
import './App.css'
import TwitterFollowCard from './TwitterFollowCard.jsx'
function App() {
  const name  = useState('midudev');
  const users = [
    {
      username: 'midudev',
      name: 'Miguel Ángel Durán',
      isFollowing: true
    },
    {
      username: 'jonathan',
      name: 'Jonathan Ibáñez Piñero', 
      isFollowing: false
    },
    {
      username: 'Luis',
      name: 'Luis Ibáñez Piñero', 
      isFollowing: false
    }
  ]
  return (
    <>
      {
        users.map(user => {
          return <TwitterFollowCard key={user.username} username={user.username} name={user.name} initialIsFollowing={user.isFollowing} />
        })
      }
      {/* <TwitterFollowCard  username="midudev" name="Miguel Ángel Durán" initialIsFollowing  />
      <TwitterFollowCard username="jonathan" name="Jonathan Ibáñez Piñero"  /> */}
    </>
  )
}

export default App