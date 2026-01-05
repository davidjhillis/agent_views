'use client'

import { useState, useEffect } from 'react'
import DemoControls from '@/components/DemoControls'
import ShowPilotWidget from '@/components/ShowPilotWidget'
import { ContentItem } from '@/types/journey'

export default function Home() {
  const [position, setPosition] = useState<string>('chat-button')
  const [isAvatarEnabled, setIsAvatarEnabled] = useState(false)
  const [contentPlaylist, setContentPlaylist] = useState<ContentItem[]>([])
  const [showContentViewer, setShowContentViewer] = useState(false)

  // FORCE Site Agent position on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setPosition('center-low-rectangle')
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLaunchContentViewer = (playlist: ContentItem[]) => {
    setContentPlaylist(playlist)
    setShowContentViewer(true)
    setPosition('content-viewer')
  }

  const handleCloseContentViewer = () => {
    setShowContentViewer(false)
    setPosition('chat-button')
  }

  return (
    <>
      <div className="page-content">
        <h1>ShowPilot Journeys</h1>
        <p>AI-Powered Content Recommendations</p>
      </div>

      <DemoControls
        position={position}
        setPosition={setPosition}
        isAvatarEnabled={isAvatarEnabled}
        setIsAvatarEnabled={setIsAvatarEnabled}
      />

      {showContentViewer ? (
        <div
          id="showpilot-widget"
          data-position="content-viewer"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '92vw',
            height: '88vh',
            maxWidth: '1800px',
            zIndex: 99999,
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
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
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a' }}>
                  Your Content Playlist
                </h2>
                <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                  {contentPlaylist.length} {contentPlaylist.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                onClick={handleCloseContentViewer}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '4px',
                  color: '#64748b',
                }}
              >
                ✕
              </button>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              {/* Main Content */}
              <div style={{ flex: 1, padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafbfc' }}>
                <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, rgba(11, 51, 152, 0.1) 0%, rgba(30, 64, 175, 0.05) 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                  }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5v14l11-7z" fill="#0B3398"/>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '12px', color: '#0f172a' }}>
                    {contentPlaylist[0]?.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '24px', lineHeight: '1.6' }}>
                    {contentPlaylist[0]?.description}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <div
                      style={{
                        padding: '6px 14px',
                        background: 'rgba(11, 51, 152, 0.1)',
                        color: '#0B3398',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {contentPlaylist[0]?.type}
                    </div>
                    {contentPlaylist[0]?.duration && (
                      <div
                        style={{
                          padding: '6px 14px',
                          background: '#f1f5f9',
                          color: '#475569',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                        }}
                      >
                        {contentPlaylist[0]?.duration}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Playlist Sidebar */}
              {contentPlaylist.length > 1 && (
                <div
                  style={{
                    width: '320px',
                    borderLeft: '1px solid #e2e8f0',
                    overflowY: 'auto',
                    padding: '20px',
                  }}
                >
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Up Next
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {contentPlaylist.slice(1).map((item, idx) => (
                      <div
                        key={item.id}
                        style={{
                          padding: '12px',
                          background: '#f8fafc',
                          borderRadius: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', marginBottom: '4px' }}>
                          #{idx + 2}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', marginBottom: '4px' }}>
                          {item.title}
                        </div>
                        {item.duration && (
                          <div style={{ fontSize: '12px', color: '#64748b' }}>
                            {item.duration}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <ShowPilotWidget
          position={position}
          isAvatarEnabled={isAvatarEnabled}
          onLaunchContentViewer={handleLaunchContentViewer}
        />
      )}
    </>
  )
}
