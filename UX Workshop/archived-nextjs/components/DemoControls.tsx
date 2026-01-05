'use client'

interface DemoControlsProps {
  position: string
  setPosition: (position: string) => void
  isAvatarEnabled: boolean
  setIsAvatarEnabled: (enabled: boolean) => void
}

export default function DemoControls({
  position,
  setPosition,
  isAvatarEnabled,
  setIsAvatarEnabled,
}: DemoControlsProps) {
  const positions = [
    { id: 'chat-button', name: 'Chat Button' },
    { id: 'center-low-rectangle', name: 'Center Low Rectangle' },
    { id: 'center-midsize-square', name: 'Center Midsize' },
    { id: 'skyscraper', name: 'Skyscraper' },
    { id: 'full-height-center', name: 'Full Height Center' },
    { id: 'content-viewer', name: 'Content Viewer' },
  ]

  return (
    <div className="demo-controls">
      <h4>Demo Controls</h4>

      <div className="demo-section">
        <div className="demo-section-title">Agent Positions</div>
        {positions.map((pos) => (
          <button
            key={pos.id}
            className={`demo-btn ${position === pos.id ? 'active' : ''}`}
            onClick={() => setPosition(pos.id)}
          >
            {pos.name}
          </button>
        ))}
      </div>

      <div className="demo-section">
        <div className="demo-section-title">LiveAvatar</div>
        <button
          className={`demo-btn ${isAvatarEnabled ? 'active' : ''}`}
          onClick={() => setIsAvatarEnabled(!isAvatarEnabled)}
        >
          {isAvatarEnabled ? '✓ Avatar Enabled' : 'Enable Avatar'}
        </button>
      </div>
    </div>
  )
}
