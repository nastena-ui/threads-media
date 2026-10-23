import type { CSSProperties } from 'react'

/* A quiet note on the first screen: the site opens through a VPN. */
export default function Vpn({ style }: { style?: CSSProperties }) {
  return (
    <span
      className="label"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px 7px 11px', borderRadius: 999,
        border: '1px solid rgba(255,255,255,0.28)', background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        color: 'rgba(255,255,255,0.86)', fontSize: 10, whiteSpace: 'nowrap', ...style,
      }}
    >
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 1.5 13.5 3.5v4.2c0 3.1-2.3 5.6-5.5 6.8C4.8 13.3 2.5 10.8 2.5 7.7V3.5z" />
        <path d="m5.8 8 1.6 1.6L10.4 6.4" />
      </svg>
      Работает через VPN
    </span>
  )
}
