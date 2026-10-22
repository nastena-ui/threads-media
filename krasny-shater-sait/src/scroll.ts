/*
Scroll choreography. The page is one scene: scrolling drives a timeline, not
a page. Phases are fractions of a 20,000ms timeline (kept from the original
motion prototype this layout was built on), so sections land at fixed
relative moments and the clock is the scrollbar.

Three photographs stand in for the two video clips: they cross-dissolve at
two seams (BG_SEAM_1, BG_SEAM_2) while the three content groups ride up as a
vertical filmstrip at different rates.
*/
export const TOTAL_MS = 20000
export const SCROLL_VH = 620

const at = (ms: number) => ms / TOTAL_MS

/** Phase windows as scroll progress. */
export const P = {
  /* the hero's words, 0-350ms plus a 300ms animation */
  word: [at(0), at(300)],
  word2: [at(75), at(375)],
  word3: [at(150), at(450)],
  body1: [at(200), at(500)],
  body2: [at(275), at(575)],
  body3: [at(350), at(650)],
  /* the event card */
  stat: [at(200), at(2284)],
  /* Group 54 arrives */
  g54In: [at(3000), at(3600)],
  /* the 6000ms transition */
  move1: [at(8000), at(14000)],
  /* compressed to land at 0.90 so the settled composition holds for a beat */
  move2: [at(15500), 0.9],
} as const

/** Where each group sits, per the four frames. */
export const G = {
  g53: { start: 186, end: -774 },
  g54: { enter: 1050, mid: 105, end: -1115 },
  g55: { enter: 1400, mid: 740, end: 144 },
} as const

/** Background photo hand-overs: [start, end] of each cross-dissolve. */
export const BG_SEAM_1 = [0.34, 0.5] as const
export const BG_SEAM_2 = [0.74, 0.86] as const

/** 0 before `a`, 1 after `b`, cubic-eased between. */
export function span(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  const t = (p - a) / (b - a)
  return 1 - Math.pow(1 - t, 3)
}

/** Linear ramp, for positions that should track the scrollbar exactly. */
export function ramp(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  return (p - a) / (b - a)
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
