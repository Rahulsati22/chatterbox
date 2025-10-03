import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import Loader from './components/Loader'
import AllUsersPage from './pages/AllUsersPage'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from './stores/useUserStore'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
// Import your page components

const App = () => {
  const { userAuth, checkingAuth, checkAuth } = useUserStore()
  useEffect(() => {
    async function func() {
      await checkAuth()
    }
    func()
  }, [])
  return (
    checkingAuth ? <Loader /> : <BrowserRouter>
      <div className="min-h-screen" style={{ backgroundColor: '#ECE5DD' }}>
        <Navbar />
        <main className="pt-4">
          <Routes>
            <Route path='/' element={userAuth ? <HomePage /> : <Navigate to='/signin' />} />
            <Route path='/signup' element={!userAuth ? <SignupPage /> : <Navigate to='/' />} />
            <Route path='/signin' element={!userAuth ? <LoginPage /> : <Navigate to='/' />} />
            <Route path='/settings' element={userAuth ? <SettingsPage /> : <Navigate to='/signin' />} />
            <Route path='/profile' element={userAuth ? <ProfilePage /> : <Navigate to='/signin' />} />
            <Route path='/users' element={userAuth ? <AllUsersPage /> : <Navigate to='/signin' />} />

          </Routes>
        </main>
        <Toaster />
      </div>
    </BrowserRouter>
  )
}

export default App
