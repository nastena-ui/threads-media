import { useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useScroll, useMotionValueEvent } from 'motion/react'
import { CARDS, SIGNUP, img } from './content'
import { BG_SEAM_1, BG_SEAM_2, ramp, span } from './scroll'
import { useIntro } from './intro'
import Vpn from './Vpn'

/*
Phone version of the scene. Same idea as the desktop artboard (one pinned
screen, photographs cross-dissolving, words rising in) but laid out in
portrait at natural size, because a 1440px artboard scaled to a phone's
width would shrink the copy to nothing.
*/
const RED = '#b11226'
const SCROLL_VH = 560

/** Reveals behind a clip mask, rising. */
function Mask({ t, children, style }: { t: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ ...style, overflow: 'hidden' }}>
      <div style={{ transform: `translateY(${(1 - t) * 115}%)`, willChange: 'transform' }}>{children}</div>
    </div>
  )
}

/** a stage is visible between its in-window and its out-window */
const stage = (p: number, a: readonly [number, number], b?: readonly [number, number]) =>
  span(p, a) * (b ? 1 - span(p, b) : 1)

export default function Mobile() {
  const wrap = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setP(v))
  const pa = Math.max(p, useIntro(0.1))

  const mix1 = ramp(p, BG_SEAM_1)
  const mix2 = ramp(p, BG_SEAM_2)
  const drift = 1 + p * 0.08
  const layer = (opacity: number, pos: string): CSSProperties => ({
    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos,
    opacity, transform: `scale(${drift})`,
  })

  const sA = stage(1, [0, 0.001], [0.3, 0.4])
  const outA = 1 - span(p, [0.3, 0.4])
  const sB = stage(p, [0.42, 0.5], [0.72, 0.8])
  const sC = stage(p, [0.84, 0.92])
  const slot = (o: number, rise: number): CSSProperties => ({
    position: 'absolute', inset: '84px 20px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    opacity: o, transform: `translateY(${(1 - o) * rise}px)`, pointerEvents: o > 0.5 ? 'auto' : 'none',
  })

  return (
    <div ref={wrap} id="o-shatre" style={{ height: `${SCROLL_VH}vh`, background: '#111111' }}>
      <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden' }}>
        <img src={img('hero')} alt="Женщины в красном обнимаются в кругу" style={layer(1, '42% 40%')} />
        <img src={img('krug')} alt="" aria-hidden="true" style={layer(mix1, '50% 50%')} />
        <img src={img('svecha')} alt="" aria-hidden="true" style={layer(mix2, '50% 60%')} />
        {/* scrims keyed to the stage on screen */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(10,6,6,0.94) 0%, rgba(10,6,6,0.62) 48%, rgba(10,6,6,0.1) 100%)', opacity: outA }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,6,6,0.8)', opacity: Math.max(0, 1 - outA) }} />

        <Vpn compact />

        <header style={{ position: 'absolute', inset: '0 0 auto 0', zIndex: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '44px 20px 16px', background: 'linear-gradient(180deg, rgba(8,8,8,0.8), rgba(8,8,8,0))' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="22" height="22" viewBox="0 0 28 28" aria-hidden="true"><path d="M14 3 25 25H3z" fill={RED} /></svg>
            <span className="display" style={{ fontSize: 20 }}>Красный Шатёр</span>
          </span>
          <a href={SIGNUP} target="_blank" rel="noopener" className="label" style={{ textDecoration: 'none' }}>Записаться</a>
        </header>

        {/* stage A: hero */}
        <div style={{ ...slot(sA * outA, 24), opacity: outA, transform: `translateY(${-(1 - outA) * 40}px)`, pointerEvents: outA > 0.5 ? 'auto' : 'none' }}>
          <Mask t={span(pa, [0, 0.03])}>
            <p className="label" style={{ margin: 0, color: 'rgba(255,255,255,0.78)' }}>14 ноября · Видное · 12:00-17:00</p>
          </Mask>
          <Mask t={span(pa, [0.01, 0.045])} style={{ marginTop: 12 }}>
            <h1 className="display" style={{ margin: 0, fontSize: 'clamp(54px, 17vw, 80px)', lineHeight: 0.95 }}>Красный Шатёр</h1>
          </Mask>
          <Mask t={span(pa, [0.025, 0.06])}>
            <div className="display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(38px, 11.5vw, 56px)', lineHeight: 1.1 }}>в Видном</div>
          </Mask>
          <Mask t={span(pa, [0.045, 0.08])} style={{ marginTop: 16 }}>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: 'rgba(255,255,255,0.88)', maxWidth: 420 }}>
              Пять часов, чтобы выдохнуть, рассказать свою историю и быть услышанной. Без оценок и попыток тебя чинить.
            </p>
          </Mask>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 22, opacity: span(pa, [0.07, 0.1]) }}>
            <a className="btn btn-white" href={SIGNUP} target="_blank" rel="noopener">Хочу в круг · 3 500 ₽</a>
            <a className="btn btn-ghost" href="#program">Как пройдёт день</a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginTop: 22, opacity: span(pa, [0.08, 0.1]) }}>
            <span className="label" style={{ color: 'rgba(255,255,255,0.78)' }}>Осталось 5 мест</span>
          </div>
        </div>

        {/* stage B: practices */}
        <div style={{ ...slot(sB, 36), justifyContent: 'center' }}>
          <h2 className="display" style={{ margin: 0, fontSize: 'clamp(40px, 12vw, 60px)', lineHeight: 1 }}>Здесь можно выдохнуть</h2>
          <p style={{ margin: '14px 0 22px', fontSize: 16, lineHeight: 1.55, color: 'rgba(255,255,255,0.86)' }}>
            Окуривание, йони-стим, круг историй, творческий мастер-класс и песенный круг с бубнами. Всё по желанию, в своём темпе.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {CARDS.map((c, i) => {
              const t = span(p, [0.45 + i * 0.03, 0.55 + i * 0.03])
              return (
                <div key={c.art} style={{ position: 'relative', aspectRatio: '5 / 4', borderRadius: 26, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.26)', opacity: t, transform: `translateY(${(1 - t) * 24}px)` }}>
                  <img src={img(c.art)} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: c.pos }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(150deg, rgba(10,6,6,0.82) 0%, rgba(10,6,6,0.3) 60%, rgba(10,6,6,0.05) 100%)' }} />
                  <div className="display" style={{ position: 'absolute', left: 14, top: 14, fontSize: 21, lineHeight: 1.05 }}>
                    {c.label[0]}
                    <br />
                    {c.label[1]}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* stage C: no fixing */}
        <div style={slot(sC, 36)}>
          <div style={{ width: 56, height: 3, background: RED, marginBottom: 20 }} />
          <h2 className="display" style={{ margin: 0, fontSize: 'clamp(38px, 11vw, 54px)', lineHeight: 1.05 }}>
            Мы не будем тебя чинить. Мы будем тебя слышать.
          </h2>
          <p style={{ margin: '18px 0 0', fontSize: 17, lineHeight: 1.65, color: 'rgba(255,255,255,0.86)' }}>
            В шатре не будет оценок, суждений, советов и спасательств. Каждая проживает свой уникальный путь и знает, как нужно именно ей.
          </p>
          <div style={{ marginTop: 22 }}>
            <a className="btn btn-solid" href="#zapis">Как записаться</a>
          </div>
        </div>
      </div>
    </div>
  )
}
