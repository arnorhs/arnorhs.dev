import { ifWindow } from '$lib/index'
import { createSignal, createEffect } from 'solid-js'
import { bindDocumentEventListener } from './solid-hooks'

const rotationSize = 8192

const makeGradient = (posY: number) => {
  const turn = ((posY % rotationSize) / rotationSize).toFixed(2)
  return `
    conic-gradient(
      from ${turn}turn at 39% ${posY * 0.8}px,
      #ffaacc 45deg,
      #ddffcc 45deg 90deg,
      #eeee88 90deg 135deg,
      #448844 135deg 180deg,
      blue 180deg 225deg,
      purple 225deg
    )
  `
}

const setGradient = (div, gradient) => {
  div.style.background = gradient
}

const getWindowHeight = () =>
  ifWindow(
    () => `${window.document.body.clientHeight}px`,
    () => '100%',
  )

const getGradientPos = () =>
  ifWindow(
    () => window.document.children[0].scrollTop + window.innerHeight * 0.7,
    () => 0,
  )

export const FancyPanel = () => {
  let ref
  const [scrollY, setScrollY] = createSignal(getGradientPos())
  createEffect(() => {
    setGradient(ref, makeGradient(scrollY()))
  })

  bindDocumentEventListener('scroll', (e) => {
    setScrollY(getGradientPos())
  })

  const style = {
    position: 'absolute',
    left: '0px',
    top: '0px',
    opacity: 0.06,
    'min-height': '100vh',
    width: '100%',
    height: getWindowHeight(),
    'z-index': '-1',
    'transition-property': 'all',
    'transition-timing-function': 'ease-in-out',
    'transition-duration': '4s',
    'transition-delay': '2s',
  }

  return <div ref={ref} style={style}></div>
}
