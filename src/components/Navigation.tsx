import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type NavItem = {
  id: string
  label: string
  sectionId: string
  pagePath: string
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', sectionId: 'home', pagePath: '/' },
  { id: 'about', label: 'About', sectionId: 'about', pagePath: '/about' },
  { id: 'experience', label: 'Experience', sectionId: 'experience', pagePath: '/experience' },
  { id: 'projects', label: 'Projects', sectionId: 'projects', pagePath: '/projects' },
  { id: 'writing', label: 'Writing', sectionId: 'writing', pagePath: '/writing' },
  { id: 'contact', label: 'Contact', sectionId: 'contact', pagePath: '/contact' },
]

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (!el) return

  const offset = 80
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Navigation() {
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navigate = useNavigate()
  const location = useLocation()

  const isHomeRoute = location.pathname === '/'

  const handleNavClick = (item: NavItem) => {
    setMobileMenuOpen(false)

    // ✅ If already on Home, just scroll
    if (isHomeRoute) {
      scrollToSection(item.sectionId)
      setActiveSection(item.sectionId)
      return
    }

    // ✅ If on another page, navigate to Home + pass section in query string
    // HashRouter-safe URL: #/?section=about
    navigate(`/?section=${encodeURIComponent(item.sectionId)}`)
  }

  // ✅ Highlight based on route when NOT on Home
  const activeLabelForNonHome = useMemo(() => {
    if (isHomeRoute) return null
    const matched = navItems.find(n => n.pagePath === location.pathname)
    return matched?.sectionId ?? null
  }, [isHomeRoute, location.pathname])

  // ✅ On Home: update active underline while scrolling (IntersectionObserver)
  useEffect(() => {
    if (!isHomeRoute) return

    const sectionIds = navItems.map(n => n.sectionId)
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]

        if (visible?.target?.id) setActiveSection(visible.target.id)
      },
      {
        root: null,
        // tune for header height
        rootMargin: '-30% 0px -60% 0px',
        threshold: [0.1, 0.2, 0.3],
      }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [isHomeRoute])

  const isActive = (item: NavItem) => {
    if (isHomeRoute) return activeSection === item.sectionId
    return activeLabelForNonHome === item.sectionId
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => handleNavClick(navItems[0])}
              className="text-xl font-semibold text-foreground dark:text-white"
              aria-label="Go to Home"
            >
              SS
            </button>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="relative text-sm text-foreground/70 dark:text-white/70 hover:text-foreground dark:hover:text-white transition-colors"
                >
                  {item.label}
                  {isActive(item) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary dark:bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(v => !v)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden glass border-b border-white/20 dark:border-white/10"
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    isActive(item)
                      ? 'bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent font-medium'
                      : 'text-foreground/70 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
