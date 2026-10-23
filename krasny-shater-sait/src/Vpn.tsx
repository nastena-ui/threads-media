/*
A slim strip at the very top of the first screen. It says the site, not the
event, needs a VPN, so nobody reads it as "the tent runs through a VPN".
*/
export default function Vpn({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="label"
      style={{
        position: 'absolute', inset: '0 0 auto 0', zIndex: 6, height: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        background: 'rgba(10,6,6,0.88)', borderBottom: '1px solid rgba(255,255,255,0.12)',
        color: 'rgba(255,255,255,0.82)', fontSize: 10, whiteSpace: 'nowrap', padding: '0 12px',
      }}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 1.5 13.5 3.5v4.2c0 3.1-2.3 5.6-5.5 6.8C4.8 13.3 2.5 10.8 2.5 7.7V3.5z" />
        <path d="m5.8 8 1.6 1.6L10.4 6.4" />
      </svg>
      {compact ? 'Сайт работает через VPN' : 'Сайт работает через VPN · Сам шатёр проходит очно, в Видном'}
    </div>
  )
}
