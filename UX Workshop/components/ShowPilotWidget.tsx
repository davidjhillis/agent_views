'use client'

import { useState, useEffect } from 'react'
import LiveAvatarComponent from './LiveAvatarComponent'
import JourneyComponent from './Journey'
import ContentCard from './ContentCard'
import { productJourney, contentLibrary } from '@/data/sampleJourney'
import { getFeaturedContent } from '@/utils/contentRecommendation'
import { ContentItem } from '@/types/journey'

interface ShowPilotWidgetProps {
  position: string
  isAvatarEnabled: boolean
  onLaunchContentViewer?: (playlist: ContentItem[]) => void
}

type ViewMode = 'chat' | 'journey' | 'recommendations'

export default function ShowPilotWidget({
  position,
  isAvatarEnabled,
  onLaunchContentViewer
}: ShowPilotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('chat')
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; type?: 'text' | 'featured-content' }>>([
    { text: 'Hi! I\'m your ShowPilot AI assistant. How can I help you today?', isUser: false },
  ])
  const [inputValue, setInputValue] = useState('')
  const [recommendedContent, setRecommendedContent] = useState<ContentItem[]>([])
  const [featuredContent] = useState<ContentItem[]>(getFeaturedContent(contentLibrary, 3))
  const [isMobile, setIsMobile] = useState(false)
  const [showMessageBubble, setShowMessageBubble] = useState(true)

  useEffect(() => {
    // Auto-open for some positions
    if (['center-low-rectangle', 'center-midsize-square', 'skyscraper', 'full-height-center', 'content-viewer'].includes(position)) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [position])

  useEffect(() => {
    // Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const sendMessage = () => {
    if (!inputValue.trim()) return

    setShowMessageBubble(false)
    setMessages([...messages, { text: inputValue, isUser: true }])
    setInputValue('')

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: 'I understand. Let me help you with that!', isUser: false },
      ])
    }, 1000)
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
    if (value.length > 0) {
      setShowMessageBubble(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  const handleStartJourney = () => {
    setViewMode('journey')
    setMessages([...messages, {
      text: 'Great! Let me ask you a few questions to find the perfect demos for you.',
      isUser: false
    }])
  }

  const handleJourneyComplete = (recommended: ContentItem[]) => {
    setRecommendedContent(recommended)
    setViewMode('recommendations')
    setMessages((prev) => [...prev, {
      text: `Perfect! Based on your answers, I've found ${recommended.length} personalized demos for you.`,
      isUser: false
    }])
  }

  const handleViewContent = (content: ContentItem) => {
    // Launch content viewer with single item
    if (onLaunchContentViewer) {
      onLaunchContentViewer([content])
    }
  }

  const handleViewAllRecommendations = () => {
    // Launch content viewer with full playlist
    if (onLaunchContentViewer) {
      onLaunchContentViewer(recommendedContent)
    }
  }

  // Mobile layout
  if (isMobile) {
    return (
      <div id="showpilot-widget" data-position={position} style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        padding: '16px',
        boxShadow: '0 -4px 20px rgba(15, 23, 42, 0.1)',
        display: 'flex',
        gap: '12px',
        zIndex: 99999,
      }}>
        {/* Square Avatar */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '12px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          flexShrink: 0,
        }}>
          <img src="/av44.png" alt="ShowPilot Agent" style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }} />
        </div>

        {/* Chat Container */}
        <div style={{
          flex: 1,
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '120px',
        }}>
          <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Message Bubble */}
            {showMessageBubble && (
              <div style={{
                background: '#f1f5f9',
                padding: '10px 12px',
                borderRadius: '12px',
                fontSize: '13px',
                color: '#475569',
                lineHeight: '1.4',
                marginBottom: '10px',
              }}>
                👋 Hi! Ask me anything about our product demos.
              </div>
            )}

            {/* Input */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Chat with ShowPilot Agent"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  background: 'transparent',
                  color: '#0f172a',
                }}
              />
              <button
                onClick={sendMessage}
                style={{
                  width: '36px',
                  height: '36px',
                  background: inputValue.trim() ? '#0B3398' : '#e2e8f0',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Privacy Link */}
            <div style={{
              marginTop: '8px',
              paddingTop: '8px',
              borderTop: '1px solid #e2e8f0',
              textAlign: 'center',
            }}>
              <a href="#privacy" style={{
                fontSize: '9px',
                color: '#94a3b8',
                textDecoration: 'none',
              }}>Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Desktop layout
  return (
    <div id="showpilot-widget" data-position={position}>
      {position === 'chat-button' && !isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '14px 24px',
            background: 'linear-gradient(135deg, #0B3398 0%, #1e40af 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '100px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(11, 51, 152, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s',
            letterSpacing: '-0.2px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(11, 51, 152, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(11, 51, 152, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          Chat with AI
        </button>
      ) : (
        <div
          style={{
            background: 'white',
            borderRadius: position === 'skyscraper' ? '0' : '20px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '20px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #0B3398 0%, #1e40af 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                  <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M9 9H9.01M15 9H15.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '14px' }}>ShowPilot AI</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  {viewMode === 'journey' ? 'Journey Mode' :
                   viewMode === 'recommendations' ? 'Your Recommendations' :
                   isAvatarEnabled ? 'LiveAvatar Active' : 'Online'}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {viewMode !== 'chat' && (
                <button
                  onClick={() => setViewMode('chat')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    color: '#6366f1',
                    fontWeight: '600',
                  }}
                >
                  ← Back to Chat
                </button>
              )}
              {position === 'chat-button' && (
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Avatar Container */}
          {isAvatarEnabled && viewMode === 'chat' && (
            <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
              <LiveAvatarComponent />
            </div>
          )}

          {/* Main Content Area */}
          <div
            style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {viewMode === 'journey' ? (
              <JourneyComponent
                journey={productJourney}
                contentLibrary={contentLibrary}
                onComplete={handleJourneyComplete}
              />
            ) : viewMode === 'recommendations' ? (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                  Your Personalized Recommendations
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                  {recommendedContent.map((content) => (
                    <ContentCard
                      key={content.id}
                      content={content}
                      onClick={() => handleViewContent(content)}
                      variant="compact"
                    />
                  ))}
                </div>
                <button
                  onClick={handleViewAllRecommendations}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '15px',
                  }}
                >
                  View All in Playlist
                </button>
              </div>
            ) : (
              <>
                {/* Chat Messages */}
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
                      background: msg.isUser
                        ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                        : '#f1f5f9',
                      color: msg.isUser ? 'white' : '#0f172a',
                      padding: '12px 16px',
                      borderRadius: '16px',
                      maxWidth: '70%',
                      fontSize: '14px',
                    }}
                  >
                    {msg.text}
                  </div>
                ))}

                {/* Featured Content in Chat */}
                {messages.length <= 2 && featuredContent.length > 0 && (
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Featured Content
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {featuredContent.map((content) => (
                        <ContentCard
                          key={content.id}
                          content={content}
                          onClick={() => handleViewContent(content)}
                          variant="compact"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Journey CTA */}
                {messages.length <= 2 && (
                  <div style={{ marginTop: '12px' }}>
                    <button
                      onClick={handleStartJourney}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: 'white',
                        border: '1.5px solid #0B3398',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        color: '#0B3398',
                        fontSize: '14px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(11, 51, 152, 0.03)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white'
                      }}
                    >
                      Take a Quick Journey → Get Personalized Demos
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input - Only show in chat mode */}
          {viewMode === 'chat' && (
            <div style={{ padding: '20px', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={sendMessage}
                  style={{
                    padding: '12px 20px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
