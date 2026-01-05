// ShowPilot Journey System Types

export type QuestionType = 'yesno' | 'single-select' | 'multi-select' | 'free-form' | 'message'

export interface JourneyQuestion {
  id: string
  type: QuestionType
  question: string
  description?: string
  options?: JourneyOption[] // For single-select and multi-select
  nextQuestion?: string | ((answer: JourneyAnswer) => string) // Branching logic
  tags?: string[] // For content matching
}

export interface JourneyOption {
  id: string
  label: string
  value: string
  tags?: string[] // Tags for content matching
  icon?: string
}

export interface JourneyAnswer {
  questionId: string
  type: QuestionType
  value: string | string[] | boolean
  tags: string[] // Collected tags from answer
}

export interface ContentItem {
  id: string
  title: string
  description: string
  type: 'video' | 'pdf' | 'demo' | 'article' | 'case-study'
  url: string
  thumbnail?: string
  duration?: string // For videos
  tags: string[] // For matching with journey answers
  featured?: boolean // Can be shown as featured content
  priority?: number // Higher priority = shown first
}

export interface JourneyState {
  currentQuestionId: string | null
  answers: JourneyAnswer[]
  isComplete: boolean
  recommendedContent: ContentItem[]
}

export interface Journey {
  id: string
  name: string
  description: string
  questions: JourneyQuestion[]
  startQuestionId: string
}
