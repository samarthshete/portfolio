import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const posts = [
  {
    id: 1,
    title: 'Building Production-Ready ML Systems: Lessons Learned',
    excerpt: 'A deep dive into the challenges of taking ML models from Jupyter notebooks to production, including monitoring, versioning, and scaling.',
    date: 'Feb 15, 2024',
    readTime: '8 min read',
    tags: ['ML', 'MLOps', 'Production'],
  },
  {
    id: 2,
    title: 'The State of LLMs in 2024: What Actually Works',
    excerpt: 'Practical insights from building LLM-powered applications, including prompt engineering, fine-tuning strategies, and cost optimization.',
    date: 'Jan 28, 2024',
    readTime: '12 min read',
    tags: ['LLMs', 'AI', 'GPT-4'],
  },
  {
    id: 3,
    title: 'Kubernetes for ML Workloads: A Practical Guide',
    excerpt: 'How to leverage Kubernetes for managing ML training jobs, model serving, and resource optimization in cloud environments.',
    date: 'Dec 10, 2023',
    readTime: '10 min read',
    tags: ['Kubernetes', 'ML', 'Cloud'],
  },
  {
    id: 4,
    title: 'From Monolith to Microservices: A Migration Story',
    excerpt: 'Documenting our journey migrating a legacy monolithic application to microservices, including challenges, wins, and lessons learned.',
    date: 'Nov 5, 2023',
    readTime: '15 min read',
    tags: ['Architecture', 'Microservices', 'DevOps'],
  },
  {
    id: 5,
    title: 'Real-time Features with WebSockets and Redis',
    excerpt: 'Building scalable real-time features using WebSockets, Redis pub/sub, and optimizing for low latency and high throughput.',
    date: 'Oct 20, 2023',
    readTime: '7 min read',
    tags: ['WebSockets', 'Redis', 'Real-time'],
  },
  {
    id: 6,
    title: 'The Art of Code Review: Beyond Finding Bugs',
    excerpt: 'How to conduct effective code reviews that improve code quality, foster learning, and build better team culture.',
    date: 'Sep 12, 2023',
    readTime: '6 min read',
    tags: ['Engineering', 'Team', 'Best Practices'],
  },
]

export default function Writing() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
            Writing
          </h1>
          <p className="text-xl text-foreground/60 dark:text-white/60 max-w-2xl">
            Thoughts on software engineering, AI/ML, and building products that scale.
          </p>
        </motion.div>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer"
            >
              <div className="flex items-center gap-4 text-sm text-foreground/50 dark:text-white/50 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-foreground dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                {post.title}
              </h2>

              <p className="text-foreground/70 dark:text-white/70 mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-foreground/70 dark:text-white/70 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-primary dark:text-accent group-hover:gap-3 transition-all">
                  <span className="text-sm font-medium">Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
