import { CHANNEL, FAQ, GALLERY, PRACTICES, SIGNUP, img } from './content'

/*
Ordinary flow sections that follow the pinned scene. Unlike the scene these
are real responsive layout, so they read well on a phone.
*/

export function Program() {
  return (
    <section id="program" className="sec" style={{ background: '#111111' }}>
      <div className="inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px, 6vw, 88px)' }}>
        <div>
          <p className="eyebrow">Как пройдёт день</p>
          <h3 className="big">Пять часов, пять практик</h3>
          <p className="lead">
            Всё по желанию и в своём темпе. Мы будем напитываться ароматами, вкусами, красотой, прикосновениями и теплом.
          </p>
        </div>
        <div>
          {PRACTICES.map((p, i) => (
            <div className="practice" key={p.t}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h4>{p.t}</h4>
                <p>{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Gallery() {
  return (
    <section id="gallery" className="sec" style={{ background: '#2b1a16' }}>
      <div className="inner">
        <p className="eyebrow">Как это бывает</p>
        <h3 className="big">Кадры с наших прошлых встреч</h3>
        <div className="gal">
          {GALLERY.map((g) => (
            <figure key={g.n}>
              <img src={img(g.n)} alt={g.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Host() {
  return (
    <section id="host" className="sec" style={{ background: '#4b2354' }}>
      <div className="inner host">
        <div style={{ position: 'relative' }}>
          <img
            src={img('anastasia-1')}
            alt="Анастасия Калинина, ведущая Красного Шатра"
            loading="lazy"
            style={{ display: 'block', width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', objectPosition: '50% 30%', borderRadius: 28 }}
          />
          <img
            src={img('anastasia-2')}
            alt="Анастасия в неоновом свете с закрытыми глазами"
            loading="lazy"
            style={{ position: 'absolute', right: -14, bottom: -28, width: '38%', aspectRatio: '3 / 4', objectFit: 'cover', objectPosition: '50% 40%', borderRadius: 20, border: '4px solid #4b2354' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <p className="eyebrow">Ведущая</p>
          <blockquote className="display" style={{ margin: 0, fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(30px, 3.6vw, 52px)', lineHeight: 1.12 }}>
            «Я не хочу привести женщину к финальной версии себя. Мне интереснее пространство, в котором она может снова и снова слышать, какая она сейчас».
          </blockquote>
          <div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>Анастасия Калинина</div>
            <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.78)', lineHeight: 1.65, maxWidth: '52ch' }}>
              Ведущая Красного Шатра, мама четверых. Я тоже там была: в усталости, в стыде, в потере себя. Поэтому умею держать огонь, пока другая женщина вспоминает себя.
            </p>
          </div>
          <img
            src={img('semya')}
            alt="Анастасия с четырьмя детьми в красном платье"
            loading="lazy"
            style={{ display: 'block', width: 'min(100%, 340px)', aspectRatio: '4 / 5', objectFit: 'cover', objectPosition: '50% 70%', borderRadius: 24 }}
          />
        </div>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section id="faq" className="sec" style={{ background: '#111111' }}>
      <div className="inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px, 6vw, 88px)' }}>
        <div>
          <p className="eyebrow">Вопросы</p>
          <h3 className="big">Если немного тревожно</h3>
        </div>
        <div>
          {FAQ.map((f) => (
            <details className="q" key={f.q}>
              <summary>
                {f.q}
                <span className="plus" aria-hidden="true">+</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Signup() {
  const cells = [
    ['Когда', '14 ноября, суббота', '12:00-17:00'],
    ['Где', 'Видное, деревня Сапроново', 'точный адрес после оплаты'],
    ['Участие', '3 500 ₽', 'все практики и материалы'],
  ]
  return (
    <section id="zapis" className="sec" style={{ background: '#800020', position: 'relative', overflow: 'hidden' }}>
      <img
        src={img('vse')}
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22 }}
      />
      <div className="inner" style={{ position: 'relative' }}>
        <p className="eyebrow">Запись</p>
        <h3 className="big" style={{ maxWidth: '14ch' }}>Для тебя есть место в нашем круге</h3>
        <span className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.4)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
          Осталось 5 мест
        </span>
        <div className="glass" style={{ display: 'flex', flexWrap: 'wrap', borderRadius: 28, margin: '36px 0', maxWidth: 860 }}>
          {cells.map(([k, v, s], i) => (
            <div key={k} style={{ flex: '1 1 220px', padding: '24px 28px', borderLeft: i ? '1px solid rgba(255,255,255,0.18)' : undefined }}>
              <div style={{ fontSize: 14, opacity: 0.65 }}>{k}</div>
              <div style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>{v}</div>
              <div style={{ fontSize: 14, opacity: 0.7, marginTop: 2 }}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <a className="btn btn-white" href={SIGNUP} target="_blank" rel="noopener" style={{ minHeight: 56, padding: '0 36px' }}>
            Записаться в шатёр
          </a>
          <span style={{ opacity: 0.85 }}>
            Напиши слово «шатёр» в Telegram: <a href={SIGNUP} target="_blank" rel="noopener">@morawomb</a>
          </span>
        </div>
        <p style={{ margin: '28px 0 0', opacity: 0.8, maxWidth: '56ch', lineHeight: 1.6 }}>
          Если тебе нужен не совет, а место, где можно выдохнуть, приходи. Больше правды и выдоха в моём{' '}
          <a href={CHANNEL} target="_blank" rel="noopener">Telegram-канале</a>.
        </p>
      </div>
    </section>
  )
}
