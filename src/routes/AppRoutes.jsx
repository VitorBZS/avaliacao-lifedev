import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthValue } from '../contexts/AuthContext'
import PrivateRoute from './PrivateRoute'

// Pages
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Dashboard from '../pages/Dashboard/Dashboard'
import CreatePost from '../pages/CreatePost/CreatePost'
import Search from '../pages/Search/Search'
import Post from '../pages/Post/Post'
import EditPost from '../pages/EditPost/EditPost'

// components
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'

// styles
import './AppRoutes.css'

function AppRoutes() {
  const { user } = useAuthValue()

  return (
    <div className="container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/posts/edit/:id" element={user ? <EditPost /> : <Navigate to="/login" />} />
          <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default AppRoutes 