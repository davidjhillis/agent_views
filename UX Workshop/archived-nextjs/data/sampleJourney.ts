import { Journey, ContentItem } from '@/types/journey'

// Sample Journey: Product Demo Recommendation
export const productJourney: Journey = {
  id: 'product-demo-journey',
  name: 'Find Your Perfect Demo',
  description: 'Answer a few questions to get personalized product demonstrations',
  startQuestionId: 'role',
  questions: [
    {
      id: 'role',
      type: 'single-select',
      question: 'What best describes your role?',
      description: 'Help us show you the most relevant content',
      options: [
        { id: 'exec', label: 'Executive / Decision Maker', value: 'executive', tags: ['executive', 'overview', 'roi'] },
        { id: 'sales', label: 'Sales / Revenue', value: 'sales', tags: ['sales', 'features', 'demo'] },
        { id: 'marketing', label: 'Marketing', value: 'marketing', tags: ['marketing', 'analytics', 'campaigns'] },
        { id: 'product', label: 'Product / Engineering', value: 'product', tags: ['technical', 'integration', 'api'] },
      ],
      nextQuestion: 'team-size',
      tags: ['role-identification'],
    },
    {
      id: 'team-size',
      type: 'single-select',
      question: 'What is your team size?',
      options: [
        { id: 'solo', label: 'Just me', value: '1', tags: ['individual', 'starter'] },
        { id: 'small', label: '2-10 people', value: '2-10', tags: ['small-team', 'growth'] },
        { id: 'medium', label: '11-50 people', value: '11-50', tags: ['medium-team', 'scale'] },
        { id: 'large', label: '50+ people', value: '50+', tags: ['enterprise', 'scale'] },
      ],
      nextQuestion: 'priority',
      tags: ['sizing'],
    },
    {
      id: 'priority',
      type: 'multi-select',
      question: 'What are your top priorities?',
      description: 'Select all that apply',
      options: [
        { id: 'speed', label: 'Speed to market', value: 'speed', tags: ['fast-implementation', 'quick-start'] },
        { id: 'integration', label: 'Easy integration', value: 'integration', tags: ['integration', 'api', 'technical'] },
        { id: 'analytics', label: 'Deep analytics', value: 'analytics', tags: ['analytics', 'reporting', 'insights'] },
        { id: 'support', label: 'Premium support', value: 'support', tags: ['support', 'enterprise', 'success'] },
      ],
      nextQuestion: 'timeline',
      tags: ['priorities'],
    },
    {
      id: 'timeline',
      type: 'yesno',
      question: 'Are you evaluating solutions right now?',
      nextQuestion: (answer) => answer.value === true ? 'contact-info' : 'complete',
      tags: ['buying-intent'],
    },
    {
      id: 'contact-info',
      type: 'free-form',
      question: 'What is your email? (Optional)',
      description: 'We will send you these demos and additional resources',
      nextQuestion: 'complete',
      tags: ['lead-capture'],
    },
    {
      id: 'complete',
      type: 'message',
      question: 'Perfect! Here are your personalized demos',
      description: 'Based on your answers, we have curated the best content for you',
      tags: ['completion'],
    },
  ],
}

// Sample Content Library
export const contentLibrary: ContentItem[] = [
  // Executive Content
  {
    id: 'exec-overview',
    title: '2-Minute Product Overview',
    description: 'Quick overview of ShowPilot key benefits and ROI',
    type: 'video',
    url: 'https://example.com/videos/exec-overview.mp4',
    thumbnail: '/thumbnails/exec-overview.jpg',
    duration: '2:15',
    tags: ['executive', 'overview', 'roi'],
    featured: true,
    priority: 10,
  },
  {
    id: 'roi-calculator',
    title: 'ROI Calculator & Case Studies',
    description: 'See real results from companies like yours',
    type: 'pdf',
    url: 'https://example.com/docs/roi-case-studies.pdf',
    tags: ['executive', 'roi', 'case-study'],
    priority: 9,
  },

  // Sales Content
  {
    id: 'sales-demo',
    title: 'Full Product Walkthrough',
    description: 'Complete demonstration of all features',
    type: 'video',
    url: 'https://example.com/videos/full-demo.mp4',
    thumbnail: '/thumbnails/sales-demo.jpg',
    duration: '12:30',
    tags: ['sales', 'features', 'demo'],
    featured: true,
    priority: 10,
  },
  {
    id: 'sales-playbook',
    title: 'Sales Team Playbook',
    description: 'How top sales teams use ShowPilot',
    type: 'pdf',
    url: 'https://example.com/docs/sales-playbook.pdf',
    tags: ['sales', 'best-practices'],
    priority: 7,
  },

  // Marketing Content
  {
    id: 'marketing-analytics',
    title: 'Marketing Analytics Deep Dive',
    description: 'Track engagement, conversions, and ROI',
    type: 'demo',
    url: 'https://example.com/demos/analytics',
    thumbnail: '/thumbnails/analytics.jpg',
    tags: ['marketing', 'analytics', 'reporting'],
    featured: true,
    priority: 9,
  },
  {
    id: 'campaign-examples',
    title: 'Successful Campaign Examples',
    description: 'Real campaigns that drove results',
    type: 'case-study',
    url: 'https://example.com/case-studies/campaigns',
    tags: ['marketing', 'campaigns', 'case-study'],
    priority: 8,
  },

  // Technical Content
  {
    id: 'api-docs',
    title: 'API Documentation & Integration Guide',
    description: 'Complete technical documentation',
    type: 'article',
    url: 'https://example.com/docs/api',
    tags: ['technical', 'api', 'integration'],
    priority: 10,
  },
  {
    id: 'integration-demo',
    title: 'Live Integration Demo',
    description: 'See how ShowPilot integrates with your stack',
    type: 'demo',
    url: 'https://example.com/demos/integration',
    thumbnail: '/thumbnails/integration.jpg',
    tags: ['technical', 'integration', 'demo'],
    featured: true,
    priority: 9,
  },

  // Quick Start Content
  {
    id: 'quick-start',
    title: '5-Minute Quick Start',
    description: 'Get up and running in minutes',
    type: 'video',
    url: 'https://example.com/videos/quick-start.mp4',
    thumbnail: '/thumbnails/quick-start.jpg',
    duration: '5:00',
    tags: ['starter', 'quick-start', 'fast-implementation'],
    featured: true,
    priority: 10,
  },

  // Enterprise Content
  {
    id: 'enterprise-features',
    title: 'Enterprise Features & Security',
    description: 'SSO, SAML, advanced permissions, and more',
    type: 'pdf',
    url: 'https://example.com/docs/enterprise.pdf',
    tags: ['enterprise', 'security', 'scale'],
    priority: 8,
  },
  {
    id: 'support-sla',
    title: 'Premium Support & SLAs',
    description: 'Enterprise support options',
    type: 'pdf',
    url: 'https://example.com/docs/support-sla.pdf',
    tags: ['enterprise', 'support', 'success'],
    priority: 7,
  },
]
