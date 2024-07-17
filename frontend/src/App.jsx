import './App.css'
import Camera from './components/Camera'
import Navbar from './components/Navbar'
import Card from './pages/Card'
import UserLogin from './components/UserLogin'
import UserPage from './pages/UserPage'
import CardAssign from './components/cards/CardAssign'
import CardChecking from './components/cards/CardChecking'
import CardAssignAgain from './components/cards/CardAssignAgain'
import Tab from './components/tab/Tab'

function App() {
  return (
    <>
      <Navbar />
      {/* <Card /> */}
      <CardAssign/>
      <CardAssignAgain/>
      <CardChecking/>
      {/* <Camera /> */}
      <UserLogin />
      {/* <UserPage/> */}
      <Tab/>
    </>
  )
}

export default App
