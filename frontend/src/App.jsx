import './App.css'
import Camera from './components/userTab/userCamera/Camera'
import Navbar from './components/Navbar'
import Card from './pages/Card'

import SignIn from './pages/SignIn'
import UserLogin from './components/UserLogin'
import UserPage from './pages/UserPage'
import CardAssign from './components/cards/CardAssign'
import CardChecking from './components/cards/CardChecking'
import CardAssignAgain from './components/cards/CardAssignAgain'
import Tab from './components/userTab/tab/Tab'
import CardDone from './components/cards/CardDone'


function App() {
  return (
    <>
      <Navbar />
      {/* <Card /> */}
      {/* <CardAssign/>
      <CardDone/> */}
      {/* <CardAssignAgain/>
      <CardChecking/> */}
      {/* <Camera /> */}
      {/* <UserLogin /> */}
      {/* <UserPage/> */}
      <Tab/>
    </>
  )
}

export default App
