import { AuthContextProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import AppRoutes from './routes/AppRoutes'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <div className="app">
          <AppRoutes />
        </div>
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default App
