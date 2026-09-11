import React from 'react'

export default function PlayerAvatar({ name = 'Player', size = 36, showIndicator = false, status = 'online' }) {
  const initials = name
    ? name
        .replace(/[^a-zA-Z0-9]/g, '')
        .slice(0, 2)
        .toUpperCase()
    : 'P'

  const indicatorColor = status === 'online' ? '#22c55e' : status === 'match' ? '#F4C400' : '#9ca3af'

  return (
    <div
      className="player-avatar"
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #181c24 0%, #0a0c10 100%)',
        border: '1.5px solid rgba(244, 196, 0, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontWeight: 700,
        fontSize: size * 0.38,
        letterSpacing: '0.04em',
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      {initials}
      {showIndicator && (
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: Math.max(8, size * 0.26),
            height: Math.max(8, size * 0.26),
            borderRadius: '50%',
            background: indicatorColor,
            border: '2px solid #FFFFFF',
          }}
          title={`Status: ${status}`}
        />
      )}
    </div>
  )
}
