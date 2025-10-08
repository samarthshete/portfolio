import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Download, Github, Linkedin, Twitter } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Thank you for your message! I\'ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-foreground/60 dark:text-white/60 max-w-2xl">
            Let's connect! Whether you have a project in mind or just want to chat about tech.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-foreground dark:text-white mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 dark:bg-accent/10 rounded-lg">
                      <Mail className="w-5 h-5 text-primary dark:text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/50 dark:text-white/50">Email</p>
                      <a
                        href="mailto:samarth@example.com"
                        className="text-foreground dark:text-white hover:text-primary dark:hover:text-accent transition-colors"
                      >
                        samarth@example.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 dark:bg-accent/10 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary dark:text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/50 dark:text-white/50">Location</p>
                      <p className="text-foreground dark:text-white">San Francisco, CA</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 dark:bg-accent/10 rounded-lg">
                      <Phone className="w-5 h-5 text-primary dark:text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/50 dark:text-white/50">Phone</p>
                      <p className="text-foreground dark:text-white">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground dark:text-white mb-4">
                  Social Links
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-primary/10 dark:hover:bg-accent/10 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5 text-foreground dark:text-white" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-primary/10 dark:hover:bg-accent/10 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-foreground dark:text-white" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-primary/10 dark:hover:bg-accent/10 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5 text-foreground dark:text-white" />
                  </a>
                </div>
              </div>

              <div>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary dark:bg-accent text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-semibold text-foreground dark:text-white mb-6">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground dark:text-white mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent outline-none transition-all text-foreground dark:text-white"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground dark:text-white mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent outline-none transition-all text-foreground dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground dark:text-white mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent outline-none transition-all text-foreground dark:text-white resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary dark:bg-accent text-white rounded-lg font-medium hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
