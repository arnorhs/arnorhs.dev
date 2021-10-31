import { getScrollTop, mulberry32, debounce } from '../../lib'
import { For, createSignal, createEffect, Component, JSX, ComponentProps } from 'solid-js'
import { bindDocumentEventListener } from './solid-hooks'

const colors = [
  'rgb(240, 240, 128)',
  'rgb(64, 128, 64)',
  'rgba(20, 44, 255, 0.7)',
  'rgb(128, 0, 128)',
  'rgb(255, 160, 200)',
  'rgb(228, 255, 208)',
]

const randomBoxes = (seed, length): Box[] => {
  const random = mulberry32(seed)

  const randomQuad = () => {
    const x = random() * 2 - 1
    const p = Math.pow(x, 2)
    return x < 0 ? -p : p
  }

  return [...new Array(length)].map(() => ({
    color: colors[Math.floor(random() * colors.length)],
    x: randomQuad() * 300 + 50,
    y: randomQuad() * 500 + 50,
    z: random() * -2000,
    rotation: random() * 360,
    size: random() * 120 + 40,
  }))
}

export interface FancyPanelProps {
  animate?: boolean
  randomSeed?: number
}

export const FancyPanel: Component<FancyPanelProps> = (props: FancyPanelProps): JSX.Element => {
  const animate = !!props.animate

  const boxes = randomBoxes(props.randomSeed, 40)

  const [scrollY, setScrollY] = createSignal(getScrollTop())

  bindDocumentEventListener(
    'scroll',
    debounce(() => {
      setScrollY(getScrollTop())
    }, 0),
  )

  return (
    <>
      <Wrapper scrollY={scrollY()}>
        <For each={boxes}>
          {(box: Box) => (
            <div
              style={{
                background: box.color,
                position: 'absolute',
                top: `${box.y}%`,
                left: `${box.x}%`,
                opacity: 0.08,
                width: `${box.size}vh`,
                height: `${box.size}vh`,
                'transform-origin': '50% 50%',
                transform: `
                  translate3d(-50%, -50%, ${box.z}px)
                  translateY(${-scrollY()}px)
                  rotate(${box.rotation}deg)
                `,
              }}
            ></div>
          )}
        </For>
      </Wrapper>
    </>
  ) as JSX.Element
}

const Wrapper: Component<{ scrollY: number }> = (props) => {
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
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        'z-index': '-1',
        // opacity: 0,
        background: `
          linear-gradient(90deg, rgba(240,20,20,.06), rgba(240,20,20,0) 70.71%),
          linear-gradient(270deg, rgba(20,240,20,.04), rgba(20,240,20,0) 70.71%),
          linear-gradient(180deg, rgba(20,20,240,.06), rgba(20,20,240,0) 70.71%)
        `,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          perspective: '100px',
          'perspective-origin': `50% 50%`,
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
