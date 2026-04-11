import './App.css'
import TwitterFollowCard from './TwitterFollowCard.jsx'
function App() {
  return (
    <>
      <TwitterFollowCard  username="midudev" name="Miguel Ángel Durán"isFollwing={true}  />
      <TwitterFollowCard username="jonathan" name="Jonathan Ibáñez Piñero" isFollwing />
    </>
  )
}

export default App