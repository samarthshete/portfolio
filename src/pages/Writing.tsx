import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export const posts = [
  {
    id: 'camera-from-pixels-gps',
    title: 'Finding a Real Camera Using Just Pixels and GPS',
    excerpt:
      'Calibrated a real webcam camera using pixel landmarks + GPS points by converting GPS→ECEF→ENU and solving for K, R, T in OpenCV; validated stability via leave-one-out sensitivity and Monte Carlo noise simulations.',
    date: 'Nov 17, 2025',
    readTime: '10 min read',
    tags: ['Computer Vision', 'Camera Calibration', 'OpenCV', 'Geometry', 'GPS'],
    url: 'https://medium.com/@samarthshete14/finding-a-real-camera-using-just-pixels-and-gps-5c9cc31e6e49',
    coAuthors: ['Karan Patel'],
  },
  {
    id: 'chair-to-donut-averaged-images',
    title: 'When a Chair Becomes a Donut: What Vision Models Do With Averaged Images',
    excerpt:
      'A stress test of multimodal models on CIFAR-100 chair prototypes (mean/median/trimmed mean). Compared Claude, Copilot, ChatGPT, and Gemini to study texture-vs-structure reliance and the effect of few-shot grounding.',
    date: 'Oct 2025',
    readTime: '6–8 min read',
    tags: ['Vision Models', 'Multimodal', 'CIFAR-100', 'Robustness', 'Evaluation'],
    url: 'https://blogs.gwu.edu/samarth-shete/2025/09/15/when-a-chair-becomes-a-donut-what-vision-models-do-with-averaged-images/',
  },
  {
    id: 'pneumonia-densenet121',
    title: 'Understanding Pneumonia Classification in Chest X-rays with DenseNet121',
    excerpt:
      'Built a two-stage transfer learning pipeline with DenseNet121, handled class imbalance with class weights, stress-tested robustness (blur/noise), and used saliency maps to analyze failure cases on NORMAL images.',
    date: 'Dec 13, 2025',
    readTime: '7 min read',
    tags: ['Computer Vision', 'Medical Imaging', 'DenseNet', 'Explainability', 'Deep Learning'],
    url: 'https://medium.com/@samarthshete14/understanding-pneumonia-classification-in-chest-x-rays-with-densenet121-916fc0d9cbdf',
    coAuthors: ['Karan Patel'],
  },
]

type Post = (typeof posts)[number]

type WritingSectionProps = {
  /** use h1 + extra spacing for standalone /writing page */
  asPage?: boolean
  /** show only first N posts (perfect for Home page) */
  limit?: number
  /** show "View All Writing" CTA when limit is used */
  showCta?: boolean
}

export function WritingSection({ asPage = false, limit, showCta = true }: WritingSectionProps) {
  const visiblePosts = useMemo(() => {
    if (!limit) return posts
    return posts.slice(0, limit)
  }, [limit])

  const shouldShowCta = !asPage && !!limit && showCta && posts.length > visiblePosts.length

  const openPost = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={asPage ? 'min-h-screen py-20' : ''}>
      <div className={asPage ? 'max-w-5xl mx-auto px-6 sm:px-8 lg:px-12' : ''}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={!asPage ? { opacity: 1, y: 0 } : undefined}
          animate={asPage ? { opacity: 1, y: 0 } : undefined}
          viewport={!asPage ? { once: true } : undefined}
          className={asPage ? 'mb-16' : 'mb-12'}
        >
          {asPage ? (
            <>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
                Writing
              </h1>
              <p className="text-xl text-foreground/60 dark:text-white/60 max-w-2xl">
                Thoughts on software engineering, AI/ML, and building products that scale.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
                Writing
              </h2>
              <p className="text-xl text-foreground/60 dark:text-white/60 max-w-2xl">
                Thoughts on software engineering, AI/ML, and building products that scale.
              </p>
            </>
          )}
        </motion.div>

        {/* Posts */}
        <div className="space-y-8">
          {visiblePosts.map((post: Post, index: number) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer"
              role="link"
              tabIndex={0}
              onClick={() => openPost(post.url)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openPost(post.url)
                }
              }}
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

              <h3 className="text-2xl font-semibold text-foreground dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                {post.title}
              </h3>

              <p className="text-foreground/70 dark:text-white/70 mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              {post.coAuthors?.length ? (
                <p className="text-sm text-foreground/50 dark:text-white/50 mb-4">
                  Co-author: {post.coAuthors.join(', ')}
                </p>
              ) : null}

              <div className="flex items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-foreground/70 dark:text-white/70 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
             

                  <div className="flex items-center gap-2 text-primary dark:text-accent group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Open</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        {shouldShowCta && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 flex justify-center"
          >
            <Link
              to="/writing"
              className="px-8 py-4 glass-card text-foreground dark:text-white rounded-2xl font-medium hover:scale-105 transition-all duration-200"
            >
              View All Writing
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function Writing() {
  return <WritingSection asPage />
}
