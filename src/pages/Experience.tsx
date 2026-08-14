import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'

const experiences = [
  {
    company: 'Adobe, VA',
    role: 'AI Engineer',
    period: 'Mar 2026 – Present',
    description:
      'Building production RAG systems, autonomous agent workflows, and LLM evaluation infrastructure for enterprise-scale document intelligence.',
    achievements: [
      'Architected a production-grade RAG pipeline using LangChain, OpenAI API, and pgvector on AWS RDS, processing 50K+ enterprise documents with semantic search, which improved information retrieval accuracy by 42%',
      'Built an autonomous AI agent framework with FastAPI and Python, implementing agentic workflows for document analysis and summarization, handling 10K+ daily requests, which automated 70% of manual document analysis workflows',
      'Deployed LLM guardrails and prompt injection detection using custom adversarial testing frameworks, reducing security vulnerabilities by 65% and achieving 99.2% detection rate against malicious prompts across production models',
      'Designed and implemented an LLM-as-a-Judge evaluation pipeline with structured logging via OpenTelemetry and Prometheus, monitoring 15+ performance metrics across 3 model versions, which accelerated model iteration cycles by 55%',
    ],
    technologies: [
      'Python',
      'LangChain',
      'OpenAI API',
      'RAG',
      'pgvector',
      'FastAPI',
      'AWS RDS',
      'OpenTelemetry',
      'Prometheus',
      'LLMs',
    ],
  },
  {
    company: 'Virtual Infotech Solution, India',
    role: 'Software Development Engineer',
    period: 'May 2023 – Jul 2024',
    description:
      'Shipped ML-powered platforms, AWS microservices, and CI/CD infrastructure with measurable gains in accuracy, latency, and release velocity.',
    achievements: [
      'Designed predictive machine learning models using Scikit-learn and XGBoost for financial risk analysis, improving fraud detection precision by 14.8% while maintaining strict latency requirements',
      'Architected a microservices-based document processing platform on AWS (EC2, Lambda, S3, RDS) using FastAPI and Python, processing 150K+ documents monthly, which reduced processing latency by 58%',
      'Built an automated CI/CD pipeline using GitHub Actions and Docker, deploying containerized microservices to AWS EKS with zero-downtime rolling updates, reducing deployment time by 75% and increasing release frequency from bi-weekly to daily',
      'Developed a real-time model monitoring dashboard with Prometheus and Grafana, tracking 20+ operational metrics and configuring intelligent alerts, which reduced mean-time-to-detection (MTTD) by 60%',
      'Implemented asynchronous processing workflows using Python asyncio and Redis caching, optimizing API response times for LLM-powered features, achieving 3.2x throughput improvement and reducing average response latency from 1.2s to 380ms',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'Scikit-learn',
      'XGBoost',
      'AWS',
      'Docker',
      'GitHub Actions',
      'EKS',
      'Prometheus',
      'Grafana',
      'Redis',
    ],
  },
  {
    company: 'Neon IT Systems, India',
    role: 'Software Engineer',
    period: 'Jun 2021 – Apr 2023',
    description:
      'Engineered full-stack product features and platform reliability where performance, test coverage, and team engineering practices drove measurable outcomes.',
    achievements: [
      'Engineered a full-stack web application with React, Node.js, and PostgreSQL, serving 30K+ monthly active users, which increased user engagement by 35% and reduced page load time by 50% through optimized bundling',
      'Containerized the entire application stack using Docker and managed container orchestration with Kubernetes, improving development environment parity and reducing production deployment failures by 55%',
      'Built an automated regression testing suite with Jest and Supertest, integrated into the CI/CD pipeline, achieving 87% test coverage and reducing post-deployment bug rates by 48%',
      'Optimized SQL queries and implemented caching strategies with Redis, reducing database load by 40% and improving average database query response time from 850ms to 180ms',
      'Led code review and established software engineering best practices (OOP, design patterns, SOLID principles) across a 5-member team, resulting in 30% reduction in technical debt and improving code maintainability scores by 25%',
    ],
    technologies: [
      'React.js',
      'Node.js',
      'PostgreSQL',
      'Docker',
      'Kubernetes',
      'Jest',
      'Supertest',
      'Redis',
    ],
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
          Production engineering across AI systems, backend platforms, and cloud infrastructure.
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
