import { motion } from 'framer-motion'
import { Brain, Cloud, Code, Cpu, ShieldCheck, Sparkles } from 'lucide-react'

const skills = [
  {
    category: 'AI Engineering & LLMs',
    items: [
      'LLMs',
      'RAG',
      'LangChain',
      'pgvector',
      'Embeddings',
      'LLM-as-a-Judge',
      'AI Guardrails',
      'Prompt Injection Defense',
      'AI Agents',
    ],
    icon: Brain,
  },
  {
    category: 'Machine Learning & NLP',
    items: [
      'PyTorch',
      'scikit-learn',
      'XGBoost',
      'Hugging Face Transformers',
      'Semantic Search',
      'Model Evaluation',
    ],
    icon: Sparkles,
  },
  {
    category: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Bash'],
    icon: Code,
  },
  {
    category: 'Full-Stack & APIs',
    items: [
      'FastAPI',
      'Node.js',
      'Express',
      'React 18',
      'Next.js',
      'PostgreSQL',
      'MongoDB',
      'Redis',
    ],
    icon: Cpu,
  },
  {
    category: 'Cloud & DevOps',
    items: [
      'AWS (EC2, Lambda, S3, RDS, EKS)',
      'Docker',
      'Kubernetes',
      'GitHub Actions',
      'CI/CD',
      'NGINX',
    ],
    icon: Cloud,
  },
  {
    category: 'Observability & Security',
    items: ['OpenTelemetry', 'Prometheus', 'Grafana', 'JWT', 'OAuth2', 'RBAC', 'CSP'],
    icon: ShieldCheck,
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
          AI engineer with a production software foundation — I build LLM systems and the evaluation
          infrastructure that makes them trustworthy.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div className="glass-card rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-foreground dark:text-white mb-4">My Story</h2>
            <div className="space-y-4 text-foreground/70 dark:text-white/70 leading-relaxed">
              <p>
                I spent 3+ years in India building production backend and full-stack systems — shipping
                features for real users, owning uptime, and learning what breaks when traffic and data
                get messy.
              </p>
              <p>
                I completed an MS in Computer Science at The George Washington University (May 2026) to
                go deeper on ML. During that time I shipped applied-AI systems and worked part-time as a
                teaching assistant and technical assistant across the university.
              </p>
              <p>
                I now specialize in the reliability layer of AI engineering: LLM evaluation, agent
                security, and observability — the systems that make production AI trustworthy.
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
                <span>Build and evaluate production LLM systems — RAG pipelines, agent workflows, and LLM-as-a-Judge evaluation infrastructure</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                <span>Red-team and harden AI agents against prompt injection, tool poisoning, and unsafe action chaining</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                <span>Design backend services with FastAPI, Node.js, PostgreSQL/pgvector, and Redis for low latency and high throughput</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                <span>Ship with production discipline: Docker, CI/CD, observability (OpenTelemetry, Prometheus), and security standards (JWT, OAuth2, RBAC)</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mb-16"
      >
        <div className="glass-card rounded-3xl p-8">
          <h2 className="text-2xl font-semibold text-foreground dark:text-white mb-6">Education</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white">
                MS in Computer Science
              </h3>
              <p className="text-foreground/60 dark:text-white/60 mt-1">
                George Washington University — May 2026
              </p>
              <div className="mt-4">
                <p className="text-sm font-medium text-foreground dark:text-white mb-3">
                  While at GWU (part-time roles)
                </p>
                <ul className="space-y-3 text-foreground/70 dark:text-white/70 text-sm leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                    <span>
                      Graduate Teaching Assistant, GWU School of Business (Jan–May 2026) — mentored 60+
                      graduate students on ML pipelines (scikit-learn, PyTorch) and production engineering
                      practices.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                    <span>
                      Technical Assistant, GWU Law School (May 2025–May 2026) — built Python/API automation
                      for 300+ weekly course recordings and cut failed-recording detection time from ~48
                      hours to under 4.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white">
                B.Tech in Computer Engineering
              </h3>
              <p className="text-foreground/60 dark:text-white/60 mt-1">
                Sanjay Bhokare Group of Institutes, India — May 2021
              </p>
            </div>
          </div>
        </div>
      </motion.div>

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
