/* ===========================
   ProjectDetail.tsx (FULL FILE)
   ✅ Includes ALL requested changes:
   1) Scroll progress bar (top)
   2) Apple-style hero image overlay (gradient + badges + title/desc)
   3) Quick Facts section (At a glance)
   4) Sticky tabs (Case Study / Overview)
   5) Your FULL projectsData (as you pasted)
   =========================== */

import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  Users,
  ChevronDown,
  Cpu,
  Network,
  Gauge,
  ShieldCheck,
  Sparkles,
  Database,
  Brain,
  Layers,
} from 'lucide-react'

export type ProjectCategory = 'SDE' | 'ML'

type AgentIconType =
  | 'orchestrator'
  | 'topic'
  | 'interviewer'
  | 'evaluator'
  | 'database'
  | 'nlp'
  | 'frontend'
  | 'backend'
  | 'realtime'
  | 'worker'

type MetricIconType = 'latency' | 'accuracy' | 'reliability' | 'throughput' | 'setup' | 'scale'

type CaseStudy = {
  headline: string
  engineeringChallenge: {
    title: string
    bullets: string[]
  }
  architecture: {
    title: string
    summary: string
    agents: { name: string; role: string; icon?: AgentIconType }[]
  }
  decisions: {
    title: string
    items: {
      heading: string
      decision: string
      tradeoff?: string
      logic?: string
      why?: string
      impact?: string
    }[]
  }
  performance: {
    title: string
    metrics: { label: string; value: string; icon?: MetricIconType }[]
  }
  scar: {
    title: string
    problem: string
    fix: string[]
  }
  takeaway: string
}

export type Project = {
  id: string
  title: string
  category: ProjectCategory
  description: string
  longDescription: string
  tags: string[]
  image: string
  github: string
  demo: string
  date: string
  team: string
  features: string[]
  challenges: string
  impact: string
  caseStudy?: CaseStudy
}

/* ----------------------------- NEW: Scroll Progress ----------------------------- */
function ScrollProgress() {
  const progress = useMotionValue(0)
  const spring = useSpring(progress, { stiffness: 120, damping: 20 })

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop
      const scrollHeight = doc.scrollHeight - doc.clientHeight
      const pct = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      progress.set(pct)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [progress])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-primary/30 dark:bg-accent/30"
      style={{ scaleX: spring, transformOrigin: '0% 50%' }}
    />
  )
}

/* ----------------------------- UI Helpers ----------------------------- */

