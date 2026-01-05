'use client'

import { useState, useEffect } from 'react'
import { Journey, JourneyQuestion, JourneyAnswer, JourneyState, ContentItem } from '@/types/journey'
import { recommendContent } from '@/utils/contentRecommendation'

interface JourneyProps {
  journey: Journey
  contentLibrary: ContentItem[]
  onComplete: (recommendedContent: ContentItem[]) => void
  onAnswer?: (answer: JourneyAnswer) => void
}

export default function JourneyComponent({
  journey,
  contentLibrary,
  onComplete,
  onAnswer,
}: JourneyProps) {
  const [state, setState] = useState<JourneyState>({
    currentQuestionId: journey.startQuestionId,
    answers: [],
    isComplete: false,
    recommendedContent: [],
  })

  const currentQuestion = journey.questions.find((q) => q.id === state.currentQuestionId)

  const handleAnswer = (answer: JourneyAnswer) => {
    const newAnswers = [...state.answers, answer]
    setState((prev) => ({ ...prev, answers: newAnswers }))

    // Notify parent
    if (onAnswer) {
      onAnswer(answer)
    }

    // Determine next question
    const nextQuestionId = getNextQuestionId(currentQuestion!, answer)

    if (nextQuestionId === 'complete' || !nextQuestionId) {
      // Journey complete - generate recommendations
      const recommended = recommendContent(newAnswers, contentLibrary)
      setState((prev) => ({
        ...prev,
        isComplete: true,
        recommendedContent: recommended,
      }))
      onComplete(recommended)
    } else {
      setState((prev) => ({ ...prev, currentQuestionId: nextQuestionId }))
    }
  }

  const getNextQuestionId = (question: JourneyQuestion, answer: JourneyAnswer): string | null => {
    if (!question.nextQuestion) return null

    if (typeof question.nextQuestion === 'function') {
      return question.nextQuestion(answer)
    }

    return question.nextQuestion
  }

  if (!currentQuestion) return null

  return (
    <div style={{ padding: '20px' }}>
      <QuestionRenderer question={currentQuestion} onAnswer={handleAnswer} />

      {/* Progress indicator */}
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#64748b' }}>
        Question {state.answers.length + 1} of {journey.questions.length}
      </div>
    </div>
  )
}

interface QuestionRendererProps {
  question: JourneyQuestion
  onAnswer: (answer: JourneyAnswer) => void
}

function QuestionRenderer({ question, onAnswer }: QuestionRendererProps) {
  const [inputValue, setInputValue] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const submitAnswer = (value: string | string[] | boolean, tags: string[] = []) => {
    onAnswer({
      questionId: question.id,
      type: question.type,
      value,
      tags: [...tags, ...(question.tags || [])],
    })
  }

  switch (question.type) {
    case 'message':
      return (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#0f172a' }}>
            {question.question}
          </h3>
          {question.description && (
            <p style={{ color: '#64748b', marginBottom: '16px', fontSize: '14px', lineHeight: '1.5' }}>{question.description}</p>
          )}
          <button
            onClick={() => submitAnswer('acknowledged', [])}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #0B3398 0%, #1e40af 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s',
            }}
          >
            Continue
          </button>
        </div>
      )

    case 'yesno':
      return (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#0f172a' }}>
            {question.question}
          </h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => submitAnswer(true, ['yes'])}
              style={{
                flex: 1,
                padding: '14px',
                background: 'white',
                border: '1.5px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: '#475569',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0B3398'
                e.currentTarget.style.background = 'rgba(11, 51, 152, 0.03)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0'
                e.currentTarget.style.background = 'white'
              }}
            >
              Yes
            </button>
            <button
              onClick={() => submitAnswer(false, ['no'])}
              style={{
                flex: 1,
                padding: '14px',
                background: 'white',
                border: '1.5px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: '#475569',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0B3398'
                e.currentTarget.style.background = 'rgba(11, 51, 152, 0.03)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0'
                e.currentTarget.style.background = 'white'
              }}
            >
              No
            </button>
          </div>
        </div>
      )

    case 'single-select':
      return (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#0f172a' }}>
            {question.question}
          </h3>
          {question.description && (
            <p style={{ color: '#64748b', marginBottom: '16px', fontSize: '14px', lineHeight: '1.5' }}>{question.description}</p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {question.options?.map((option) => (
              <button
                key={option.id}
                onClick={() => submitAnswer(option.value, option.tags || [])}
                style={{
                  padding: '14px',
                  background: 'white',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#475569',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0B3398'
                  e.currentTarget.style.background = 'rgba(11, 51, 152, 0.03)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.background = 'white'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )

    case 'multi-select':
      return (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#0f172a' }}>
            {question.question}
          </h3>
          {question.description && (
            <p style={{ color: '#64748b', marginBottom: '16px', fontSize: '14px', lineHeight: '1.5' }}>{question.description}</p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {question.options?.map((option) => {
              const isSelected = selectedOptions.includes(option.id)
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedOptions(selectedOptions.filter((id) => id !== option.id))
                    } else {
                      setSelectedOptions([...selectedOptions, option.id])
                    }
                  }}
                  style={{
                    padding: '14px',
                    background: isSelected ? 'rgba(11, 51, 152, 0.05)' : 'white',
                    border: `1.5px solid ${isSelected ? '#0B3398' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#475569',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: `1.5px solid ${isSelected ? '#0B3398' : '#cbd5e1'}`,
                    background: isSelected ? '#0B3398' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {isSelected && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  {option.label}
                </button>
              )
            })}
          </div>
          <button
            onClick={() => {
              const selected = question.options?.filter((opt) => selectedOptions.includes(opt.id)) || []
              const values = selected.map((opt) => opt.value)
              const tags = selected.flatMap((opt) => opt.tags || [])
              submitAnswer(values, tags)
            }}
            disabled={selectedOptions.length === 0}
            style={{
              padding: '12px 24px',
              background: selectedOptions.length > 0
                ? 'linear-gradient(135deg, #0B3398 0%, #1e40af 100%)'
                : '#e2e8f0',
              color: selectedOptions.length > 0 ? 'white' : '#94a3b8',
              border: 'none',
              borderRadius: '8px',
              cursor: selectedOptions.length > 0 ? 'pointer' : 'not-allowed',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s',
            }}
          >
            Continue
          </button>
        </div>
      )

    case 'free-form':
      return (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#0f172a' }}>
            {question.question}
          </h3>
          {question.description && (
            <p style={{ color: '#64748b', marginBottom: '16px', fontSize: '14px', lineHeight: '1.5' }}>{question.description}</p>
          )}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your answer..."
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1.5px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              marginBottom: '12px',
              outline: 'none',
              fontFamily: 'inherit',
              color: '#0f172a',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#0B3398'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0'
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && inputValue.trim()) {
                submitAnswer(inputValue, [])
              }
            }}
          />
          <button
            onClick={() => submitAnswer(inputValue || 'skipped', [])}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #0B3398 0%, #1e40af 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s',
            }}
          >
            Continue
          </button>
        </div>
      )

    default:
      return null
  }
}
