import './App.css'
import { FooterComp } from './components/FooterComp'
import Navbar from './components/Navbar'
import {RecoilRoot} from 'recoil'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './components/userTab/tab/Dashboard'
import { Admin } from './pages/Admin'
import { CleanerPage } from './pages/CleanerPage'
import { Suspense } from 'react'
import SignInCleaner from './pages/SigninCleaner'
import { SignInPage } from './pages/SignInUser'
import { HeroParallaxDemo } from './components/HeroSection/HeroParallaxDemo'
import { LampDemo } from './components/LampSection/LampDemo'
import Buttons from './Buttons'
import { HeroParallax } from './components/HeroSection/HeroParallax'
import { LoginUser } from './pages/LoginUser'
import { CleanerLogin } from './pages/LoginCleaner'


function App() {
  return (
    <>
      <RecoilRoot>
      <Suspense fallback={<div>loading ...</div>}>
      <Navbar />
      <BrowserRouter>
      <Routes>
        <Route path='/userDashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/admin' element={<Admin></Admin>}></Route>
        <Route path='/cleanerDashboard' element={<CleanerPage></CleanerPage>}></Route>
        <Route path='/usersignin' element={<SignInPage></SignInPage>}></Route>
        <Route path='/cleanerSignin' element={<SignInCleaner></SignInCleaner>}></Route>
        <Route path='/' element={<HeroParallaxDemo></HeroParallaxDemo>}></Route>
        <Route path='/userlogin' element={<LoginUser></LoginUser>}></Route>
        <Route path='/cleanerlogin' element={<CleanerLogin></CleanerLogin>}></Route>
      </Routes>
      </BrowserRouter>
      </Suspense>
      </RecoilRoot>
      <FooterComp></FooterComp>

    </>
  )
}

export default App
