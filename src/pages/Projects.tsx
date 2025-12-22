import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Github, ExternalLink } from 'lucide-react'
import { projectsData, type Project } from './ProjectDetail'
import { useMemo } from 'react'

export default function Projects() {
  const navigate = useNavigate()

  const allProjects: Project[] = useMemo(() => {
    // Optional: sort newest first (based on your `date` string this may not be reliable)
    // For now keep stable order from object values
    return Object.values(projectsData)
  }, [])

  const goToProject = (id: string) => navigate(`/projects/${id}`)

  const ProjectCard = (project: Project, index: number) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <div
        onClick={() => goToProject(project.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') goToProject(project.id)
        }}
        role="link"
        tabIndex={0}
        className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] cursor-pointer outline-none"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-semibold text-foreground dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-accent transition-colors">
            {project.title}
          </h3>

          <p className="text-foreground/60 dark:text-white/60 mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech tags (keep) */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.slice(0, 8).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-foreground/70 dark:text-white/70 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
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

            <div className="flex items-center gap-2 text-primary dark:text-accent group-hover:gap-3 transition-all">
              <span className="text-sm font-medium">View</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
            Projects
          </h1>
          <p className="text-xl text-foreground/60 dark:text-white/60 max-w-2xl">
            Full catalog — case studies, architecture decisions, and measurable impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {allProjects.map((p, i) => ProjectCard(p, i))}
        </div>
      </div>
    </div>
  )
}
