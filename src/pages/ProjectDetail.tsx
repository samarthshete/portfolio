import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Github, ExternalLink, Calendar, Users } from 'lucide-react'

const projectsData: Record<string, any> = {
  'smarthire-ai': {
    title: 'SmartHire AI',
    description: 'AI-powered recruitment platform that screens candidates, automates interviews, and provides intelligent matching using NLP and ML.',
    longDescription: 'SmartHire AI revolutionizes the recruitment process by leveraging advanced machine learning algorithms to screen thousands of resumes, conduct automated video interviews with sentiment analysis, and match candidates to roles with unprecedented accuracy. The platform reduces time-to-hire by 60% while improving candidate quality scores by 40%.',
    tags: ['Python', 'TensorFlow', 'Flask', 'React', 'AWS', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop',
    github: 'https://github.com',
    demo: 'https://smarthire.example.com',
    date: 'Jan 2024 - Present',
    team: 'Solo Project',
    features: [
      'Automated resume screening using NLP and custom ML models',
      'Real-time video interview analysis with sentiment detection',
      'Intelligent candidate-job matching algorithm (95% accuracy)',
      'RESTful API with comprehensive documentation',
      'Scalable microservices architecture on AWS ECS',
    ],
    challenges: 'Handling bias in ML models, ensuring GDPR compliance, optimizing inference latency',
    impact: '60% reduction in time-to-hire, 40% improvement in candidate quality',
  },
  'interviewiq': {
    title: 'InterviewIQ',
    description: 'Mock interview platform with real-time feedback powered by GPT-4, speech recognition, and sentiment analysis.',
    longDescription: 'InterviewIQ provides candidates with a realistic interview practice environment, offering immediate feedback on their responses, body language, and communication skills. The platform uses GPT-4 for intelligent question generation and answer evaluation.',
    tags: ['OpenAI', 'React', 'Node.js', 'WebRTC', 'MongoDB', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=600&fit=crop',
    github: 'https://github.com',
    demo: 'https://interviewiq.example.com',
    date: 'Aug 2023 - Dec 2023',
    team: '2 Engineers',
    features: [
      'Real-time video interviews with WebRTC',
      'GPT-4 powered question generation and evaluation',
      'Speech-to-text transcription with accuracy >95%',
      'Sentiment analysis and body language detection',
      'Personalized feedback reports with actionable insights',
    ],
    challenges: 'Low-latency video streaming, managing GPT-4 API costs, building robust speech recognition',
    impact: '10K+ users, 4.8/5 star rating, featured in TechCrunch',
  },
  'finalround': {
    title: 'FinalRound',
    description: 'Interview preparation platform with personalized learning paths, coding challenges, and progress tracking.',
    longDescription: 'FinalRound offers comprehensive interview preparation with adaptive learning paths, a vast library of coding problems, and detailed progress analytics. The platform helps candidates prepare for technical interviews at top tech companies.',
    tags: ['React', 'TypeScript', 'PostgreSQL', 'Docker', 'Kubernetes', 'Redis'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop',
    github: 'https://github.com',
    demo: 'https://finalround.example.com',
    date: 'Mar 2023 - Jul 2023',
    team: 'Solo Project',
    features: [
      '500+ coding problems across all difficulty levels',
      'Personalized learning paths based on skill assessment',
      'Real-time code execution engine with multiple languages',
      'Progress tracking with detailed analytics',
      'Company-specific interview prep modules (FAANG)',
    ],
    challenges: 'Building secure sandboxed code execution, scaling for concurrent users, optimizing database queries',
    impact: '5K+ active users, 85% completion rate for learning paths',
  },
  'readflow': {
    title: 'ReadFlow',
    description: 'Smart reading assistant that summarizes articles, extracts key insights, and creates personalized reading lists using LLMs.',
    longDescription: 'ReadFlow helps professionals stay informed by intelligently summarizing articles, extracting key insights, and organizing content into personalized reading lists. The platform uses LangChain and GPT-4 for advanced text analysis.',
    tags: ['Python', 'LangChain', 'FastAPI', 'Redis', 'Vue.js', 'Celery'],
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=600&fit=crop',
    github: 'https://github.com',
    demo: 'https://readflow.example.com',
    date: 'Nov 2022 - Feb 2023',
    team: 'Solo Project',
    features: [
      'AI-powered article summarization with key insight extraction',
      'Personalized reading recommendations',
      'Browser extension for one-click saving',
      'Offline reading mode with sync',
      'Multi-language support (10+ languages)',
    ],
    challenges: 'Handling diverse content formats, managing API rate limits, ensuring summary quality',
    impact: '2K+ daily active users, 50K+ articles processed',
  },
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = id ? projectsData[id] : null

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground dark:text-white mb-4">
            Project Not Found
          </h1>
          <Link to="/projects" className="text-primary dark:text-accent hover:underline">
            Back to Projects
              </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-foreground/60 dark:text-white/60">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-foreground/60 dark:text-white/60">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{project.date}</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/60 dark:text-white/60">
              <Users className="w-4 h-4" />
              <span className="text-sm">{project.team}</span>
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm font-medium">View Code</span>
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary dark:bg-accent text-white rounded-lg hover:shadow-lg transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm font-medium">Live Demo</span>
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden mb-12">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-semibold text-foreground dark:text-white mb-4">
              Overview
            </h2>
            <p className="text-foreground/70 dark:text-white/70 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground dark:text-white mb-4">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-foreground dark:text-white rounded-lg font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground dark:text-white mb-4">
              Key Features
            </h2>
            <ul className="space-y-3">
              {project.features.map((feature: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-foreground/70 dark:text-white/70"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold text-foreground dark:text-white mb-4">
                Challenges
              </h2>
              <p className="text-foreground/70 dark:text-white/70">
                {project.challenges}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground dark:text-white mb-4">
                Impact
              </h2>
              <p className="text-foreground/70 dark:text-white/70">
                {project.impact}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
