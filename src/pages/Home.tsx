import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import {
  ArrowRight,
  Github,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Download,
  Linkedin,
  Twitter,
} from 'lucide-react'
import { WritingSection } from './Writing'
import { AboutSection } from './About'
import { ExperienceSection } from './Experience'
import { useNavigate } from 'react-router-dom'
import { projectsData, type Project } from './ProjectDetail'

const roles = ['AI/ML Engineer', 'Software Engineer', 'Cloud Architect', 'Full-Stack Developer']

// ✅ Only 3 featured projects on Home
const FEATURED_IDS = ['interviewiq', 'smarthire-ai', 'cloud-native-3tier']

export default function Home() {
  const navigate = useNavigate()

  // Single source of truth
  const allProjects: Project[] = useMemo(() => Object.values(projectsData), [])

  // Pick featured by explicit IDs (stable + intentional)
  const featuredProjects: Project[] = useMemo(() => {
    return FEATURED_IDS.map((id) => allProjects.find((p) => p.id === id)).filter(Boolean) as Project[]
  }, [allProjects])

  const [currentRole, setCurrentRole] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    const interval = setInterval(() => setCurrentRole((prev) => (prev + 1) % roles.length), 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert("Thank you for your message! I'll get back to you soon.")
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return
    const offset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }

  const ProjectCard = (project: Project, index: number) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group glass-card rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
      onClick={() => navigate(`/projects/${project.id}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') navigate(`/projects/${project.id}`)
      }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Hover CTA */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between">
            <span className="text-white/90 text-sm font-medium">Open Case Study</span>
            <span className="inline-flex items-center gap-2 text-white font-semibold">
              View <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-foreground dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        <p className="text-foreground/60 dark:text-white/60 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags (limit for clean UI) */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.slice(0, 6).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-background/50 dark:bg-background/30 text-foreground/70 dark:text-white/70 text-sm rounded-xl backdrop-blur-sm border border-white/10 dark:border-white/10"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 6 && (
            <span className="px-3 py-1.5 text-foreground/50 dark:text-white/50 text-sm">
              +{project.tags.length - 6} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href={project.github || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-foreground/60 dark:text-white/60 hover:text-primary dark:hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href={project.demo || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-foreground/60 dark:text-white/60 hover:text-primary dark:hover:text-accent transition-colors"
              aria-label="Live Demo"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>

          <div className="inline-flex items-center gap-2 text-primary dark:text-accent font-medium">
            View <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="relative">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground dark:text-white mb-6"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Samarth Shete
              </span>
            </motion.h1>

            <motion.div
              className="h-16 flex items-center justify-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.p
                key={currentRole}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground/70 dark:text-white/70"
              >
                {roles[currentRole]}
              </motion.p>
            </motion.div>

            <motion.p
              className="text-xl sm:text-2xl text-foreground/60 dark:text-white/60 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Building calm, fast software — from ML systems to delightful UIs.
            </motion.p>

            <motion.p
              className="text-lg text-foreground/50 dark:text-white/50 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              I design and ship AI-powered, cloud-native software with measurable impact.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 bg-primary dark:bg-accent text-white rounded-2xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 glass-card text-foreground dark:text-white rounded-2xl font-medium hover:scale-105 transition-all duration-200"
              >
                Get in Touch
              </button>
            </motion.div>

            <motion.div
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[
                { label: 'Python', value: 'Expert' },
                { label: 'Machine Learning', value: 'Advanced' },
                { label: 'AWS/Cloud', value: 'Proficient' },
                { label: 'React', value: 'Advanced' },
              ].map((skill, index) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.08 }}
                  className="text-center"
                >
                  <p className="text-sm text-foreground/40 dark:text-white/40 mb-1">
                    {skill.label}
                  </p>
                  <p className="text-lg font-semibold text-foreground dark:text-white">
                    {skill.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <AboutSection />
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <ExperienceSection />
        </div>
      </section>

      {/* Projects (ONLY 3 on Home) */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-foreground/60 dark:text-white/60 max-w-2xl">
              Projects that best represent my engineering depth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((p, i) => ProjectCard(p, i))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="group px-8 py-4 glass-card text-foreground dark:text-white rounded-2xl font-medium hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
            >
              View All Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Writing */}
      <section id="writing" className="py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <WritingSection limit={4} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-foreground/60 dark:text-white/60 max-w-2xl">
              Let&apos;s connect! Whether you have a project in mind or just want to chat about tech.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground dark:text-white mb-6">
                    Contact Information
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 dark:bg-accent/10 rounded-2xl">
                        <Mail className="w-5 h-5 text-primary dark:text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground/50 dark:text-white/50">Email</p>
                        <a
                          href="mailto:samarth.shete@gwu.edu"
                          className="text-foreground dark:text-white hover:text-primary dark:hover:text-accent transition-colors"
                        >
                          samarth.shete@gwu.edu
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 dark:bg-accent/10 rounded-2xl">
                        <MapPin className="w-5 h-5 text-primary dark:text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground/50 dark:text-white/50">Location</p>
                        <p className="text-foreground dark:text-white">Washington, DC</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 dark:bg-accent/10 rounded-2xl">
                        <Phone className="w-5 h-5 text-primary dark:text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground/50 dark:text-white/50">Phone</p>
                        <p className="text-foreground dark:text-white">+1 (703) 928-9684</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-foreground dark:text-white mb-4">
                    Social Links
                  </h4>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/samarthshete"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass-card rounded-2xl hover:scale-110 transition-all"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5 text-foreground dark:text-white" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/samarthshete14/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass-card rounded-2xl hover:scale-110 transition-all"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-foreground dark:text-white" />
                    </a>
                    
                  </div>
                </div>

                <div>
                  <a
                    href="https://drive.google.com/file/d/1pNvMtolarKJhtX-VyEL3O3QXxHnWkvLb/view?usp=sharing"
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary dark:bg-accent text-white rounded-2xl font-medium hover:shadow-lg transition-all hover:scale-105"
                  >
                    <Download className="w-5 h-5" />
                    Download Resume
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22 }}
            >
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-2xl font-semibold text-foreground dark:text-white mb-6">
                  Send a Message
                </h3>

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
                      className="w-full px-4 py-3 bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent outline-none transition-all text-foreground dark:text-white"
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
                      className="w-full px-4 py-3 bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent outline-none transition-all text-foreground dark:text-white"
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
                      className="w-full px-4 py-3 bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent outline-none transition-all text-foreground dark:text-white resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary dark:bg-accent text-white rounded-2xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
