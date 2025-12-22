import { motion } from 'framer-motion'
import { Code, Cpu, Cloud, Zap } from 'lucide-react'

const skills = [
  {
    category: 'Languages',
    items: ['Python', 'JavaScript/TypeScript', 'SQL', 'Go'],
    icon: Code,
  },
  {
    category: 'AI/ML',
    items: ['TensorFlow', 'PyTorch', 'LangChain', 'Scikit-learn', 'Hugging Face'],
    icon: Cpu,
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    icon: Cloud,
  },
  {
    category: 'Frameworks',
    items: ['React', 'Flask', 'FastAPI', 'Node.js', 'Express'],
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
          Software engineer passionate about AI, cloud architecture, and building products that make a difference.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div className="glass-card rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-foreground dark:text-white mb-4">My Story</h2>
            <div className="space-y-4 text-foreground/70 dark:text-white/70 leading-relaxed">
              <p>
                I'm a software engineer currently pursuing my MS in Computer Science at The George Washington University. Specializing in full-stack development, AI/ML and cloud-native applications.
                My journey in tech started with a fascination for how machines learn and has evolved into building
                production systems that serve millions of users.  
              </p>
              <p>
                Over the past few years, I’ve worked across the stack — from training custom ML models to architecting
                scalable microservices and crafting responsive UIs. I believe in writing clean, maintainable code and
                building products that solve real problems.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new ML research papers, contributing to open-source
                projects, or enjoying a cup of chai (always better than coffee!).
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
                <span>Design and train machine learning models for real-world applications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                <span>Build scalable cloud infrastructure and microservices architectures</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                <span>Develop full-stack applications with modern frameworks and tools</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                <span>Mentor junior engineers and contribute to technical documentation</span>
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
