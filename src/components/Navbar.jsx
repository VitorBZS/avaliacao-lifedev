import styles from './Navbar.module.css'
import { NavLink } from "react-router-dom"
import { useAuthValue } from '../contexts/AuthContext'
import { useAuthentication } from '../hooks/useAuthentication'
import { useTheme } from '../contexts/ThemeContext'

export const Navbar = () => {
  const { user } = useAuthValue()
  const { logout } = useAuthentication()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className={styles.navbar}>
      <ul className={styles.links_list}>
        <NavLink to="/" className={styles.brand} activeclassname={styles.active}>
          <li><span className={styles.nav_life}>Life</span>Dev</li>
        </NavLink>
        {!user && (
          <>
            <NavLink to="/login" className={styles.link} activeclassname={styles.active}>
              <li>Login</li>
            </NavLink>
            <NavLink to="/register" className={styles.link} activeclassname={styles.active}>
              <li>Register</li>
            </NavLink>
          </>
        )}
        {user && (
          <>
            <NavLink to="/dashboard" className={styles.link} activeclassname={styles.active}>
              <li>Dashboard</li>
            </NavLink>
            <NavLink to="/posts/create" className={styles.link} activeclassname={styles.active}>
              <li>Novo Post</li>
            </NavLink>
            <button onClick={logout} className={styles.exit}>Sair</button>
          </>
        )}
      </ul>
      <button onClick={toggleTheme} className={styles.theme_toggle}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </nav>
  )
}

export default Navbar