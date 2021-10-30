import { ifWindow } from '../../lib'
import { For, createSignal, createEffect, Component, JSX, ComponentProps } from 'solid-js'
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

const makeTransform = () => {
  let last = 0
  return (y, { triangleSizeDeg, rotationRatio }: Triangle) => {
    const rotationSize = ROTATION_SIZE * rotationRatio
    const rotation = (360 * y) / rotationSize + last
    last += triangleSizeDeg
    return `translate(39%, ${500 - y * 0.3}px) rotate(${rotation}deg)`
  }
}

const getScrollTop = () =>
  ifWindow(
    () => window.document.children[0].scrollTop,
    () => 0,
  )

export interface FancyPanelProps {
  animate?: boolean
}

export const FancyPanel: Component<FancyPanelProps> = (props: FancyPanelProps): JSX.Element => {
  const animate = !!props.animate

  const items: Triangle[] = triangles.map((item) => ({
    ...item,
    triangleSizeDeg: item.angleSize * 360,
    ref: undefined,
  }))

  const [scrollY, setScrollY] = createSignal(getScrollTop())
  createEffect(() => {
    if (!animate) {
      return
    }

    const transform = makeTransform()

    items.forEach((item) => {
      const y = scrollY()
      if (!item.ref) {
        return
      }

      item.ref.style.transform = transform(y, item)
      item.ref.style.opacity = Math.pow(Math.max(0, (5000 - y) / 5000), 2).toFixed(3)
    })
  })

  bindDocumentEventListener('scroll', () => {
    setScrollY(getScrollTop())
  })

  const initialAngle = 130

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

  const transform = makeTransform()

  return (
    <>
      <Wrapper>
        <For each={items}>
          {(item: Triangle) => (
            <div
              ref={(el) => (item.ref = el)}
              style={{
                ...style,
                background: makeGradient(
                  item.color,
                  initialAngle - item.triangleSizeDeg / 2,
                  initialAngle + item.triangleSizeDeg / 2,
                ),
                transform: transform(0, item),
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
      window.document.body.style.position = 'relative'
      ref.parentElement.style.height = '100%'
      // ref.style.opacity = '1'
    }, 0)
  })

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        'z-index': '-1',
        // opacity: 0,
        background: `
          linear-gradient(90deg, rgba(240,20,20,.07), rgba(240,20,20,0) 70.71%),
          linear-gradient(270deg, rgba(20,240,20,.05), rgba(20,240,20,0) 70.71%),
          linear-gradient(180deg, rgba(20,20,240,.07), rgba(20,20,240,0) 70.71%)
        `,
      }}
    >
      {props.children}
    </div>
  )
}
