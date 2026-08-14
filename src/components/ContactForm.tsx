import { useState } from 'react'
import toast from 'react-hot-toast'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaewbzbd'
const FALLBACK_EMAIL = 'samarthshete1420@gmail.com'

type ContactFormVariant = 'home' | 'page'

type ContactFormProps = {
  variant?: ContactFormVariant
}

const styles = {
  home: {
    input:
      'w-full px-4 py-3 bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent outline-none transition-all text-foreground dark:text-white',
    button:
      'w-full px-6 py-3 bg-primary dark:bg-accent text-white rounded-2xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed',
  },
  page: {
    input:
      'w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent outline-none transition-all text-foreground dark:text-white',
    button:
      'w-full px-6 py-3 bg-primary dark:bg-accent text-white rounded-lg font-medium hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed',
  },
} as const

export default function ContactForm({ variant = 'home' }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const idPrefix = variant === 'home' ? 'home' : 'page'
  const s = styles[variant]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (!res.ok) throw new Error(`Formspree error: ${res.status}`)

      setFormData({ name: '', email: '', message: '' })
      setStatus('success')
      toast.success("Message sent — I'll get back to you soon.")
    } catch {
      setStatus('error')
      toast.error(`Something went wrong. Email me at ${FALLBACK_EMAIL}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor={`${idPrefix}-name`}
          className="block text-sm font-medium text-foreground dark:text-white mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id={`${idPrefix}-name`}
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={status === 'loading'}
          className={s.input}
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-email`}
          className="block text-sm font-medium text-foreground dark:text-white mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id={`${idPrefix}-email`}
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={status === 'loading'}
          className={s.input}
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-message`}
          className="block text-sm font-medium text-foreground dark:text-white mb-2"
        >
          Message
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          disabled={status === 'loading'}
          className={`${s.input} resize-none`}
          placeholder="Your message..."
        />
      </div>

      {status === 'success' && (
        <p className="text-sm text-green-600 dark:text-green-400" role="status">
          Thanks — your message was sent successfully.
        </p>
      )}

      {status === 'error' && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          Couldn&apos;t send your message. Please email{' '}
          <a
            href={`mailto:${FALLBACK_EMAIL}`}
            className="underline hover:text-primary dark:hover:text-accent"
          >
            {FALLBACK_EMAIL}
          </a>
          .
        </p>
      )}

      <button type="submit" disabled={status === 'loading'} className={s.button}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
