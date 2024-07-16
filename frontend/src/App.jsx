import './App.css'
import Camera from './components/Camera'
import Navbar from './components/Navbar'
import Card from './pages/Card'
import Cards from './pages/Cards'
import DriverCard from './pages/DriverCard'
import UserLogin from './pages/UserLogin'

function App() {
  return (
    <>
      <Navbar />
      {/* <Card /> */}
      <Cards />
      <Camera />
      <DriverCard />
      <UserLogin />
    </>
  )
}

export default App
