import { ifWindow } from '../../lib'
import { For, createSignal, createEffect, Component, JSX } from 'solid-js'
import { bindDocumentEventListener } from './solid-hooks'
import { BaseTriangle, Triangle } from './types'

const triangles: BaseTriangle[] = [
  {
    rotationRatio: 1.23,
    color: '#ffaacc',
  },
  {
    rotationRatio: 0.77,
    color: '#ddffcc',
  },
  {
    rotationRatio: 2.05,
    color: '#eeee88',
  },
  {
    rotationRatio: 1.41,
    color: '#448844',
  },
  {
    rotationRatio: 0.911,
    color: 'blue',
  },
  {
    rotationRatio: 0.719,
    color: 'rgba(128, 0, 128, 0.25)',
  },
  {
    rotationRatio: 1.7222,
    color: 'rgba(128, 0, 128, 0.25)',
  },
]

const ROTATION_SIZE = 8192

const makeGradient = (color: string, from: number, to: number) => {
  return `
    conic-gradient(
      at 0 0,
      transparent ${from}deg,
      ${color} ${from}deg ${to}deg,
      transparent ${to}deg
    )
  `
}

const makeTransform = (y, index, { rotationRatio }: Triangle) => {
  const rotationSize = ROTATION_SIZE * rotationRatio
  const rotation = (360 * y) / rotationSize + index * rotationSize
  return `translate(39%, ${500 - y * 0.3}px) rotate(${rotation}deg)`
}

const getViewportAngle = () => {
  const [w, h] = ifWindow(
    () => [window.innerWidth, window.innerHeight],
    () => [6, 3],
  )

  // angle of a/b
  const radians = Math.atan(h / w)
  const degrees = (radians * 180) / Math.PI

  return degrees
}

const getScrollTop = () =>
  ifWindow(
    () => window.document.children[0].scrollTop,
    () => 0,
  )

export const FancyPanel: Component = (): JSX.Element => {
  const triangleSize = 360 / triangles.length
  const items: Triangle[] = triangles.map((item, i) => ({
    ...item,
    ref: undefined,
    size: triangleSize,
  }))

  const [scrollY, setScrollY] = createSignal(getScrollTop())
  createEffect(() => {
    items.forEach((item, i) => {
      const y = scrollY()
      if (!item.ref) {
        return
      }

      item.ref.style.transform = makeTransform(y, i, item)
      item.ref.style.opacity = Math.pow(Math.max(0, (2000 - y) / 2000), 2).toFixed(3)
    })
  })

  bindDocumentEventListener('scroll', (e) => {
    setScrollY(getScrollTop())
  })

  // this angle is the angle of t/l, but the gradient angle's 0 is b/r
  const viewportAngle = getViewportAngle() + 90

  const style = {
    position: 'absolute',
    left: '-200px',
    top: '-200px',
    bottom: '-200px',
    right: '-200px',
    opacity: 0,
    'transform-origin': '0 0',
    'transition-property': 'all',
    'transition-timing-function': 'ease-out',
    'transition-duration': '.05s',
  }

  const wrapperStyle = {
    position: 'fixed',
    left: '0px',
    top: '0px',
    width: '100%',
    height: '100vh',
    'z-index': '-1',
    background: 'rgba(128, 0, 128, 0.03)',
  }

  return (
    <>
      <div style={wrapperStyle}>
        <For each={items}>
          {(item: Triangle, i) => (
            <div
              ref={(el) => (item.ref = el)}
              style={{
                ...style,
                background: makeGradient(
                  item.color,
                  viewportAngle - triangleSize / 2,
                  viewportAngle + triangleSize / 2,
                ),
              }}
            ></div>
          )}
        </For>
      </div>
    </>
  )
}
