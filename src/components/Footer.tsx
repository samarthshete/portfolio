import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-foreground/60 dark:text-white/60">
              © {new Date().getFullYear()} Samarth Shete. All rights reserved.
            </p>
            <p className="text-xs text-foreground/40 dark:text-white/40 mt-1">
              Chai &gt; Coffee — always. ☕
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/samarthshete"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-foreground/70 dark:text-white/70" />
            </a>
            <a
              href="https://www.linkedin.com/in/samarthshete14/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-foreground/70 dark:text-white/70" />
            </a>
            <a
              href="mailto:samarthshete1420@gmail.com"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-foreground/70 dark:text-white/70" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
