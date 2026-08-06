import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Github, ExternalLink } from 'lucide-react'
import { projectsData, type Project } from './ProjectDetail'
import { useMemo } from 'react'
import {
  FEATURED_PROJECT_IDS,
  PROJECT_CATEGORY_MAP,
  PROJECT_TOPIC_SECTIONS,
  type ProjectTopicCategory,
} from '../lib/projectCategories'

const isExternalUrl = (url?: string) => /^https?:\/\//.test(url ?? '')

type ProjectCardProps = {
  project: Project
  index: number
  featured?: boolean
  onOpen: (id: string) => void
}

function ProjectCard({ project, index, featured = false, onOpen }: ProjectCardProps) {
  const hasGithub = isExternalUrl(project.github)
  const hasDemo = isExternalUrl(project.demo)

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <div
        onClick={() => onOpen(project.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onOpen(project.id)
        }}
        role="link"
        tabIndex={0}
        className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] cursor-pointer outline-none h-full flex flex-col"
      >
        <div className={`relative overflow-hidden ${featured ? 'h-56' : 'h-48'}`}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-2xl font-semibold text-foreground dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-accent transition-colors">
            {project.title}
          </h3>

          <p className="text-foreground/60 dark:text-white/60 mb-4 line-clamp-2">
            {project.description}
          </p>

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

          <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {(hasGithub || hasDemo) && (
              <div className="flex flex-wrap items-center gap-2">
                {hasGithub && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-foreground/70 dark:text-white/70 hover:text-primary dark:hover:text-accent transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
                {hasDemo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent hover:bg-primary/15 dark:hover:bg-accent/15 transition-colors"
                    aria-label="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 text-primary dark:text-accent group-hover:gap-3 transition-all sm:ml-auto">
              <span className="text-sm font-medium">View</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectSection({
  title,
  projects,
  featured = false,
  onOpen,
  sectionIndex,
}: {
  title: string
  projects: Project[]
  featured?: boolean
  onOpen: (id: string) => void
  sectionIndex: number
}) {
  if (projects.length === 0) return null

  return (
    <section className={sectionIndex > 0 ? 'mt-16' : undefined} aria-labelledby={`projects-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: sectionIndex * 0.05 }}
        className="mb-8"
      >
        <h2
          id={`projects-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="text-2xl sm:text-3xl font-semibold text-foreground dark:text-white"
        >
          {title}
        </h2>
      </motion.div>

      <div
        className={
          featured
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'grid grid-cols-1 md:grid-cols-2 gap-8'
        }
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            featured={featured}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  )
}

export default function Projects() {
  const navigate = useNavigate()

  const projectsById = useMemo(() => projectsData, [])

  const featuredProjects = useMemo(
    () =>
      FEATURED_PROJECT_IDS.map((id) => projectsById[id]).filter(Boolean) as Project[],
    [projectsById]
  )

  const projectsByTopic = useMemo(() => {
    const grouped: Record<ProjectTopicCategory, Project[]> = {
      'ai-agents': [],
      'full-stack-product': [],
      'systems-infrastructure': [],
      ml: [],
    }

    for (const project of Object.values(projectsById)) {
      const categories = PROJECT_CATEGORY_MAP[project.id] ?? []
      for (const category of categories) {
        grouped[category].push(project)
      }
    }

    return grouped
  }, [projectsById])

  const goToProject = (id: string) => navigate(`/projects/${id}`)

  let sectionIndex = 0

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

        <ProjectSection
          title="Featured"
          projects={featuredProjects}
          featured
          onOpen={goToProject}
          sectionIndex={sectionIndex++}
        />

        {PROJECT_TOPIC_SECTIONS.map((section) => (
          <ProjectSection
            key={section.id}
            title={section.title}
            projects={projectsByTopic[section.id]}
            onOpen={goToProject}
            sectionIndex={sectionIndex++}
          />
        ))}
      </div>
    </div>
  )
}
