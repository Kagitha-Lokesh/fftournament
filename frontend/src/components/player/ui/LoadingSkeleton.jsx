import React from 'react'

export function SkeletonLine({ width = '100%', height = '16px', borderRadius = '4px', style = {} }) {
  return (
    <div
      className="skeleton-pulse"
      style={{
        width,
        height,
        borderRadius,
        background: '#EAECEF',
        ...style,
      }}
    />
  )
}

export function SkeletonCard({ height = '160px', style = {} }) {
  return (
    <div
      className="skeleton-card"
      style={{
        height,
        background: '#FFFFFF',
        border: '1px solid #E4E7EB',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        ...style,
      }}
    >
      <SkeletonLine width="40%" height="18px" />
      <SkeletonLine width="75%" height="14px" />
      <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
        <SkeletonLine width="30%" height="32px" borderRadius="6px" />
        <SkeletonLine width="30%" height="32px" borderRadius="6px" />
      </div>
    </div>
  )
}

export default function LoadingSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* Header skeleton */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
        <SkeletonLine width="260px" height="28px" />
        <SkeletonLine width="340px" height="16px" />
      </div>

      {/* Hero card skeleton */}
      <SkeletonCard height="190px" />

      {/* Grid skeleton */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        <SkeletonCard height="220px" />
        <SkeletonCard height="220px" />
      </div>
    </div>
  )
}
