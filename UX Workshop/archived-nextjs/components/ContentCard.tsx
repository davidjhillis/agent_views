'use client'

import { ContentItem } from '@/types/journey'

interface ContentCardProps {
  content: ContentItem
  onClick: () => void
  variant?: 'default' | 'featured' | 'compact'
}

export default function ContentCard({ content, onClick, variant = 'default' }: ContentCardProps) {
  const getTypeLabel = (type: ContentItem['type']) => {
    switch (type) {
      case 'video': return 'Video'
      case 'pdf': return 'PDF'
      case 'demo': return 'Demo'
      case 'article': return 'Article'
      case 'case-study': return 'Case Study'
      default: return 'Content'
    }
  }

  const getTypeColor = (type: ContentItem['type']) => {
    switch (type) {
      case 'video': return '#0B3398'
      case 'pdf': return '#475569'
      case 'demo': return '#0B3398'
      case 'article': return '#475569'
      case 'case-study': return '#0B3398'
      default: return '#64748b'
    }
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 14px',
          background: 'white',
          border: '1.5px solid #e2e8f0',
          borderRadius: '8px',
          width: '100%',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#0B3398'
          e.currentTarget.style.background = 'rgba(11, 51, 152, 0.02)'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#e2e8f0'
          e.currentTarget.style.background = 'white'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <div
          style={{
            padding: '4px 8px',
            background: `${getTypeColor(content.type)}15`,
            color: getTypeColor(content.type),
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            flexShrink: 0,
          }}
        >
          {getTypeLabel(content.type)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: '500',
            fontSize: '14px',
            color: '#0f172a',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {content.title}
          </div>
          {content.duration && (
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              {content.duration}
            </div>
          )}
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <path d="M6 12L10 8L6 4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      style={{
        background: variant === 'featured' ? 'rgba(11, 51, 152, 0.03)' : 'white',
        border: variant === 'featured' ? '1.5px solid #0B3398' : '1.5px solid #e2e8f0',
        borderRadius: '12px',
        padding: '14px',
        width: '100%',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s',
        boxShadow: variant === 'featured' ? '0 2px 8px rgba(11, 51, 152, 0.08)' : 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = variant === 'featured' ? '0 2px 8px rgba(11, 51, 152, 0.08)' : 'none'
      }}
    >
      {/* Thumbnail or Icon */}
      {content.thumbnail ? (
        <div
          style={{
            width: '100%',
            height: '120px',
            background: `url(${content.thumbnail}) center/cover`,
            borderRadius: '12px',
            marginBottom: '12px',
            position: 'relative',
          }}
        >
          {content.duration && (
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              {content.duration}
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '120px',
            background: `linear-gradient(135deg, ${getTypeColor(content.type)}12 0%, ${getTypeColor(content.type)}05 100%)`,
            borderRadius: '8px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{
            fontSize: '12px',
            fontWeight: '600',
            color: getTypeColor(content.type),
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            {getTypeLabel(content.type)}
          </div>
        </div>
      )}

      {/* Content type badge */}
      <div
        style={{
          display: 'inline-block',
          padding: '4px 10px',
          background: getTypeColor(content.type) + '15',
          color: getTypeColor(content.type),
          borderRadius: '4px',
          fontSize: '10px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '10px',
        }}
      >
        {getTypeLabel(content.type)}
      </div>

      {/* Title */}
      <h4
        style={{
          fontSize: '15px',
          fontWeight: '600',
          color: '#0f172a',
          marginBottom: '6px',
          lineHeight: '1.4',
        }}
      >
        {content.title}
      </h4>

      {/* Description */}
      <p
        style={{
          fontSize: '13px',
          color: '#64748b',
          lineHeight: '1.5',
          marginBottom: '12px',
        }}
      >
        {content.description}
      </p>

      {/* Action button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#0B3398',
          fontSize: '13px',
          fontWeight: '600',
        }}
      >
        {content.type === 'video' || content.type === 'demo' ? 'Watch' : 'View'}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </button>
  )
}
