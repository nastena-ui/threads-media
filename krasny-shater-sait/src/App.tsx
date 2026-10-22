import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useScroll, useMotionValueEvent } from 'motion/react'
import { SCROLL_VH, P, G, BG_SEAM_1, BG_SEAM_2, span, ramp, lerp } from './scroll'
import { CARDS, NAV, SIGNUP, img } from './content'
import { useIntro } from './intro'
import { Faq, Gallery, Host, Program, Signup } from './Sections'
import Footer from './Footer'
import Mobile from './Mobile'

/*
Красный Шатёр: a scroll-driven hero over photographs from past circles.

The scene is drawn on a fixed artboard of STAGE_W x STAGE_H design pixels,
absolutely positioned, then scaled to the width of the window. It is
full-bleed at every width: the scale comes from width alone. The nav sits
outside the artboard at natural size so it stays readable.

Phones get a stacked layout instead (see Mobile.tsx): a 1440px composition
scaled to 390px would be unreadable.
*/
const STAGE_W = 1440
const STAGE_H = 810

/* Every group sits behind SAFE_L so a cropped margin never cuts copy. */
const SAFE_L = 96
const GROUP_W = STAGE_W - SAFE_L * 2

const RED = '#b11226'
const px = (n: number) => `${n}px`

const box = (x: number, y: number, w?: number, h?: number): CSSProperties => ({
  position: 'absolute',
  left: px(x),
  top: px(y),
  ...(w != null ? { width: px(w) } : null),
  ...(h != null ? { height: px(h) } : null),
})

/* the four practice tiles, at the corners of Group 54's box */
const CARD_POS = [
  { x: 0, y: 0 },
  { x: GROUP_W - 255, y: 0 },
  { x: 116, y: 240 },
  { x: GROUP_W - 371, y: 240 },
]

/** Reveals behind a clip mask, rising. */
function Mask({ t, children, style }: { t: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ ...style, overflow: 'hidden' }}>
      <div style={{ height: '100%', transform: `translateY(${(1 - t) * 115}%)`, willChange: 'transform' }}>
        {children}
      </div>
    </div>
  )
}

