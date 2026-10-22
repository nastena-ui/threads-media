import { CARDS, SIGNUP, img } from './content'

/*
Phone layout for the scene: same photographs, same words, stacked. A fixed
1440px artboard scaled to a phone's width would shrink the copy to nothing.
*/
const RED = '#b11226'

function Bg({ src, pos, shade }: { src: string; pos: string; shade: string }) {
  return (
    <>
      <img src={img(src)} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos }} />
      <div style={{ position: 'absolute', inset: 0, background: shade }} />
    </>
  )
}

export default function Mobile() {
  return (
    <div id="o-shatre">
      <header style={{ position: 'fixed', inset: '0 0 auto 0', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'linear-gradient(180deg, rgba(8,8,8,0.8), rgba(8,8,8,0))' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="22" height="22" viewBox="0 0 28 28" aria-hidden="true"><path d="M14 3 25 25H3z" fill={RED} /></svg>
          <span className="display" style={{ fontSize: 20 }}>Красный Шатёр</span>
        </span>
        <a href={SIGNUP} target="_blank" rel="noopener" className="label" style={{ textDecoration: 'none' }}>Записаться</a>
      </header>

      <section style={{ position: 'relative', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '96px 20px 48px', overflow: 'hidden' }}>
        <Bg src="hero" pos="42% 40%" shade="linear-gradient(0deg, rgba(10,6,6,0.94) 0%, rgba(10,6,6,0.6) 46%, rgba(10,6,6,0.1) 100%)" />
        <div style={{ position: 'relative' }}>
          <p className="label" style={{ margin: 0, color: 'rgba(255,255,255,0.75)' }}>14 ноября · Видное · 12:00-17:00</p>
          <h1 className="display" style={{ margin: '14px 0 0', fontSize: 'clamp(56px, 17vw, 84px)', lineHeight: 0.92 }}>
            Красный Шатёр
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 500, fontSize: '0.72em' }}>в Видном</span>
          </h1>
          <p style={{ margin: '18px 0 0', fontSize: 17, lineHeight: 1.55, color: 'rgba(255,255,255,0.88)', maxWidth: 420 }}>
            Пять часов, чтобы выдохнуть, рассказать свою историю и быть услышанной. Без оценок и попыток тебя чинить.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
            <a className="btn btn-white" href={SIGNUP} target="_blank" rel="noopener">Хочу в круг · 3 500 ₽</a>
            <a className="btn btn-ghost" href="#program">Как пройдёт день</a>
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', padding: '72px 20px', overflow: 'hidden' }}>
        <Bg src="krug" pos="50% 50%" shade="rgba(10,6,6,0.82)" />
        <div style={{ position: 'relative' }}>
          <h2 className="display" style={{ margin: 0, fontSize: 'clamp(44px, 13vw, 64px)', lineHeight: 1 }}>Здесь можно выдохнуть</h2>
          <p style={{ margin: '16px 0 28px', fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.86)' }}>
            Окуривание, йони-стим, круг историй, творческий мастер-класс и песенный круг с бубнами. Всё по желанию, в своём темпе.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {CARDS.map((c) => (
              <div key={c.art} style={{ position: 'relative', aspectRatio: '1 / 1', borderRadius: 28, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.26)' }}>
                <img src={img(c.art)} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: c.pos }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(150deg, rgba(10,6,6,0.82) 0%, rgba(10,6,6,0.3) 60%, rgba(10,6,6,0.05) 100%)' }} />
                <div className="display" style={{ position: 'absolute', left: 16, top: 16, fontSize: 22, lineHeight: 1.05 }}>
                  {c.label[0]}
                  <br />
                  {c.label[1]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', padding: '88px 20px', overflow: 'hidden' }}>
        <Bg src="svecha" pos="50% 60%" shade="rgba(10,6,6,0.8)" />
        <div style={{ position: 'relative' }}>
          <div style={{ width: 56, height: 3, background: RED, marginBottom: 20 }} />
          <h2 className="display" style={{ margin: 0, fontSize: 'clamp(40px, 12vw, 58px)', lineHeight: 1.02 }}>
            Ты не сломалась. Ты слишком долго держалась одна.
          </h2>
          <p style={{ margin: '20px 0 0', fontSize: 17, lineHeight: 1.65, color: 'rgba(255,255,255,0.86)' }}>
            В шатре не будет оценок, суждений, советов и спасательств. Каждая проживает свой уникальный путь и знает, как нужно именно ей. Мы не будем тебя чинить. Мы будем тебя слышать.
          </p>
        </div>
      </section>
    </div>
  )
}
