export const FEATURED_PROJECT_IDS = [
  'agentscape-identity-trust-layer-for-ai-agents',
  'agentshield-security-evaluation-for-mcp-agents',
  'contextlens-rag-evaluation-debugging-platform',
] as const

export type ProjectTopicCategory =
  | 'ai-agents'
  | 'full-stack-product'
  | 'systems-infrastructure'
  | 'ml'

export const PROJECT_TOPIC_SECTIONS: {
  id: ProjectTopicCategory
  title: string
}[] = [
  { id: 'ai-agents', title: 'AI & Agents' },
  { id: 'full-stack-product', title: 'Full-Stack & Product' },
  { id: 'systems-infrastructure', title: 'Systems & Infrastructure' },
  { id: 'ml', title: 'ML' },
]

/** Topical category per project (Featured is derived from FEATURED_PROJECT_IDS). */
export const PROJECT_CATEGORY_MAP: Record<string, ProjectTopicCategory[]> = {
  'agentscape-identity-trust-layer-for-ai-agents': ['full-stack-product'],
  'agentshield-security-evaluation-for-mcp-agents': ['ai-agents'],
  'contextlens-rag-evaluation-debugging-platform': ['ai-agents'],
  'smarthire-ai': ['ml'],
  interviewiq: ['ai-agents'],
  'cloud-native-3tier': ['systems-infrastructure'],
  mindmate: ['full-stack-product'],
  echosense: ['ml'],
  'dc-crime-housing': ['ml'],
}