function useNarrow(maxWidth: number) {
  const [narrow, setNarrow] = useState(() => window.innerWidth <= maxWidth)
  useLayoutEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`)
    const on = () => setNarrow(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [maxWidth])
  return narrow
}

function Scene() {
  const wrap = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [p, setP] = useState(0)

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setP(v))

  useLayoutEffect(() => {
    const fit = () => setScale(window.innerWidth / STAGE_W)
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  /* group positions, interpolated across the four frames */
  const m1 = ramp(p, P.move1)
  const m2 = ramp(p, P.move2)
  const y53 = lerp(G.g53.start, G.g53.end, m1)
  const y54 = lerp(lerp(G.g54.enter, G.g54.mid, m1), G.g54.end, m2)
  const y55 = lerp(lerp(G.g55.enter, G.g55.mid, m1), G.g55.end, m2)

  /* the seams: cross-dissolve the three photographs */
  const mix1 = ramp(p, BG_SEAM_1)
  const mix2 = ramp(p, BG_SEAM_2)
  const drift = 1 + p * 0.07
  const layer = (opacity: number, pos: string): CSSProperties => ({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: pos,
    opacity,
    transform: `scale(${drift})`,
  })

  /* timed intro so the hero words are in on load, before any scrolling */
  const pa = Math.max(p, useIntro(0.12))
  const num = (n: number) => Math.round(n * span(pa, P.stat))

  return (
    <div ref={wrap} id="o-shatre" style={{ height: `${SCROLL_VH}vh`, background: '#111111' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          /* the artboard is width-locked, so the viewport it pins inside is
             exactly as tall as the artboard ends up, never less than 100vh */
          height: `max(calc(100vw * ${STAGE_H} / ${STAGE_W}), 100vh)`,
          overflow: 'hidden',
        }}
      >
        <img src={img('hero')} alt="Женщины в красном обнимаются в кругу" style={layer(1, '50% 40%')} />
        <img src={img('krug')} alt="" aria-hidden="true" style={layer(mix1, '50% 50%')} />
        <img src={img('svecha')} alt="" aria-hidden="true" style={layer(mix2, '50% 62%')} />

        {/* ---- viewport-level chrome ---- */}
        <div
          style={{
            position: 'absolute',
            inset: '0 0 auto 0',
            height: 132,
            display: 'flex',
            alignItems: 'flex-start',
            paddingTop: 32,
            paddingLeft: 40,
            paddingRight: 40,
            gap: 40,
            background: 'linear-gradient(180deg, rgba(8,8,8,0.78) 0%, rgba(8,8,8,0.42) 46%, rgba(8,8,8,0) 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            maskImage: 'linear-gradient(180deg, #000 0%, #000 42%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, #000 0%, #000 42%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        >
          <a href="#o-shatre" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', pointerEvents: 'auto' }}>
            <svg width="26" height="26" viewBox="0 0 28 28" aria-hidden="true">
              <path d="M14 3 25 25H3z" fill={RED} />
            </svg>
            <span className="display" style={{ fontSize: 24 }}>Красный Шатёр</span>
          </a>
          <div className="nav-links" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 48 }}>
            {NAV.map((n) => (
              <a key={n.t} href={n.href} className="label" style={{ color: 'rgba(255,255,255,0.8)', whiteSpace: 'nowrap', textDecoration: 'none', pointerEvents: 'auto' }}>
                {n.t}
              </a>
            ))}
          </div>
          <a href={SIGNUP} target="_blank" rel="noopener" className="label" style={{ color: '#fff', textDecoration: 'none', pointerEvents: 'auto', marginLeft: 'auto' }}>
            Записаться
          </a>
        </div>

        {/* section scrims, also viewport-wide */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
            background: 'linear-gradient(90deg, rgba(10,6,6,0.9) 0%, rgba(10,6,6,0.58) 36%, rgba(10,6,6,0.05) 66%)',
            opacity: 1 - ramp(p, P.move1),
          }}
        />
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
            background: 'radial-gradient(66% 58% at 50% 78%, rgba(10,6,6,0.88) 0%, rgba(10,6,6,0.4) 58%, rgba(10,6,6,0) 100%)',
            opacity: ramp(p, P.move1) * (1 - ramp(p, P.move2)),
          }}
        />
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
            background: 'linear-gradient(180deg, rgba(10,6,6,0.1) 0%, rgba(10,6,6,0.8) 60%, rgba(10,6,6,0.9) 100%)',
            opacity: ramp(p, P.move2),
          }}
        />

        {/* ---- the fixed artboard ---- */}
        <div
          style={{
            position: 'absolute', left: 0, top: 0, width: px(STAGE_W), height: px(STAGE_H),
            transform: `scale(${scale})`, transformOrigin: 'top left', zIndex: 2,
          }}
        >
          {/* index rail */}
          <div style={box(STAGE_W - 40 - 53, 451, 53, 272)} aria-hidden="true">
            {['01', '02', '03', '04', '05'].map((n, i) => (
              <div
                key={n}
                className="label"
                style={{
                  position: 'absolute', top: px(i * 64), right: 0, fontSize: px(16),
                  color: i === Math.min(4, Math.floor(p * 5)) ? '#fff' : 'rgba(255,255,255,0.4)',
                  borderRight: i === Math.min(4, Math.floor(p * 5)) ? `3px solid ${RED}` : '3px solid transparent',
                  paddingRight: 10,
                }}
              >
                {n}
              </div>
            ))}
          </div>

          {/* ================= GROUP 53: the hero ================= */}
          <div style={{ ...box(SAFE_L, 0, GROUP_W, 642), transform: `translateY(${y53}px)`, willChange: 'transform' }}>
            {['Красный', 'Шатёр', 'в Видном'].map((w, i) => (
              <Mask
                key={w}
                t={span(pa, [P.word, P.word2, P.word3][i])}
                style={{ position: 'absolute', left: 0, top: px(i === 0 ? -8 : i === 1 ? 54 : 116), width: px(640), height: px(94) }}
              >
                <div className="display" style={{ fontSize: px(i === 2 ? 56 : 80), lineHeight: px(86), fontStyle: i === 2 ? 'italic' : undefined, fontWeight: i === 2 ? 500 : 600, paddingTop: i === 2 ? 8 : 0 }}>
                  {w}
                </div>
              </Mask>
            ))}
            {[
              'Пять часов, чтобы выдохнуть, рассказать свою',
              'историю и быть услышанной. Суббота, 14 ноября,',
              'с 12:00 до 17:00. Без оценок и попыток тебя чинить.',
            ].map((line, i) => (
              <Mask
                key={line}
                t={span(pa, [P.body1, P.body2, P.body3][i])}
                style={{ position: 'absolute', left: 0, top: px(264 + i * 26), width: px(520), height: px(32) }}
              >
                <div style={{ fontSize: px(17), lineHeight: px(24), color: 'rgba(255,255,255,0.86)' }}>{line}</div>
              </Mask>
            ))}

            <div style={{ position: 'absolute', left: 0, top: px(400), opacity: span(pa, P.body3), display: 'flex', gap: px(14) }}>
              <a className="label btn btn-white" href={SIGNUP} target="_blank" rel="noopener" style={{ height: px(48), padding: `0 ${px(28)}`, fontSize: 12 }}>
                Хочу в круг
              </a>
              <a className="label btn btn-ghost" href="#program" style={{ height: px(48), padding: `0 ${px(26)}`, fontSize: 12 }}>
                Как пройдёт день
              </a>
            </div>

            {/* the event card */}
            <div
              className="glass"
              style={{
                position: 'absolute', left: px(GROUP_W - 459), top: px(300), width: px(459), height: px(289),
                borderRadius: px(60), opacity: span(pa, P.stat), transform: `translateY(${(1 - span(pa, P.stat)) * 28}px)`,
              }}
            >
              <div style={{ position: 'absolute', inset: `${px(36)} ${px(40)}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: px(17), lineHeight: px(23), color: 'rgba(255,255,255,0.88)' }}>
                    Ближайший
                    <br />
                    шатёр
                  </div>
                  <div className="display" style={{ fontSize: px(72), lineHeight: px(58), fontWeight: 500 }}>
                    {num(14)}
                    <span style={{ fontSize: px(26), fontStyle: 'italic' }}> ноября</span>
                  </div>
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: px(92), height: px(3), borderRadius: 999, background: 'rgba(255,255,255,0.16)', overflow: 'hidden' }}>
                  <div style={{ width: `${100 * span(pa, P.stat)}%`, height: '100%', borderRadius: 999, background: RED, boxShadow: `0 0 14px ${RED}` }} />
                </div>
                <div className="label" style={{ position: 'absolute', left: 0, top: px(108), fontSize: px(10), color: 'rgba(255,255,255,0.6)' }}>
                  Видное, деревня Сапроново
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: px(140), height: 1, background: 'rgba(255,255,255,0.14)' }} />
                <div style={{ position: 'absolute', left: 0, right: 0, top: px(164), display: 'flex' }}>
                  {[
                    ['часов вместе', 5],
                    ['практик', 5],
                    ['мест осталось', 5],
                  ].map(([k, v], i) => (
                    <div key={k as string} style={{ flex: 1, paddingLeft: i ? px(20) : 0, borderLeft: i ? '1px solid rgba(255,255,255,0.14)' : undefined }}>
                      <div className="display" style={{ fontSize: px(34), fontWeight: 500 }}>
                        {num(v as number)}
                      </div>
                      <div className="label" style={{ marginTop: px(5), fontSize: px(9.5), color: 'rgba(255,255,255,0.6)' }}>
                        {k}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= GROUP 54: practices ================= */}
          <div style={{ ...box(SAFE_L, 0, GROUP_W, 640), transform: `translateY(${y54}px)`, willChange: 'transform' }}>
            {CARDS.map((c, i) => {
              const t = span(p, [P.g54In[0] + i * 0.004, P.g54In[1]])
              return (
                <div key={c.art} style={{ position: 'absolute', left: px(CARD_POS[i].x), top: px(CARD_POS[i].y), width: px(255), height: px(215), opacity: t }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: px(46), overflow: 'hidden' }}>
                    <img src={img(c.art)} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: c.pos }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(150deg, rgba(10,6,6,0.82) 0%, rgba(10,6,6,0.32) 52%, rgba(10,6,6,0.05) 100%)' }} />
                  </div>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: px(46), border: '1px solid rgba(255,255,255,0.28)', pointerEvents: 'none' }} />
                  <div className="display" style={{ position: 'absolute', left: px(24), top: px(30), fontSize: px(26), lineHeight: px(28) }}>
                    {c.label[0]}
                    <br />
                    {c.label[1]}
                  </div>
                  <div className="label" style={{ position: 'absolute', left: px(24), bottom: px(24), fontSize: px(10), color: 'rgba(255,255,255,0.7)' }}>
                    0{i + 1}
                  </div>
                </div>
              )
            })}
            <div className="display" style={{ position: 'absolute', left: 0, width: px(GROUP_W), textAlign: 'center', top: px(470), fontSize: px(80) }}>
              Здесь можно выдохнуть
            </div>
            <div style={{ position: 'absolute', left: px((GROUP_W - 700) / 2), top: px(566), width: px(700), fontSize: px(21), lineHeight: px(32), textAlign: 'center', color: 'rgba(255,255,255,0.88)' }}>
              Окуривание, йони-стим, круг историй, творческий мастер-класс и песенный круг с бубнами. Всё по желанию, в своём темпе.
            </div>
          </div>

          {/* ================= GROUP 55: not broken ================= */}
          <div style={{ ...box(SAFE_L, 0, GROUP_W, 810), transform: `translateY(${y55}px)`, willChange: 'transform' }}>
            <div className="display" style={{ position: 'absolute', left: 0, top: px(430), width: px(800), fontSize: px(56), lineHeight: px(60) }}>
              Мы не будем тебя чинить.
              <br />
              Мы будем тебя слышать.
            </div>
            <div style={{ position: 'absolute', left: 0, top: px(404), width: px(56), height: px(3), background: RED }} />
            <div style={{ position: 'absolute', left: px(GROUP_W - 400), top: px(434), width: px(400), fontSize: px(16), lineHeight: px(27), color: 'rgba(255,255,255,0.84)' }}>
              В шатре не будет оценок, суждений, советов и спасательств. Каждая проживает свой уникальный путь и знает, как нужно именно ей. 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const narrow = useNarrow(820)
  return (
    <>
      {narrow ? <Mobile /> : <Scene />}
      <Program />
      <Gallery />
      <Host />
      <Faq />
      <Signup />
      <Footer />
    </>
  )
}
