import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Github, ExternalLink } from 'lucide-react'

const projects = [
  {
    id: 'smarthire-ai',
    title: 'SmartHire AI',
    description: 'AI-powered recruitment platform that screens candidates, automates interviews, and provides intelligent matching using NLP and ML.',
    tags: ['Python', 'TensorFlow', 'Flask', 'React', 'AWS'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop',
    github: 'https://github.com',
    demo: 'https://smarthire.example.com',
  },
  {
    id: 'interviewiq',
    title: 'InterviewIQ',
    description: 'Mock interview platform with real-time feedback powered by GPT-4, speech recognition, and sentiment analysis.',
    tags: ['OpenAI', 'React', 'Node.js', 'WebRTC', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop',
    github: 'https://github.com',
    demo: 'https://interviewiq.example.com',
  },
  {
    id: 'finalround',
    title: 'FinalRound',
    description: 'Interview preparation platform with personalized learning paths, coding challenges, and progress tracking.',
    tags: ['React', 'TypeScript', 'PostgreSQL', 'Docker', 'Kubernetes'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
    github: 'https://github.com',
    demo: 'https://finalround.example.com',
  },
  {
    id: 'readflow',
    title: 'ReadFlow',
    description: 'Smart reading assistant that summarizes articles, extracts key insights, and creates personalized reading lists using LLMs.',
    tags: ['Python', 'LangChain', 'FastAPI', 'Redis', 'Vue.js'],
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop',
    github: 'https://github.com',
    demo: 'https://readflow.example.com',
  },
]

export default function Projects() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
            Projects
          </h1>
          <p className="text-xl text-foreground/60 dark:text-white/60 max-w-2xl">
            A collection of my recent work in AI/ML, cloud-native applications, and developer tools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/projects/${project.id}`}>
                <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
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

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
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
                          href={project.github}
                          onClick={(e) => e.stopPropagation()}
                          className="text-foreground/60 dark:text-white/60 hover:text-primary dark:hover:text-accent transition-colors"
                          aria-label="GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                        <a
                          href={project.demo}
                          onClick={(e) => e.stopPropagation()}
                          className="text-foreground/60 dark:text-white/60 hover:text-primary dark:hover:text-accent transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>

                      <div className="flex items-center gap-2 text-primary dark:text-accent group-hover:gap-3 transition-all">
                        <span className="text-sm font-medium">View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
