import { motion } from 'framer-motion'
import { Code, Cpu, Cloud, Zap } from 'lucide-react'

const skills = [
  {
    category: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
    icon: Code,
  },
  {
    category: 'Backend & APIs',
    items: ['FastAPI', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis'],
    icon: Cpu,
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS (EC2, ECR, CloudFront)', 'Docker', 'GitHub Actions', 'CI/CD', 'NGINX'],
    icon: Cloud,
  },
  {
    category: 'Frontend & Security',
    items: ['React 18', 'Next.js', 'JWT', 'RBAC', 'OAuth2', 'CSP'],
    icon: Zap,
  },
]

export function AboutSection() {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
          About Me
        </h1>
        <p className="text-xl text-foreground/60 dark:text-white/60 max-w-2xl">
          Full-stack engineer focused on production systems, API automation, cloud delivery, and measurable performance gains.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div className="glass-card rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-foreground dark:text-white mb-4">My Story</h2>
            <div className="space-y-4 text-foreground/70 dark:text-white/70 leading-relaxed">
              <p>
                I&apos;m a software engineer currently pursuing an MS in Computer Science at The George Washington University.
                I specialize in full-stack development, API integrations, and cloud-native delivery with a focus on systems
                that are reliable under real production constraints.
              </p>
              <p>
                Across recent roles, I&apos;ve shipped automation and platform improvements including media workflow integrations,
                high-throughput backend APIs, performance optimization, CI/CD pipelines, and security hardening for
                production web applications.
              </p>
              <p>
                I care about clean architecture, measurable impact, and developer workflows that make systems easier to
                ship, monitor, and improve.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <div className="glass-card rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-foreground dark:text-white mb-4">What I Do</h2>
            <ul className="space-y-4 text-foreground/70 dark:text-white/70">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                <span>Automate multi-system workflows with reliable API integrations and reconciliation pipelines</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                <span>Build and optimize backend services for low latency, high throughput, and data consistency</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                <span>Ship full-stack products with modern React and Node stacks, performance tuning, and observability</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                <span>Implement security and delivery standards including JWT, RBAC, OAuth2, CSP, Docker, and CI/CD</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-16">
        <h2 className="text-3xl font-semibold text-foreground dark:text-white mb-8">Skills & Technologies</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 dark:bg-accent/10 rounded-lg">
                  <skill.icon className="w-5 h-5 text-primary dark:text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground dark:text-white">{skill.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map(item => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-foreground/70 dark:text-white/70 text-sm rounded-lg"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      
    </>
  )
}

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <AboutSection />
      </div>
    </div>
  )
}
