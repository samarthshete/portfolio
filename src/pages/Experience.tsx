import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'

const experiences = [
  {
    company: 'George Washington University — Law Media Center',
    role: 'Technical Support Assistant',
    period: 'May 2025 - Present',
    description:
      'Keep course recordings reliable at scale through media ops and classroom AV monitoring.',
    achievements: [
      'Automated Canvas/Kaltura/Epiphan publishing so 1,000+ class recordings go out on time',
      'Built real-time incident dashboards and alerts to surface issues fast',
      'Added AV/media server health checks to catch 200+ issues before class',
    ],
    technologies: ['Python', 'Canvas API', 'Kaltura', 'Epiphan', 'Splunk', 'AWS', 'Freshdesk'],
  },
  {
    company: 'George Washington University ',
    role: 'Graduate Teaching Assistant',
    period: 'Dec 2025 - Present',
    description:
      'Support graduate-level coursework by assisting with instruction, grading, and student mentorship, with a focus on Python-based optimization and data-driven decision models.',
    achievements: [
      'Debug and validate Python-based pricing and revenue optimization assignments, ensuring correctness of algorithms and adherence to modeling assumptions under capacity constraints.',
      'Lead weekly office hours and code reviews for 60+ graduate students, reinforcing clean code practices, algorithmic thinking, and data-driven problem-solving.',
      'Assist with grading, assignment design, and exam preparation, providing clear, actionable technical feedback to improve student understanding and performance.',
    ],
    technologies: [
      'Python',
      'NumPy',
      'Pandas',
      'Jupyter Notebook',
      'Optimization Models',
      'Git',
      'Canvas LMS',
    ],
  },
  {
    company: 'Tecspeak IT Solution',
    role: 'Software Developer',
    period: 'Jul 2022 - Mar 2024',
    description:
      'Delivered full-stack features end to end with a focus on speed and reliability.',
    achievements: [
      'Shipped React/Node/MongoDB features with reusable components and clean APIs',
      'Reduced slow queries using Redis caching and better indexing',
      'Containerized services and added CI/CD on EKS to ship faster',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'Docker', 'Amazon EKS', 'GitHub Actions'],
  },
  {
    company: 'VG Computers',
    role: 'Machine Learning Intern',
    period: 'Nov 2021 - May 2022',
    description:
      'Prototyped and shipped ML features with clear product impact.',
    achievements: [
      'Trained an XGBoost fraud model and raised accuracy by ~18%',
      'Built a real-time recommender on PyTorch/SageMaker that lifted engagement ~20%',
      'Set up MLflow/Airflow/Docker so retraining and deploys run on autopilot',
    ],
    technologies: ['Python', 'XGBoost', 'PyTorch', 'SageMaker', 'MLflow', 'Airflow', 'Docker'],
  }
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
