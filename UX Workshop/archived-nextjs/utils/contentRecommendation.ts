import { JourneyAnswer, ContentItem } from '@/types/journey'

/**
 * Content Recommendation Engine
 * Matches journey answers to content items based on tags
 */

export function recommendContent(
  answers: JourneyAnswer[],
  contentLibrary: ContentItem[],
  maxResults: number = 5
): ContentItem[] {
  // Collect all tags from answers
  const userTags = answers.flatMap((answer) => answer.tags)

  // Score each content item based on tag matches
  const scoredContent = contentLibrary.map((item) => {
    const matchScore = calculateMatchScore(item.tags, userTags)
    const priorityBonus = (item.priority || 5) / 10 // Convert priority to 0-1 scale
    const totalScore = matchScore + priorityBonus

    return {
      ...item,
      matchScore: totalScore,
    }
  })

  // Sort by score (highest first) and return top results
  return scoredContent
    .filter((item) => item.matchScore > 0) // Only include items with matches
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, maxResults)
}

/**
 * Calculate match score between content tags and user tags
 */
function calculateMatchScore(contentTags: string[], userTags: string[]): number {
  const matches = contentTags.filter((tag) => userTags.includes(tag))
  return matches.length
}

/**
 * Get featured content items that can be shown in chat
 */
export function getFeaturedContent(
  contentLibrary: ContentItem[],
  limit: number = 3
): ContentItem[] {
  return contentLibrary
    .filter((item) => item.featured === true)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0))
    .slice(0, limit)
}

/**
 * Filter content by type
 */
export function getContentByType(
  contentLibrary: ContentItem[],
  type: ContentItem['type']
): ContentItem[] {
  return contentLibrary.filter((item) => item.type === type)
}

/**
 * Get content for a specific tag
 */
export function getContentByTag(
  contentLibrary: ContentItem[],
  tag: string
): ContentItem[] {
  return contentLibrary.filter((item) => item.tags.includes(tag))
}
