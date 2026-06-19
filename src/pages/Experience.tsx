import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'

const experiences = [
  {
    company: 'George Washington University — Law Media Center',
    role: 'Technical Assistant',
    period: 'May 2025 - May 2026',
    description:
      'Automated media operations across law-school recording workflows with API-first integrations and same-day issue detection.',
    achievements: [
      'Removed manual MediaSpace entry for 300+ weekly recordings by integrating Kaltura, Epiphan Cloud, and Canvas APIs across 80+ law courses',
      'Cut mean time-to-detect from ~48 hours to under 4 by building a daily Kaltura, Zoom, and Freshdesk reconciliation job',
    ],
    technologies: ['Python', 'Kaltura API', 'Epiphan Cloud API', 'Canvas API', 'Zoom API', 'Freshdesk API'],
  },
  {
    company: 'Tecspeak IT Solutions',
    role: 'Software Developer',
    period: 'Jul 2022 - Mar 2024',
    description:
      'Shipped full-stack commerce and platform systems with measurable gains in performance, reliability, and deployment speed.',
    achievements: [
      'Improved Lighthouse from ~65 to ~92 (~40% faster loads) using Next.js SSR, code-splitting, and CloudFront CDN',
      'Scaled Node.js/Express/MongoDB services to ~30K requests/day at sub-400ms with Redis caching and indexing; cut quarterly report API from ~20s to ~7s via FastAPI + SQL',
      'Reduced deploy time from ~2 hours to ~30 minutes with Docker + GitHub Actions on AWS (EC2, ECR) behind NGINX and contributed to zero-downtime Node.js v16 to v22 upgrade across 7 services',
      'Improved load times ~25% by migrating Angular modules to React 18 + TypeScript and implementing JWT, RBAC, OAuth2, and CSP',
    ],
    technologies: [
      'Next.js',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Redis',
      'FastAPI',
      'SQL',
      'Docker',
      'GitHub Actions',
      'AWS',
      'NGINX',
    ],
  },
  {
    company: 'Vipul Enterprise',
    role: 'System Engineer',
    period: 'Jun 2021 - Jun 2022',
    description:
      'Built backend inventory systems focused on transactional accuracy, query performance, and operational automation.',
    achievements: [
      'Raised stock accuracy from ~92% to ~99% and eliminated overselling by implementing FastAPI order/inventory APIs with stock reservations and row-level locking across ~10K SKUs and 5 warehouses',
      'Reduced stock-report p95 latency ~75% (1.4s to 350ms) by optimizing PostgreSQL with composite indexes and N+1 removal',
      'Removed ~2 hours/day of manual monitoring by automating low-stock alerts with Celery and Redis',
    ],
    technologies: ['FastAPI', 'PostgreSQL', 'Celery', 'Redis', 'Python'],
  },
]

// ✅ NEW: reusable export for Home
export function ExperienceSection() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
          Experience
        </h1>
        <p className="text-xl text-foreground/60 dark:text-white/60 max-w-2xl">
          My professional journey in software engineering and AI/ML development.
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800" />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-20"
            >
              <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-primary dark:bg-accent border-4 border-background dark:border-dark" />

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground dark:text-white mb-1">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-foreground/60 dark:text-white/60">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-foreground/50 dark:text-white/50 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{exp.period}</span>
                </div>

                <p className="text-foreground/70 dark:text-white/70 mb-6">
                  {exp.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground dark:text-white mb-3">
                    Key Achievements:
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-foreground/70 dark:text-white/70 text-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-foreground/70 dark:text-white/70 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}

export default function Experience() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <ExperienceSection />
      </div>
    </div>
  )
}
