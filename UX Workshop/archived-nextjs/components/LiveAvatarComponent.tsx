'use client'

import { useEffect, useRef, useState } from 'react'

export default function LiveAvatarComponent() {
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const dailyCallRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const initializeAvatar = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch conversation URL from Tavus API
        const response = await fetch('/api/liveavatar')
        if (!response.ok) {
          throw new Error('Failed to create Tavus conversation')
        }

        const { conversationUrl } = await response.json()
        console.log('Tavus conversation URL:', conversationUrl)

        // Import Daily.co SDK
        const DailyIframe = (await import('@daily-co/daily-js')).default

        if (!videoContainerRef.current) {
          throw new Error('Video container not ready')
        }

        // Create Daily call object
        dailyCallRef.current = DailyIframe.createFrame(videoContainerRef.current, {
          showLeaveButton: false,
          showFullscreenButton: false,
          iframeStyle: {
            width: '100%',
            height: '100%',
            border: 'none',
          },
        })

        // Join the Tavus conversation
        await dailyCallRef.current.join({
          url: conversationUrl,
          userName: 'User',
        })

        // Hide local video and show only avatar
        await dailyCallRef.current.setLocalVideo(false)
        await dailyCallRef.current.setLocalAudio(true)

        // Listen for participants to show avatar
        dailyCallRef.current.on('participant-joined', (event: any) => {
          console.log('Participant joined:', event.participant)
          setIsConnected(true)
          setIsLoading(false)
        })

        dailyCallRef.current.on('participant-left', (event: any) => {
          console.log('Participant left:', event.participant)
        })

        // Update local participant settings to ensure video is off
        dailyCallRef.current.on('joined-meeting', async () => {
          console.log('Joined meeting successfully')
          await dailyCallRef.current.setLocalVideo(false)

          // Small delay to ensure avatar loads
          setTimeout(() => {
            setIsLoading(false)
            setIsConnected(true)
          }, 2000)
        })

      } catch (err) {
        console.error('Tavus initialization error:', err)
        setError(err instanceof Error ? err.message : 'Failed to initialize avatar')
        setIsLoading(false)
      }
    }

    initializeAvatar()

    // Cleanup on unmount
    return () => {
      if (dailyCallRef.current) {
        dailyCallRef.current.destroy().catch(console.error)
      }
    }
  }, [])

  if (error) {
    return (
      <div
        style={{
          padding: '20px',
          background: '#fee2e2',
          borderRadius: '12px',
          color: '#991b1b',
          fontSize: '14px',
        }}
      >
        <strong>Avatar Error:</strong> {error}
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#7f1d1d' }}>
          Make sure you have set your TAVUS_API_KEY in .env.local
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
          background: '#f1f5f9',
          borderRadius: '12px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #6366f1',
            borderRadius: '50%',
            margin: '0 auto 12px',
            animation: 'spin 1s linear infinite',
          }}
        />
        <div style={{ color: '#64748b', fontSize: '14px' }}>Connecting to Luna...</div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div
      style={{
        position: 'relative',
        background: '#000',
        borderRadius: '12px',
        overflow: 'hidden',
        aspectRatio: '16/9',
      }}
    >
      {/* Daily.co will inject video here */}
      <div
        ref={videoContainerRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />

      {isConnected && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              background: '#10b981',
              borderRadius: '50%',
            }}
          />
          Live
        </div>
      )}
    </div>
  )
}
