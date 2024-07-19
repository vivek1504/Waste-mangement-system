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


function App() {
  return (
    <>
      <RecoilRoot>
      <Suspense fallback={<div>loading ...</div>}>
      <Navbar />
      <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/admin' element={<Admin></Admin>}></Route>
        <Route path='/cleanerDashboard' element={<CleanerPage></CleanerPage>}></Route>
        <Route path='/signin' element={<SignInPage></SignInPage>}></Route>
        <Route path='/cleanerSignin' element={<SignInCleaner></SignInCleaner>}></Route>
      </Routes>
      </BrowserRouter>
      <FooterComp></FooterComp>
      </Suspense>
      </RecoilRoot>
    </>
  )
}

export default App
