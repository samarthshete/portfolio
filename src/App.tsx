import { ThemeProvider } from './context/ThemeContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'

function App() {
  return (
    <ThemeProvider>
      <div className="relative">
        <Navigation />
        <Home />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
