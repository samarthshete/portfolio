import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight, Github, ExternalLink, Briefcase, Calendar, Clock, Code, Cpu, Cloud, Zap, Mail, Database, MapPin, Phone, Download, Linkedin, Twitter } from 'lucide-react'

const roles = [
  'AI/ML Engineer',
  'Software Engineer',
  'Cloud Architect',
  'Full-Stack Developer',
]

const projects = [
  {
    id: 'smarthire-ai',
    title: 'SmartHire AI',
    description: 'AI-powered recruitment platform that screens candidates, automates interviews, and provides intelligent matching using NLP and ML.',
    tags: ['Python', 'TensorFlow', 'Flask', 'React', 'AWS'],
    image: 'https://github.com/samarthshete/SmartHire',
    github: 'https://github.com',
    demo: '#',
  },
  {
    id: 'interviewiq',
    title: 'InterviewIQ',
    description: 'Mock interview platform with real-time feedback powered by GPT-4, speech recognition, and sentiment analysis.',
    tags: ['OpenAI', 'React', 'Node.js', 'WebRTC', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop',
    github: 'https://github.com/samarthshete/InterviewIQ',
    demo: '#'
  },

  {
    id: 'quizapp-eks',
    title: 'Production Quiz App on AWS EKS',
    description:
      'Production-grade quiz app on EKS with React + Flask + PostgreSQL, ALB Ingress, and zero-downtime deploys.',
    tags: ['React', 'Flask', 'PostgreSQL', 'Kubernetes', 'AWS EKS', 'ALB', 'CI/CD'],
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=500&fit=crop',
    github: 'https://github.com/samarthshete/Cloud-Native-Quiz-Application',
    demo: '#',
  },
  // {
  //   id: 'readflow',
  //   title: 'ReadFlow',
  //   description: 'Smart reading assistant that summarizes articles, extracts key insights, and creates personalized reading lists using LLMs.',
  //   tags: ['Python', 'LangChain', 'FastAPI', 'Redis', 'Vue.js'],
  //   image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop',
  //   github: 'https://github.com',
  //   demo: 'https://readflow.example.com',
  // },
]

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
    company: 'VG Computers',
    role: 'Machine Learning Intern',
    period: 'Mar 2023 - Sep 2023',
    description:
      'Prototyped and shipped ML features with clear product impact.',
    achievements: [
      'Trained an XGBoost fraud model and raised accuracy by ~18%',
      'Built a real-time recommender on PyTorch/SageMaker that lifted engagement ~20%',
      'Set up MLflow/Airflow/Docker so retraining and deploys run on autopilot',
    ],
    technologies: ['Python', 'XGBoost', 'PyTorch', 'SageMaker', 'MLflow', 'Airflow', 'Docker'],
  },
  {
    company: 'Tecspeak IT Solution',
    role: 'Software Developer',
    period: 'Dec 2021 - Feb 2023',
    description:
      'Delivered full-stack features end to end with a focus on speed and reliability.',
    achievements: [
      'Shipped React/Node/MongoDB features with reusable components and clean APIs',
      'Reduced slow queries using Redis caching and better indexing',
      'Containerized services and added CI/CD on EKS to ship faster',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'Docker', 'Amazon EKS', 'GitHub Actions'],
  },
]

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
]

const skills = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'JavaScript/TypeScript', 'SQL', 'C'],
    icon: Code,
  },
  {
    category: 'Frameworks & APIs',
    items: ['React', 'Node.js', 'Express.js', 'FastAPI', 'Flask', 'GraphQL'],
    icon: Zap,
  },
  {
    category: 'AI/ML',
    items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'SageMaker'],
    icon: Cpu,
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS (EC2, S3, Lambda, SageMaker)', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Git'],
    icon: Cloud,
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'MongoDB'],
    icon: Database,
  },
]

