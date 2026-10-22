import { CHANNEL, INSTAGRAM, SIGNUP, THREADS } from './content'

/*
Footer: brand column beside two link columns, a legal bar, and the oversized
wordmark fading into the panel. It sits outside the pinned stage, so it is a
real responsive layout rather than absolute coordinates.
*/
const COLUMNS = [
  {
    head: 'Шатёр',
    links: [
      { t: 'Как пройдёт', href: '#program' },
      { t: 'Ведущая', href: '#host' },
      { t: 'Вопросы', href: '#faq' },
      { t: 'Записаться', href: SIGNUP },
    ],
  },
  {
    head: 'Где меня найти',
    links: [
      { t: 'Telegram-канал', href: CHANNEL },
      { t: 'Запись в шатёр', href: SIGNUP },
      { t: 'Instagram', href: INSTAGRAM },
      { t: 'Threads', href: THREADS },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0b0b0b', padding: '24px 24px 0', position: 'relative', zIndex: 1 }}>
      <div
        style={{
          maxWidth: 1312,
          margin: '0 auto',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 28,
          background: 'linear-gradient(180deg, rgba(43,26,22,0.9) 0%, rgba(17,17,17,0.9) 100%)',
          padding: '56px 56px 8px',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 360px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="26" height="26" viewBox="0 0 28 28" aria-hidden="true">
                <path d="M14 3 25 25H3z" fill="#b11226" />
              </svg>
              <span className="display" style={{ fontSize: 24 }}>Красный Шатёр</span>
            </div>
            <p style={{ margin: '14px 0 0', fontSize: 15, lineHeight: '24px', color: 'rgba(255,255,255,0.6)', maxWidth: 320 }}>
              Ты не сломалась. Ты слишком долго держалась одна. В шатре мы не чиним женщин, мы возвращаем им право быть живыми.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.head} style={{ flex: '0 1 220px' }}>
              <div className="label" style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>{col.head}</div>
              {col.links.map((l) => (
                <div key={l.t} style={{ fontSize: 15, lineHeight: '32px' }}>
                  <a href={l.href} style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>
                    {l.t}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap',
            fontSize: 13, color: 'rgba(255,255,255,0.45)',
            borderTop: '1px solid rgba(255,255,255,0.10)', marginTop: 40, padding: '20px 0 28px',
          }}
        >
          <span>© 2026 Анастасия Калинина</span>
          <span>Видное · Московская область</span>
        </div>
        <div
          className="display"
          aria-hidden="true"
          style={{
            fontSize: 'clamp(64px, 13vw, 190px)', lineHeight: 1, textAlign: 'center', letterSpacing: '-0.02em',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.03) 82%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', userSelect: 'none', marginBottom: 4,
          }}
        >
          Красный Шатёр
        </div>
      </div>
      <div style={{ height: 24 }} />
    </footer>
  )
}