function SectionTitle({
  kicker,
  children,
}: {
  kicker?: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-5">
      {kicker && (
        <div className="text-xs tracking-widest uppercase text-foreground/50 dark:text-white/50 mb-2">
          {kicker}
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl font-semibold text-foreground dark:text-white">
        {children}
      </h2>
    </div>
  )
}

function Surface({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-3xl p-7 sm:p-8 border border-white/10 dark:border-white/10">
      {children}
    </div>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-4 py-2 rounded-2xl bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-white/10 dark:border-white/10 text-foreground/80 dark:text-white/80 font-medium">
      {children}
    </span>
  )
}

function Divider() {
  return <div className="h-px w-full bg-white/10 dark:bg-white/10 my-8" />
}

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-3xl overflow-hidden border border-white/10 dark:border-white/10 bg-background/40 dark:bg-background/20 backdrop-blur">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-base sm:text-lg font-semibold text-foreground dark:text-white">
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-foreground/60 dark:text-white/60 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="px-6 pb-6"
          >
            <div className="text-foreground/70 dark:text-white/70 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AgentIcon({ type }: { type?: AgentIconType }) {
  const cls = 'w-5 h-5 text-primary dark:text-accent'
  switch (type) {
    case 'orchestrator':
      return <Network className={cls} />
    case 'topic':
      return <Cpu className={cls} />
    case 'interviewer':
      return <Gauge className={cls} />
    case 'evaluator':
      return <ShieldCheck className={cls} />
    case 'database':
      return <Database className={cls} />
    case 'nlp':
      return <Brain className={cls} />
    case 'frontend':
      return <Sparkles className={cls} />
    case 'backend':
      return <Layers className={cls} />
    case 'realtime':
      return <Gauge className={cls} />
    case 'worker':
      return <ShieldCheck className={cls} />
    default:
      return <Cpu className={cls} />
  }
}

function MetricIcon({ type }: { type?: MetricIconType }) {
  const cls = 'w-5 h-5 text-primary dark:text-accent'
  switch (type) {
    case 'latency':
      return <Gauge className={cls} />
    case 'accuracy':
      return <Brain className={cls} />
    case 'reliability':
      return <ShieldCheck className={cls} />
    case 'throughput':
      return <Network className={cls} />
    case 'setup':
      return <Layers className={cls} />
    case 'scale':
      return <Database className={cls} />
    default:
      return <Gauge className={cls} />
  }
}

function StickyTabs({
  hasCaseStudy,
  activeTab,
  setActiveTab,
}: {
  hasCaseStudy: boolean
  activeTab: 'overview' | 'casestudy'
  setActiveTab: (v: 'overview' | 'casestudy') => void
}) {
  if (!hasCaseStudy) return null

  return (
    <div className="sticky top-16 z-30 mb-10">
      <div className="mx-auto max-w-5xl">
        <div className="glass-card rounded-3xl px-3 py-3 border border-white/10 dark:border-white/10 backdrop-blur">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('casestudy')}
              className={[
                'flex-1 px-4 py-2.5 rounded-2xl font-medium transition-all',
                activeTab === 'casestudy'
                  ? 'bg-primary/15 dark:bg-accent/15 text-foreground dark:text-white ring-1 ring-primary/40 dark:ring-accent/40'
                  : 'text-foreground/70 dark:text-white/70 hover:bg-white/5',
              ].join(' ')}
            >
              Case Study
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={[
                'flex-1 px-4 py-2.5 rounded-2xl font-medium transition-all',
                activeTab === 'overview'
                  ? 'bg-primary/15 dark:bg-accent/15 text-foreground dark:text-white ring-1 ring-primary/40 dark:ring-accent/40'
                  : 'text-foreground/70 dark:text-white/70 hover:bg-white/5',
              ].join(' ')}
            >
              Overview
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------- NEW: Quick Facts ----------------------------- */
function QuickFacts({ project }: { project: Project }) {
  const focus = project.category === 'SDE' ? 'Software Engineering' : 'ML / AI Systems'
  const stack = project.tags.slice(0, 3).join(' · ')
  const proof = project.caseStudy ? 'Case Study + Metrics' : 'Overview + Highlights'

  return (
    <Surface>
      <SectionTitle kicker="Quick facts">At a glance</SectionTitle>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-3xl p-5 bg-background/40 dark:bg-background/20 border border-white/10">
          <div className="text-xs uppercase tracking-widest text-foreground/50 dark:text-white/50 mb-2">
            Focus
          </div>
          <div className="text-foreground dark:text-white font-semibold">{focus}</div>
        </div>

        <div className="rounded-3xl p-5 bg-background/40 dark:bg-background/20 border border-white/10">
          <div className="text-xs uppercase tracking-widest text-foreground/50 dark:text-white/50 mb-2">
            Stack
          </div>
          <div className="text-foreground dark:text-white font-semibold">{stack}</div>
        </div>

        <div className="rounded-3xl p-5 bg-background/40 dark:bg-background/20 border border-white/10">
          <div className="text-xs uppercase tracking-widest text-foreground/50 dark:text-white/50 mb-2">
            Proof
          </div>
          <div className="text-foreground dark:text-white font-semibold">{proof}</div>
        </div>
      </div>
    </Surface>
  )
}

/* ----------------------------- DATA ----------------------------- */

export const projectsData: Record<string, Project> = {
  // ✅ SmartHire with your full case study
  'smarthire-ai': {
    id: 'smarthire-ai',
    title: 'SmartHire: Intelligent Recruitment & Semantic Matching Engine',
    category: 'ML',
    description:
      'Automating candidate evaluation through NLP, hybrid databases, and explainable analytics for recruiter decision support.',
    longDescription:
      'SmartHire addresses the “Resume Black Hole” by replacing brittle keyword matching with semantic intent matching. It ingests messy PDFs, converts resumes and job descriptions into embeddings, and ranks candidates using cosine similarity — backed by a hybrid SQL + NoSQL storage strategy and a transparent analytics dashboard.',
    tags: [
      'Python',
      'Flask',
      'Hugging Face',
      'Sentence-Transformers',
      'SQLAlchemy',
      'SQLite',
      'MongoDB',
      'PDFPlumber',
      'Cosine Similarity',
    ],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop',
    github: 'https://github.com/samarthshete/SmartHire',
    demo: '#',
    date: 'Jan 2024 - Present',
    team: 'Solo Project',
    features: [
      'Semantic matching between resumes and job descriptions using embeddings + cosine similarity',
      'Hybrid data architecture: SQL for ACID metadata + MongoDB for unstructured transcripts/logs',
      'Robust PDF ingestion + cleaning pipeline for messy real-world formats',
      'Transparent analytics dashboard for score distribution and top performers',
      'Indexed analytics retrieval for responsive recruiter workflows',
    ],
    challenges: 'PDF parsing noise, model memory bottlenecks, and keeping the UI responsive during heavy inference.',
    impact:
      'Automated screening of 100+ resumes in <10 seconds, improved matching quality beyond keyword ATS, and enabled fast analytics via indexed logs.',

    caseStudy: {
      headline:
        'SmartHire solves semantic gap analysis in hiring — evaluating candidates by the intent and depth of experience, not buzzword matches.',
      engineeringChallenge: {
        title: 'The Engineering Challenge',
        bullets: [
          'Recruiters waste hours manually screening PDFs and still miss top candidates due to keyword mismatch.',
          'Keyword-based ATS fails when “AWS” is written as “Cloud Expert” or “Microservices” is described as “Distributed Systems.”',
          'SmartHire targets the semantic gap: match meaning, not string equality.',
        ],
      },
      architecture: {
        title: 'Technical Architecture: Hybrid Data Strategy',
        summary:
          'Instead of forcing one database to do everything, SmartHire uses the best storage engine per data type.',
        agents: [
          {
            name: 'SQL Store (SQLAlchemy/SQLite)',
            role: 'Structured relational data: user profiles, job metadata, and application status with ACID guarantees.',
            icon: 'database',
          },
          {
            name: 'NoSQL Store (MongoDB)',
            role: 'Unstructured high-volume data: raw interview transcripts and AI feedback logs with flexible schema evolution.',
            icon: 'database',
          },
          {
            name: 'NLP Engine (Hugging Face)',
            role: 'Sentence-Transformers generate embeddings for resumes and JDs; cosine similarity yields a scoring signal.',
            icon: 'nlp',
          },
          {
            name: 'Decision Support UI',
            role: 'Dashboard surfaces rankings, score distributions, and analytics so recruiters can trust + interpret results.',
            icon: 'frontend',
          },
        ],
      },
      decisions: {
        title: 'Key Technical Deep-Dives',
        items: [
          {
            heading: 'Deterministic vs Probabilistic Matching',
            decision:
              'Replaced keyword matching with semantic embeddings (latent space) using Hugging Face Transformers + cosine similarity.',
            logic:
              'The model maps related concepts (e.g., “Distributed Systems” ↔ “Microservices”), improving match quality even when phrasing differs.',
            impact:
              'Increased matching accuracy by ~30% compared to traditional keyword-based ATS logic.',
          },
          {
            heading: 'Robust PDF Ingestion Pipeline',
            decision:
              'Built a coordinate-aware extraction pipeline with PDFPlumber + a cleaning layer (non-ASCII stripping, whitespace normalization).',
            tradeoff:
              'More engineering than plain text extraction, but significantly higher input quality for downstream embeddings.',
            why:
              'Resumes often include multi-column layouts, tables, icons, and inconsistent formatting that breaks naive parsing.',
          },
          {
            heading: 'Real-time Analytics Dashboard (Explainability)',
            decision:
              'Implemented a visualization layer (Flask + JS) to surface top performers and score distributions.',
            why:
              'Moved the product from “black box AI” to “transparent decision support,” helping recruiters understand why a candidate ranks high.',
          },
        ],
      },
      performance: {
        title: 'Quantified Engineering Impact',
        metrics: [
          {
            label: 'Reduced screening latency',
            value: 'Automated initial screening of 100+ resumes in <10 seconds (previously hours manually).',
            icon: 'latency',
          },
          {
            label: 'High precision ranking',
            value: 'Strong correlation between AI “Top 3” and expert manual hiring choices.',
            icon: 'accuracy',
          },
          {
            label: 'Scalable analytics throughput',
            value: 'MongoDB indexed on job_id + candidate_id for sub-second interview analytics retrieval at scale.',
            icon: 'throughput',
          },
        ],
      },
      scar: {
        title: 'The “Engineering Scar”',
        problem:
          'Transformer inference inside the Flask process created high memory overhead and slow UI responsiveness under load.',
        fix: [
          'Decoupled inference from the web server so heavy NLP work doesn’t block the main request loop.',
          'Optimized model loading strategy (lazy loading) to reduce cold-start memory spikes.',
          'Kept the UX responsive even during large batch processing and analytics refresh.',
        ],
      },
      takeaway:
        'SmartHire is built like a real production hiring system: semantic matching, hybrid persistence, explainable analytics, and inference isolation for responsiveness.',
    },
  },

  // ✅ InterviewIQ
  interviewiq: {
    id: 'interviewiq',
    title: 'InterviewIQ: Multi-Agent AI Orchestration',
    category: 'ML',
    description:
      'High-performance multi-agent LLM system for adaptive technical assessments with shared state, recovery-safe sessions, and real-time pivots.',
    longDescription:
      'InterviewIQ is a decentralized 4-agent system that runs an interview like a human: it evaluates answers in real time, updates a global state, and decides when to drill down or pivot based on performance. The system is designed for reliability, low latency streaming, and coverage-aware progression.',
    tags: [
      'LlamaIndex',
      'RAG',
      'Multi-Agent',
      'State Machine',
      'Streaming',
      'OpenAI API',
      'Session Recovery',
    ],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=600&fit=crop',
    github: 'https://github.com/samarthshete/InterviewIQ',
    demo: '#',
    date: 'Aug 2023 - Dec 2023',
    team: 'Solo (Architecture) + Test Users',
    features: [
      '4-agent decentralized architecture with shared state persistence',
      'Topic graph + state machine for pivot vs deep-dive decisions',
      '6-dimension evaluation loop feeding back into question selection',
      'Streaming UX optimized for fast time-to-first-token',
      'Crash-safe JSON session manager for resume/recovery',
      'Coverage tracker to prevent agent looping and maintain pacing',
    ],
    challenges:
      'Agent looping, state consistency across agents, low-latency streaming, and recovery-safe persistence without losing interview context.',
    impact:
      '92% correlation to human scoring (20+ tests), <200ms time-to-first-token, and 100% recovery in interruption simulations.',
    caseStudy: {
      headline:
        'A decentralized 4-agent interview system that evaluates, adapts, and pivots like a human interviewer — not a linear script.',
      engineeringChallenge: {
        title: 'The Engineering Challenge',
        bullets: [
          'Building an AI interviewer isn’t hard — building one that adapts in real-time like a human is.',
          'Most AI interviewers are linear scripts. InterviewIQ solves the “Stiffness Problem” using a 4-agent decentralized architecture.',
          'It evaluates answers, updates global state, and decides when to drill down vs pivot based on candidate performance.',
        ],
      },
      architecture: {
        title: 'System Architecture & Logic',
        summary:
          'Instead of one massive prompt, InterviewIQ decouples responsibilities into specialized agents connected via shared state.',
        agents: [
          {
            name: 'Orchestrator',
            role: 'Runs resume/JD RAG and manages global interview state across the session.',
            icon: 'orchestrator',
          },
          {
            name: 'TopicManager (State Machine)',
            role: 'Maintains the interview graph, tracks coverage, and chooses the next optimal path (pivot vs deep dive).',
            icon: 'topic',
          },
          {
            name: 'Interviewer (UI/UX)',
            role: 'Handles persona, streaming delivery, and question framing for a natural experience.',
            icon: 'interviewer',
          },
          {
            name: 'Evaluator (The Brain)',
            role: 'Scores responses across 6 dimensions (technical, clarity, communication, etc.) and feeds signals back into the loop.',
            icon: 'evaluator',
          },
        ],
      },
      decisions: {
        title: 'Key Technical Decisions & Trade-offs',
        items: [
          {
            heading: 'Why LlamaIndex 0.11.0 for orchestration?',
            decision:
              'Chose LlamaIndex over LangChain for structured retrieval and event-driven coordination with shared state persistence.',
            tradeoff:
              'Steeper learning curve for custom agents, but enabled reliable shared memory so the system doesn’t “forget” earlier context.',
          },
          {
            heading: 'Adaptive Difficulty Algorithm (“Flow State”)',
            decision: 'Implemented 3-tier difficulty: Surface → Medium → Deep.',
            logic:
              'If the Evaluator returns >8.5/10 for two consecutive questions, TopicManager triggers Deep Dive to generate edge-case/system design prompts.',
          },
          {
            heading: 'Real-time Persistence & Recovery',
            decision: 'Engineered a JSON-based session manager for multi-agent state recovery.',
            why:
              'If the API fails or the process crashes, the session resumes exactly where it left off without losing progress.',
          },
        ],
      },
      performance: {
        title: 'Quantified Impact & Performance',
        metrics: [
          {
            label: 'Latency',
            value:
              'Optimized streaming (Rich + OpenAI streaming API), reducing time-to-first-token to <200ms.',
            icon: 'latency',
          },
          {
            label: 'Accuracy',
            value:
              '92% correlation between AI evaluation and human assessment across 20+ test cases.',
            icon: 'accuracy',
          },
          {
            label: 'Reliability',
            value: '100% recovery rate during simulated interruptions via session manager.',
            icon: 'reliability',
          },
        ],
      },
      scar: {
        title: 'The “Engineering Scar”',
        problem:
          'Agent looping: Evaluator + TopicManager repeatedly requested the same depth, stalling the interview.',
        fix: [
          'Implemented a Coverage Tracker inside TopicManager.',
          'Used bitmask-style logic to mark topics “exhausted” after depth thresholds.',
          'Forced forward progress by compelling the Orchestrator to pivot once coverage is satisfied.',
        ],
      },
      takeaway:
        'InterviewIQ is built for real interview dynamics: adaptive difficulty, coverage-aware progression, shared memory, and recovery-safe sessions.',
    },
  },

  // ✅ Cloud-Native 3-tier + DevOps pipeline
  'cloud-native-3tier': {
    id: 'cloud-native-3tier',
    title: 'Cloud-Native 3-Tier Architecture & DevOps Pipeline',
    category: 'SDE',
    description:
      'A production-parity containerized environment for React/Flask/PostgreSQL with reproducible setup and deployment-safe workflows.',
    longDescription:
      'This project focuses on eliminating configuration drift by creating a fully containerized 3-tier application where local, staging, and production behave the same. Docker + Docker Compose orchestrate services, migrations are versioned, and initialization is automated so contributors can onboard in minutes.',
    tags: ['React', 'Flask', 'PostgreSQL', 'Docker', 'Docker Compose', 'Flask-Migrate', 'Alembic', 'AWS Route 53'],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop',
    github: '#',
    demo: '#',
    date: '2024',
    team: 'Solo Project',
    features: [
      'Containerized 3-tier stack with Docker + Compose orchestration',
      'Version-controlled DB migrations using Flask-Migrate (Alembic)',
      'One-command setup with seed/init pipeline',
      'DNS strategy using Route 53 health checks and record set policies',
      'Reliability improvements via readiness checks and dependency mapping',
    ],
    challenges:
      'Schema drift across machines, service startup ordering, and bridging local container workflows with cloud routing practices.',
    impact:
      'Reduced environment spin-up time from ~30 minutes to <3 minutes while achieving strong parity between local and cloud environments.',
    caseStudy: {
      headline:
        'Built a reproducible production-like environment where dev/staging/prod behave the same — no “works on my machine.”',
      engineeringChallenge: {
        title: 'The Engineering Challenge',
        bullets: [
          'Production failures often come from configuration drift, not code.',
          'The goal was environment parity: identical behavior across local, staging, and production.',
          'Designed a containerized 3-tier system that is reproducible and onboarding-friendly.',
        ],
      },
      architecture: {
        title: 'Technical Architecture: Container Orchestration',
        summary:
          'Docker + Docker Compose orchestrate frontend, backend, and database — treating infrastructure as code.',
        agents: [
          {
            name: 'Frontend Tier (React SPA)',
            role: 'Lightweight container optimized for production builds and fast UI delivery.',
            icon: 'frontend',
          },
          {
            name: 'Application Tier (Flask)',
            role: 'WSGI microservice handling REST APIs and business logic with stateless design for scaling.',
            icon: 'backend',
          },
          {
            name: 'Data Tier (PostgreSQL)',
            role: 'Persistent relational storage with volume mapping so data survives restarts.',
            icon: 'database',
          },
          {
            name: 'Cloud Routing (Route 53)',
            role: 'DNS routing strategy with record sets and health checks for availability.',
            icon: 'orchestrator',
          },
        ],
      },
      decisions: {
        title: 'Key Technical Deep-Dives',
        items: [
          {
            heading: 'Database Evolution with Flask-Migrate (Alembic)',
            decision:
              'Implemented versioned migrations so schemas evolve safely across machines and environments.',
            why:
              'Manual schema updates are error-prone and cause drift; migrations keep DB and models in sync.',
          },
          {
            heading: 'Cloud Networking & DNS (AWS Route 53)',
            decision:
              'Designed DNS routing strategy with policy JSON for record set management and health checks.',
            tradeoff:
              'More upfront infrastructure work, but demonstrates production-grade routing fundamentals.',
          },
          {
            heading: 'Orchestrated Seed & Init Pipelines',
            decision:
              'Integrated seed_data.py into the Docker lifecycle so new devs get a populated environment via one command.',
            impact:
              'Enabled “docker-compose up --build” to create a test-ready stack in seconds.',
          },
        ],
      },
      performance: {
        title: 'Quantified Engineering Impact',
        metrics: [
          { label: 'Setup efficiency', value: 'Reduced local environment spin-up time from ~30 minutes to <3 minutes.', icon: 'setup' },
          { label: 'Reliability', value: 'Achieved strong parity across local and cloud environments, eliminating config-related bugs.', icon: 'reliability' },
          { label: 'Scalability', value: 'Designed stateless Flask tier for horizontal scaling behind a load balancer.', icon: 'scale' },
        ],
      },
      scar: {
        title: 'The “Engineering Scar”',
        problem:
          'A startup race condition: backend tried connecting to Postgres before the DB was ready, causing container crashes.',
        fix: [
          'Implemented a wait-for-it / health-check readiness pattern in Docker Compose.',
          'Mapped service dependencies so the application tier initializes only when DB ports are truly ready.',
          'Stabilized the startup path across laptops and CI runners.',
        ],
      },
      takeaway:
        'This project shows production thinking: infrastructure-as-code, deterministic environments, safe DB evolution, and distributed-systems readiness patterns.',
    },
  },

  // ✅ MindMate
  mindmate: {
    id: 'mindmate',
    title: 'MindMate: AI-Driven Mental Health Orchestration',
    category: 'ML',
    description:
      'Award-winning multi-server platform for empathetic AI support with secure persistence and longitudinal insights.',
    longDescription:
      'MindMate combines responsive real-time AI chat with secure, persistent well-being tracking. The system uses a multi-server architecture to keep the chat experience fast while the backend processes longitudinal analytics for trends and insights.',
    tags: ['React', 'Vercel', 'Node.js', 'Express', 'WebSockets', 'MongoDB Atlas', 'Firebase Auth', 'Gemini', 'NodeMailer'],
    image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=1200&h=600&fit=crop',
    github: '#',
    demo: '#',
    date: 'Mar 2025 (Hackathon)',
    team: 'Hackathon Team',
    features: [
      'Real-time AI chat via dedicated WebSocket engine for low-latency interaction',
      'Secure authentication + token verification with Firebase Admin SDK',
      'Longitudinal analytics and trend visualization from sentiment + user inputs',
      'Decoupled worker for automated wellness emails (non-blocking)',
      'Recovery-safe UX on reconnect to prevent lost messages',
    ],
    challenges:
      'Keeping chat responsive while processing longitudinal analytics and ensuring secure access to sensitive user data.',
    impact:
      'Awarded at H2AI Georgetown Hackathon; achieved sub-second chat responses via a dedicated socket server and resilient reconnection logic.',
    caseStudy: {
      headline:
        'A secure, responsive mental-health platform that balances empathy + privacy using a decoupled multi-server architecture.',
      engineeringChallenge: {
        title: 'The Engineering Challenge',
        bullets: [
          'Mental health systems require two hard things together: empathy and security.',
          'The system must feel instant (real-time support) while preserving a private longitudinal record of a user’s journey.',
          'Built a decoupled architecture so chat remains responsive while analytics runs in parallel.',
        ],
      },
      architecture: {
        title: 'System Architecture: Multi-Server Strategy',
        summary:
          'Avoided a monolith by separating concerns into distinct services for performance and reliability.',
        agents: [
          { name: 'Frontend (React / Vercel)', role: 'Low-latency UI with Firebase Auth integration for secure sign-in.', icon: 'frontend' },
          { name: 'Core API (Node / Express)', role: 'Business logic, MongoDB interactions, and Gemini integration for AI responses.', icon: 'backend' },
          { name: 'Real-Time Engine (WebSockets)', role: 'Dedicated bi-directional chat server to maintain an instant, “human” feel.', icon: 'realtime' },
          { name: 'Email Worker (NodeMailer)', role: 'Isolated worker for personalized wellness suggestions without blocking API threads.', icon: 'worker' },
        ],
      },
      decisions: {
        title: 'Key Technical Deep-Dives',
        items: [
          {
            heading: 'Generative AI Integration (Google Gemini)',
            decision:
              'Used Gemini for high-reasoning empathetic dialogue and implemented system prompting for safe, bounded responses.',
            why:
              'Prioritized user safety: supportive guidance + curated resources, not medical diagnosis.',
          },
          {
            heading: 'Secure Multi-Channel Authentication',
            decision:
              'Verified Google and Email/Password tokens with Firebase Admin SDK to gate access to MongoDB Atlas data.',
            impact:
              'Ensured user records are accessible only via cryptographically signed sessions.',
          },
          {
            heading: 'Longitudinal Data Visualization',
            decision:
              'Designed MongoDB schema for efficient time-series queries so the UI renders trends without expensive rescans.',
            tradeoff:
              'More schema planning upfront, but enables fast weekly/monthly trend dashboards.',
          },
        ],
      },
      performance: {
        title: 'Quantified Impact',
        metrics: [
          { label: 'Hackathon recognition', value: 'Awarded at the H2AI Georgetown University Hackathon for innovation in AI-driven wellness.', icon: 'accuracy' },
          { label: 'Performance', value: 'Sub-second chat responses by offloading real-time messaging to a dedicated WebSocket server.', icon: 'latency' },
          { label: 'Reliability', value: 'UI stays functional even if WebSocket server restarts via reconnection + room re-attach logic.', icon: 'reliability' },
        ],
      },
      scar: {
        title: 'The “Engineering Scar”',
        problem:
          'WebSocket synchronization issue: page refresh sometimes caused chat context to hang and lose continuity.',
        fix: [
          'Implemented a reconnect handshake using Firebase UID to re-attach users to the correct socket room.',
          'Backed reconnection with Redis-backed (or local state recovery) session context to avoid lost messages.',
          'Maintained a calm UX under churn: refresh, reconnect, continue.',
        ],
      },
      takeaway:
        'MindMate is engineered for trust: secure auth, decoupled real-time chat, and efficient longitudinal analytics — without sacrificing responsiveness.',
    },
  },
    // ✅ EchoSense (Environmental Sound Classification + interpretability)
  echosense: {
    id: 'echosense',
    title: 'EchoSense: Interpretable Environmental Sound Classification',
    category: 'ML',
    description:
      'Deep learning pipeline that converts raw audio into Mel-Spectrograms and uses a ResNet-style CNN with feature-map visualization for interpretable sound classification.',
    longDescription:
      'EchoSense transforms noisy, high-dimensional audio waveforms into Mel-Spectrogram “images,” enabling CNN-based classification of environmental sounds. The system is built as a modular pipeline: preprocessing (.wav → Mel-Spectrogram), a ResNet-inspired backbone with residual connections for stable deep training, and an interpretability layer that visualizes intermediate feature maps to validate what the model is learning.',
    tags: [
      'Python',
      'PyTorch',
      'Librosa',
      'Mel-Spectrogram',
      'ResNet',
      'CNN',
      'TensorBoard',
      'Model Interpretability',
      'Feature Maps',
    ],
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=600&fit=crop',
    github: '#',
    demo: '#',
    date: '2025',
    team: 'Team Project',
    features: [
      'Audio preprocessing engine: .wav → Mel-Spectrogram for CNN-ready 2D representations',
      'ResNet-style CNN with residual blocks to stabilize deep training and preserve low-level acoustic detail',
      'Intermediate feature-map visualization via forward hooks for interpretability and debugging',
      'TensorBoard instrumentation for loss/accuracy tracking and overfitting detection',
      'Modular design to swap backbones (e.g., ResNet → EfficientNet) with minimal refactor',
    ],
    challenges:
      'Spectrogram resolution trade-offs (N_FFT / hop length), overlapping sound events, and balancing accuracy with memory/inference constraints.',
    impact:
      'Enabled interpretable sound classification by validating layer-wise activations on acoustic patterns; achieved stable convergence on deeper CNNs using residual connections and real-time training telemetry.',
    caseStudy: {
      headline:
        'EchoSense brings interpretability to environmental sound classification by visualizing what a ResNet-style acoustic model attends to — not just its final prediction.',
      engineeringChallenge: {
        title: 'The Engineering Challenge',
        bullets: [
          'Raw audio waveforms are noisy and high-dimensional; the key challenge is extracting machine-usable structure without losing temporal nuance.',
          'Standard deep CNNs can degrade fine-grained acoustic detail as depth increases.',
          'Model interpretability was a first-class requirement: verify what the network learns at each stage.',
        ],
      },
      architecture: {
        title: 'Technical Architecture: Acoustic Pipeline',
        summary:
          'A modular research-to-production pipeline: audio preprocessing → ResNet-style CNN backbone → interpretability tools for feature-map visualization and training telemetry.',
        agents: [
          {
            name: 'Preprocessing Engine',
            role: 'Converts raw .wav audio into Mel-Spectrogram representations to shift 1D signal processing into 2D pattern recognition.',
            icon: 'backend',
          },
          {
            name: 'ResNet-style CNN Backbone',
            role: 'Residual blocks preserve low-level acoustic cues while deeper layers learn higher-level semantics; mitigates vanishing gradients.',
            icon: 'nlp',
          },
          {
            name: 'Interpretability Layer',
            role: 'Extracts and renders intermediate feature maps (forward hooks) to validate activations on correct acoustic patterns.',
            icon: 'frontend',
          },
          {
            name: 'Training Telemetry (TensorBoard)',
            role: 'Live visualization of convergence and validation behavior to detect overfitting to background noise.',
            icon: 'realtime',
          },
        ],
      },
      decisions: {
        title: 'Key Technical Deep-Dives',
        items: [
          {
            heading: 'Neural Interpretability (Feature Mapping)',
            decision:
              'Implemented forward hooks to visualize intermediate activations instead of treating the model as a black box.',
            why:
              'Feature maps help verify the model attends to meaningful acoustic structure (e.g., transients vs sustained tones) and enables debugging.',
            impact:
              'Improved model trustworthiness and accelerated iteration by identifying failure modes early.',
          },
          {
            heading: 'ResNet for Acoustic Robustness',
            decision:
              'Used residual connections to preserve low-level acoustic detail while enabling deeper architectures.',
            tradeoff:
              'Slight architectural complexity increase, but significantly improved training stability and representational capacity.',
            logic:
              'Skip-connections help gradients flow and allow identity learning — key for deeper CNNs on spectrogram inputs.',
          },
          {
            heading: 'Real-Time Metrics & Dashboarding',
            decision:
              'Instrumented training with TensorBoard and added a lightweight UI for quick qualitative checks during inference.',
            why:
              'Live monitoring helps detect overfitting to specific background noise patterns and guides hyperparameter tuning.',
          },
        ],
      },
      performance: {
        title: 'Quantified Engineering Impact',
        metrics: [
          {
            label: 'Robust feature extraction',
            value:
              'Mapped 1D audio waveforms into 2D Mel-Spectrogram space, enabling modern CNN techniques for audio classification.',
            icon: 'accuracy',
          },
          {
            label: 'Stable deep training',
            value:
              'Achieved stable convergence on deeper architectures using residual blocks, validated through TensorBoard telemetry.',
            icon: 'reliability',
          },
          {
            label: 'Modular research-ready code',
            value:
              'Designed components for easy backbone swaps (ResNet → EfficientNet) and faster experimentation.',
            icon: 'scale',
          },
        ],
      },
      scar: {
        title: 'The “Engineering Scar”',
        problem:
          'Spectrogram resolution trade-off: improving overlap separation increased memory usage and slowed inference.',
        fix: [
          'Systematically tuned N_FFT and hop length to find a “Goldilocks zone” balancing accuracy and compute.',
          'Validated trade-offs using training curves + qualitative feature-map inspection.',
          'Optimized settings for deployability (edge-friendly inference constraints).',
        ],
      },
      takeaway:
        'EchoSense demonstrates end-to-end ML engineering: signal-to-vision transformation, deep CNN stability, and interpretability-first debugging practices.',
    },
  },

  // ✅ Geospatial Data Mining (Crime x Housing)
  'dc-crime-housing': {
    id: 'dc-crime-housing',
    title: 'Geospatial Data Mining: DC Crime & Property Valuation',
    category: 'ML',
    description:
      'Built an analytical base table by harmonizing crime incidents with housing data to quantify how crime types (controlled for socioeconomic factors) influence property valuation.',
    longDescription:
      'This project tackled data harmonization across granularities (crime points vs neighborhood-level real estate). I engineered a robust pipeline to fuse Kaggle housing data with D.C. Open Data crime incidents, mitigate outliers using IQR rules, address multicollinearity, and train both regression (LightGBM/Random Forest) and classification (XGBoost) models to estimate price and price brackets.',
    tags: [
      'Python',
      'Pandas',
      'Geospatial Joins',
      'Data Cleaning',
      'IQR Outliers',
      'LightGBM',
      'Random Forest',
      'XGBoost',
      'Feature Importance',
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
    github: '#',
    demo: '#',
    date: '2014–2018 Dataset',
    team: 'Solo Project',
    features: [
      'Unified “Analytical Base Table” merging housing + crime datasets across different granularities',
      'Outlier mitigation using 1.5×IQR to reduce long-tail price skew and stabilize model learning',
      'Correlation analysis / heatmaps to identify multicollinearity and improve feature selection',
      'Dual modeling: regression for continuous price + classification for price brackets (market segmentation)',
      'Feature-importance analysis (Gain/Weight) to identify crime types with strongest price impact signals',
    ],
    challenges:
      'High null rates during joins due to inconsistent neighborhood naming and mismatched geographic identifiers across datasets.',
    impact:
      'Improved join match rate to 95%+ using normalization/mapping; produced actionable neighborhood risk signals and a reproducible pipeline that can generalize to other municipal datasets.',
    caseStudy: {
      headline:
        'A data harmonization case study: fusing messy real-world crime and housing datasets into a reliable analytical table to model price sensitivity by crime type.',
      engineeringChallenge: {
        title: 'The Engineering Challenge',
        bullets: [
          'Crime data and real-estate data are captured at different granularities (incident points vs neighborhood aggregations).',
          'Real estate prices are long-tailed; outliers can destroy regression signal and mislead accuracy metrics.',
          'Dataset joining is fragile due to naming inconsistencies and missing/dirty geographic identifiers.',
        ],
      },
      architecture: {
        title: 'Technical Workflow: From Raw Points to Insights',
        summary:
          'Built a robust ETL-style pipeline: clean + normalize identifiers → build an analytical base table → model price (regression) and brackets (classification) → interpret drivers via feature importance.',
        agents: [
          {
            name: 'Data Fusion & Cleaning',
            role: 'Merged Kaggle housing data with D.C. Open Data crime incidents; standardized neighborhood/ward identifiers.',
            icon: 'database',
          },
          {
            name: 'Preprocessing & Outlier Control',
            role: 'Applied 1.5×IQR filtering and validated distributions via boxplots/histograms to reduce skew.',
            icon: 'backend',
          },
          {
            name: 'Modeling Layer',
            role: 'Regression (LightGBM/Random Forest) + Classification (XGBoost) to capture price estimation and market segmentation.',
            icon: 'nlp',
          },
          {
            name: 'Interpretation Layer',
            role: 'Feature importance analysis (Gain/Weight) to identify the strongest predictors and crime-type penalties.',
            icon: 'frontend',
          },
        ],
      },
      decisions: {
        title: 'Key Technical Deep-Dives',
        items: [
          {
            heading: 'Handling Skewed Distributions (IQR Outliers)',
            decision:
              'Removed extreme price outliers using the 1.5×IQR rule and verified post-cleaning distributions.',
            why:
              'Long-tailed housing prices can dominate loss functions and degrade generalization; controlled outliers improve model stability.',
            impact:
              'Improved gradient-boosting convergence behavior and reduced sensitivity to extreme luxury sales.',
          },
          {
            heading: 'Gradient Boosting for Feature Importance',
            decision:
              'Used LightGBM for regression efficiency and extracted feature importance (Gain/Weight) to explain drivers.',
            logic:
              'Gradient boosting captures nonlinear relationships and interaction effects common in socio-economic + crime data.',
            impact:
              'Identified which crime categories contributed the strongest negative price signals after controlling for location factors.',
          },
          {
            heading: 'Dual Modeling Strategy (Regression + Classification)',
            decision:
              'Modeled both continuous price and price brackets to provide an interpretable segmentation view.',
            tradeoff:
              'More modeling complexity, but offers a second lens that is easier to communicate to non-technical stakeholders.',
          },
        ],
      },
      performance: {
        title: 'Quantified Impact & Findings',
        metrics: [
          {
            label: 'Join quality',
            value:
              'Achieved 95%+ match rate after implementing string normalization and mapping for ward/neighborhood identifiers.',
            icon: 'reliability',
          },
          {
            label: 'Actionable insights',
            value:
              'Derived neighborhood-level signals indicating where crime rates begin correlating inversely with property appreciation.',
            icon: 'accuracy',
          },
          {
            label: 'Reproducibility',
            value:
              'Built environment-agnostic setup (virtual env + requirements) enabling easy reuse for other city datasets.',
            icon: 'setup',
          },
        ],
      },
      scar: {
        title: 'The “Engineering Scar”',
        problem:
          'Joining millions of crime incidents with property records generated many nulls due to inconsistent neighborhood naming.',
        fix: [
          'Implemented string normalization (case/whitespace/abbreviations) and a mapping layer for canonical neighborhood/ward labels.',
          'Added validation checks for null spikes and mismatch auditing during ETL.',
          'Recovered critical spatial signal without dropping large portions of the dataset.',
        ],
      },
      takeaway:
        'This project demonstrates production-grade data engineering: robust joins, distribution-aware preprocessing, and interpretable modeling for real-world decision support.',
    },
  },

}

/* ----------------------------- PAGE ----------------------------- */

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = id ? projectsData[id] : null

  const hasCaseStudy = !!project?.caseStudy
  const [activeTab, setActiveTab] = useState<'overview' | 'casestudy'>('overview')

  // default to case study when present
  useEffect(() => {
    if (hasCaseStudy) setActiveTab('casestudy')
    else setActiveTab('overview')
  }, [hasCaseStudy, id])

  const cs = project?.caseStudy

  const meta = useMemo(
    () => (
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-2 text-foreground/60 dark:text-white/60">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{project?.date}</span>
        </div>
        <div className="flex items-center gap-2 text-foreground/60 dark:text-white/60">
          <Users className="w-4 h-4" />
          <span className="text-sm">{project?.team}</span>
        </div>

        <a
          href={project?.github || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-background/50 dark:bg-background/30 border border-white/10 dark:border-white/10 hover:bg-white/5 transition-colors"
        >
          <Github className="w-4 h-4" />
          <span className="text-sm font-medium">View Code</span>
        </a>

        <a
          href={project?.demo || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary dark:bg-accent text-white hover:shadow-lg transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm font-medium">Live Demo</span>
        </a>
      </div>
    ),
    [project]
  )

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground dark:text-white mb-4">
            Project Not Found
          </h1>
          <Link to="/projects" className="text-primary dark:text-accent hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      {/* ✅ 1) Progress bar */}
      <ScrollProgress />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4 tracking-tight">
              {project.title}
            </h1>
            <p className="text-xl text-foreground/60 dark:text-white/60 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Meta + Links */}
          {meta}

          {/* ✅ 2) Apple-style hero image overlay */}
          <div className="relative rounded-3xl overflow-hidden mb-10 border border-white/10 dark:border-white/10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[320px] sm:h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white backdrop-blur border border-white/10">
                  {project.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white backdrop-blur border border-white/10">
                  {project.team}
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white backdrop-blur border border-white/10">
                  {project.date}
                </span>
                {project.caseStudy && (
                  <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white backdrop-blur border border-white/10">
                    Case Study
                  </span>
                )}
              </div>

              <h2 className="text-white text-2xl sm:text-3xl font-semibold tracking-tight">
                {project.title}
              </h2>
              <p className="text-white/80 mt-2 max-w-3xl">{project.description}</p>
            </div>
          </div>

          {/* ✅ 3) Quick Facts section */}
          <QuickFacts project={project} />

          <div className="h-10" />

          {/* Sticky Tabs */}
          <StickyTabs hasCaseStudy={hasCaseStudy} activeTab={activeTab} setActiveTab={setActiveTab} />

          <AnimatePresence mode="wait">
            {/* CASE STUDY */}
            {hasCaseStudy && activeTab === 'casestudy' && cs && (
              <motion.div
                key="casestudy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-10"
              >
                <Surface>
                  <SectionTitle kicker="In one line">What this project proves</SectionTitle>
                  <p className="text-lg sm:text-xl text-foreground/70 dark:text-white/70 leading-relaxed">
                    {cs.headline}
                  </p>
                </Surface>

                <Surface>
                  <SectionTitle kicker="Why it mattered">{cs.engineeringChallenge.title}</SectionTitle>
                  <ul className="space-y-3">
                    {cs.engineeringChallenge.bullets.map((b, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-foreground/70 dark:text-white/70"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Surface>

                <Surface>
                  <SectionTitle kicker="How it works">{cs.architecture.title}</SectionTitle>
                  <p className="text-foreground/70 dark:text-white/70 mb-6 leading-relaxed">
                    {cs.architecture.summary}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {cs.architecture.agents.map((a) => (
                      <div
                        key={a.name}
                        className="rounded-3xl p-6 bg-background/40 dark:bg-background/20 border border-white/10 dark:border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-2xl bg-primary/10 dark:bg-accent/10 border border-white/10 dark:border-white/10">
                            <AgentIcon type={a.icon} />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground dark:text-white">
                            {a.name}
                          </h3>
                        </div>
                        <p className="text-foreground/70 dark:text-white/70 leading-relaxed">
                          {a.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </Surface>

                <div className="space-y-4">
                  <SectionTitle kicker="Trade-offs & choices">{cs.decisions.title}</SectionTitle>

                  {cs.decisions.items.map((d, idx) => (
                    <AccordionItem key={d.heading} title={d.heading} defaultOpen={idx === 0}>
                      <div className="space-y-3">
                        <p>
                          <span className="font-semibold text-foreground dark:text-white">
                            Decision:{' '}
                          </span>
                          {d.decision}
                        </p>
                        {d.tradeoff && (
                          <p>
                            <span className="font-semibold text-foreground dark:text-white">
                              Trade-off:{' '}
                            </span>
                            {d.tradeoff}
                          </p>
                        )}
                        {d.logic && (
                          <p>
                            <span className="font-semibold text-foreground dark:text-white">
                              Logic:{' '}
                            </span>
                            {d.logic}
                          </p>
                        )}
                        {d.why && (
                          <p>
                            <span className="font-semibold text-foreground dark:text-white">
                              Why:{' '}
                            </span>
                            {d.why}
                          </p>
                        )}
                        {d.impact && (
                          <p>
                            <span className="font-semibold text-foreground dark:text-white">
                              Impact:{' '}
                            </span>
                            {d.impact}
                          </p>
                        )}
                      </div>
                    </AccordionItem>
                  ))}
                </div>

                <Surface>
                  <SectionTitle kicker="Numbers that matter">{cs.performance.title}</SectionTitle>
                  <div className="grid md:grid-cols-3 gap-6">
                    {cs.performance.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-3xl p-6 bg-background/40 dark:bg-background/20 border border-white/10 dark:border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-2xl bg-primary/10 dark:bg-accent/10 border border-white/10 dark:border-white/10">
                            <MetricIcon type={m.icon} />
                          </div>
                          <p className="text-sm font-semibold text-foreground dark:text-white">
                            {m.label}
                          </p>
                        </div>
                        <p className="text-foreground/70 dark:text-white/70 leading-relaxed">
                          {m.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </Surface>

                <Surface>
                  <SectionTitle kicker="Hardest bug solved">{cs.scar.title}</SectionTitle>
                  <p className="text-foreground/70 dark:text-white/70 mb-5 leading-relaxed">
                    <span className="font-semibold text-foreground dark:text-white">Problem: </span>
                    {cs.scar.problem}
                  </p>

                  <div className="rounded-3xl p-6 bg-background/40 dark:bg-background/20 border border-white/10 dark:border-white/10">
                    <p className="text-foreground dark:text-white font-semibold mb-3">Fix:</p>
                    <ul className="space-y-3">
                      {cs.scar.fix.map((f, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-foreground/70 dark:text-white/70"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Divider />

                  <p className="text-foreground/70 dark:text-white/70 leading-relaxed">
                    <span className="font-semibold text-foreground dark:text-white">
                      Takeaway:{' '}
                    </span>
                    {cs.takeaway}
                  </p>
                </Surface>
              </motion.div>
            )}

            {/* OVERVIEW */}
            {(!hasCaseStudy || activeTab === 'overview') && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-10"
              >
                <Surface>
                  <SectionTitle kicker="Overview">What I built</SectionTitle>
                  <p className="text-foreground/70 dark:text-white/70 leading-relaxed text-lg">
                    {project.longDescription}
                  </p>
                </Surface>

                <Surface>
                  <SectionTitle kicker="Stack">Tech Stack</SectionTitle>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <Pill key={tag}>{tag}</Pill>
                    ))}
                  </div>
                </Surface>

                <Surface>
                  <SectionTitle kicker="Highlights">Key Features</SectionTitle>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-foreground/70 dark:text-white/70"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent mt-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Surface>

                <div className="grid md:grid-cols-2 gap-6">
                  <Surface>
                    <SectionTitle kicker="Constraints">Challenges</SectionTitle>
                    <p className="text-foreground/70 dark:text-white/70 leading-relaxed">
                      {project.challenges}
                    </p>
                  </Surface>
                  <Surface>
                    <SectionTitle kicker="Outcome">Impact</SectionTitle>
                    <p className="text-foreground/70 dark:text-white/70 leading-relaxed">
                      {project.impact}
                    </p>
                  </Surface>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