export default function Home() {
  const [currentRole, setCurrentRole] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole(prev => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your message! I\'ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Samarth Shete
              </span>
            </motion.h1>

            <motion.div
              className="h-16 flex items-center justify-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.p
                key={currentRole}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground/70 dark:text-white/70"
              >
                {roles[currentRole]}
              </motion.p>
            </motion.div>

            <motion.p
              className="text-xl sm:text-2xl text-foreground/60 dark:text-white/60 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Building calm, fast software — from ML systems to delightful UIs.
            </motion.p>

            <motion.p
              className="text-lg text-foreground/50 dark:text-white/50 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              I design and ship AI-powered, cloud-native software with measurable impact.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <button
                onClick={() => {
                  const element = document.getElementById('projects')
                  if (element) {
                    const offset = 80
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - offset
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
                  }
                }}
                className="group px-8 py-4 bg-primary dark:bg-accent text-white rounded-2xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('contact')
                  if (element) {
                    const offset = 80
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - offset
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
                  }
                }}
                className="px-8 py-4 glass-card text-foreground dark:text-white rounded-2xl font-medium hover:scale-105 transition-all duration-200"
              >
                Get in Touch
              </button>
            </motion.div>

            <motion.div
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[
                { label: 'Python', value: 'Expert' },
                { label: 'Machine Learning', value: 'Advanced' },
                { label: 'AWS/Cloud', value: 'Proficient' },
                { label: 'React', value: 'Advanced' },
              ].map((skill, index) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-sm text-foreground/40 dark:text-white/40 mb-1">
                    {skill.label}
                  </p>
                  <p className="text-lg font-semibold text-foreground dark:text-white">
                    {skill.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
              About Me
            </h2>
            <p className="text-xl text-foreground/60 dark:text-white/60 max-w-2xl">
              Software engineer passionate about AI, cloud architecture, and building products that make a difference.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-2xl font-semibold text-foreground dark:text-white mb-4">
                  My Story
                </h3>
                <div className="space-y-4 text-foreground/70 dark:text-white/70 leading-relaxed">
                  <p>
                    I'm a software engineer specializing in full-stack development, AI/ML and cloud-native applications. 
                    My journey in tech started with a fascination for how machines learn and has evolved 
                    into building production systems that serve millions of users.
                  </p>
                  <p>
                    Over the past 4+ years, I've worked on everything from training custom ML models 
                    to architecting scalable microservices. I believe in writing clean, maintainable 
                    code and building products that solve real problems.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new ML research papers, contributing 
                    to open-source projects, or enjoying a cup of chai (always better than coffee!).
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-2xl font-semibold text-foreground dark:text-white mb-4">
                  What I Do
                </h3>
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
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                    <span>Write about software engineering and AI/ML best practices</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-3xl font-semibold text-foreground dark:text-white mb-8">
              Skills & Technologies
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-card rounded-3xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 dark:bg-accent/10 rounded-xl">
                      <skill.icon className="w-5 h-5 text-primary dark:text-accent" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground dark:text-white">
                      {skill.category}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map(item => (
                      <span
                        key={item}
                        className="px-3 py-1.5 bg-background/50 dark:bg-background/30 text-foreground/70 dark:text-white/70 text-sm rounded-xl backdrop-blur-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
              Experience
            </h2>
            <p className="text-xl text-foreground/60 dark:text-white/60 max-w-2xl">
              My professional journey in software engineering and AI/ML development.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent dark:from-accent/50 dark:via-accent/30" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative pl-20"
                >
                  <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-primary dark:bg-accent border-4 border-background dark:border-dark shadow-lg" />

                  <div className="glass-card rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
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
                          className="px-3 py-1.5 bg-background/50 dark:bg-background/30 text-foreground/70 dark:text-white/70 text-xs rounded-xl backdrop-blur-sm"
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
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
              Projects
            </h2>
            <p className="text-xl text-foreground/60 dark:text-white/60 max-w-2xl">
              A collection of my recent work in AI/ML, cloud-native applications, and developer tools.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group glass-card rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-foreground dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-foreground/60 dark:text-white/60 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-background/50 dark:bg-background/30 text-foreground/70 dark:text-white/70 text-sm rounded-xl backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/60 dark:text-white/60 hover:text-primary dark:hover:text-accent transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/60 dark:text-white/60 hover:text-primary dark:hover:text-accent transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Writing Section */}
      <section id="writing" className="py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
              Writing
            </h2>
            <p className="text-xl text-foreground/60 dark:text-white/60 max-w-2xl">
              Thoughts on software engineering, AI/ML, and building products that scale.
            </p>
          </motion.div>

          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group glass-card rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer"
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

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-background/50 dark:bg-background/30 text-foreground/70 dark:text-white/70 text-xs rounded-xl backdrop-blur-sm"
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
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-foreground/60 dark:text-white/60 max-w-2xl">
              Let's connect! Whether you have a project in mind or just want to chat about tech.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground dark:text-white mb-6">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 dark:bg-accent/10 rounded-2xl">
                        <Mail className="w-5 h-5 text-primary dark:text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground/50 dark:text-white/50">Email</p>
                        <a
                          href="mailto:samarth.shete@gwu.edu"
                          className="text-foreground dark:text-white hover:text-primary dark:hover:text-accent transition-colors"
                        >
                          samarth.shete@gwu.edu
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 dark:bg-accent/10 rounded-2xl">
                        <MapPin className="w-5 h-5 text-primary dark:text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground/50 dark:text-white/50">Location</p>
                        <p className="text-foreground dark:text-white">Washington, DC</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 dark:bg-accent/10 rounded-2xl">
                        <Phone className="w-5 h-5 text-primary dark:text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground/50 dark:text-white/50">Phone</p>
                        <p className="text-foreground dark:text-white">+1 (703) 928-9684</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-foreground dark:text-white mb-4">
                    Social Links
                  </h4>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass-card rounded-2xl hover:scale-110 transition-all"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5 text-foreground dark:text-white" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass-card rounded-2xl hover:scale-110 transition-all"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-foreground dark:text-white" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass-card rounded-2xl hover:scale-110 transition-all"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5 text-foreground dark:text-white" />
                    </a>
                  </div>
                </div>

                <div>
                  <a
                    href="/resume.pdf"
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary dark:bg-accent text-white rounded-2xl font-medium hover:shadow-lg transition-all hover:scale-105"
                  >
                    <Download className="w-5 h-5" />
                    Download Resume
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-2xl font-semibold text-foreground dark:text-white mb-6">
                  Send a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground dark:text-white mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent outline-none transition-all text-foreground dark:text-white"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground dark:text-white mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent outline-none transition-all text-foreground dark:text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground dark:text-white mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent outline-none transition-all text-foreground dark:text-white resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary dark:bg-accent text-white rounded-2xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
