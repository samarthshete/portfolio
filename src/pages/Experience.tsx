import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'

const experiences = [
  {
    company: 'Tech Innovators Inc.',
    role: 'Senior AI/ML Engineer',
    period: 'Jan 2023 - Present',
    description: 'Leading ML infrastructure and model deployment, building scalable AI systems serving 1M+ users.',
    achievements: [
      'Architected and deployed end-to-end ML pipeline reducing model training time by 70%',
      'Built recommendation system improving user engagement by 45%',
      'Mentored team of 3 junior engineers',
    ],
    technologies: ['Python', 'TensorFlow', 'AWS', 'Kubernetes', 'MLOps'],
  },
  {
    company: 'Cloud Solutions Co.',
    role: 'Software Engineer',
    period: 'Jun 2021 - Dec 2022',
    description: 'Developed cloud-native applications and microservices architecture.',
    achievements: [
      'Migrated monolithic application to microservices, improving scalability by 300%',
      'Reduced cloud infrastructure costs by 40% through optimization',
      'Implemented CI/CD pipelines reducing deployment time from hours to minutes',
    ],
    technologies: ['Node.js', 'Docker', 'AWS', 'PostgreSQL', 'React'],
  },
  {
    company: 'StartupXYZ',
    role: 'Full-Stack Developer',
    period: 'Jan 2020 - May 2021',
    description: 'Built product from scratch, handling both frontend and backend development.',
    achievements: [
      'Shipped v1 product in 4 months, acquired 5K users in first 3 months',
      'Implemented real-time features using WebSockets',
      'Created admin dashboard with comprehensive analytics',
    ],
    technologies: ['React', 'Express', 'MongoDB', 'Redis', 'Socket.io'],
  },
]

export default function Experience() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
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
          {/* Timeline line */}
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
                {/* Timeline dot */}
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
      </div>
    </div>
  )
}
