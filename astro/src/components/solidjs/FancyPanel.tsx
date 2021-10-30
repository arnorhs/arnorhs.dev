import { ifWindow } from '../../lib'
import { For, createSignal, createEffect, Component, JSX } from 'solid-js'
import { bindDocumentEventListener } from './solid-hooks'
import { Triangle, ROTATION_SIZE, triangles } from './constants'

const makeGradient = (color: string, from: number, to: number) => {
  // console.log('making gradient', { from, to })
  return `
    conic-gradient(
      at 0 0,
      transparent ${from}deg,
      ${color} ${from}deg ${to}deg,
      transparent ${to}deg
    )
  `
}

const makeTransform = (y, index, { triangleSizeDeg, rotationRatio }: Triangle) => {
  const rotationSize = ROTATION_SIZE * rotationRatio
  const rotation = (360 * y) / rotationSize + index * triangleSizeDeg
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
  const items: Triangle[] = triangles.map((item) => ({
    ...item,
    triangleSizeDeg: item.angleSize * 360,
    ref: undefined,
  }))

  const [scrollY, setScrollY] = createSignal(getScrollTop())
  createEffect(() => {
    items.forEach((item, i) => {
      const y = scrollY()
      if (!item.ref) {
        return
      }

      item.ref.style.transform = makeTransform(y, i, item)
      item.ref.style.opacity = Math.pow(Math.max(0, (5000 - y) / 5000), 2).toFixed(3)
    })
  })

  bindDocumentEventListener('scroll', () => {
    setScrollY(getScrollTop())
  })

  // this angle is the angle of t/l, but the gradient angle's 0 is b/r
  const viewportAngle = getViewportAngle() + 102

  const style = {
    position: 'absolute',
    left: '-200px',
    top: '-200px',
    bottom: '-200px',
    right: '-200px',
    'transform-origin': '0 0',
    'transition-property': 'all',
    'transition-timing-function': 'ease-out',
    'transition-duration': '.05s',
  }

  return (
    <>
      <Wrapper>
        <For each={items}>
          {(item: Triangle, i) => (
            <div
              ref={(el) => (item.ref = el)}
              style={{
                ...style,
                background: makeGradient(
                  item.color,
                  viewportAngle - item.triangleSizeDeg / 2,
                  viewportAngle + item.triangleSizeDeg / 2,
                ),
                transform: makeTransform(0, i(), item),
              }}
            ></div>
          )}
        </For>
      </Wrapper>
    </>
  ) as JSX.Element
}

const Wrapper: Component = (props) => {
  let ref: HTMLElement

  createEffect(() => {
    setTimeout(() => {
      ref.style.opacity = '1'
    }, 0)
  })

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100vh',
        'z-index': '-1',
        opacity: 0,
        background: `
          linear-gradient(217deg, rgba(240,20,20,.07), rgba(240,20,20,0) 70.71%),
          linear-gradient(127deg, rgba(20,240,20,.05), rgba(20,240,20,0) 70.71%),
          linear-gradient(336deg, rgba(20,20,240,.07), rgba(20,20,240,0) 70.71%)
        `,
        'transition-property': 'all',
        'transition-timing-function': 'ease-in',
        'transition-duration': '.2s',
      }}
    >
      {props.children}
    </div>
  )
}
