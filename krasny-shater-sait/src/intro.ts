import { useEffect, useState } from 'react'

/*
The scene is scroll-driven, so at scroll 0 nothing has played yet. A short
timed intro (0 -> `to` of the timeline) plays the hero words in on load, so
the first screen is never empty. Scrolling takes over past that point.
*/
export function useIntro(to = 0.12, ms = 1800) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setV(to)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / ms)
      setV(to * (1 - Math.pow(1 - k, 2)))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, ms])
  return v
}
