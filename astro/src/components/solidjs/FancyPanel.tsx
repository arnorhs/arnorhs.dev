import { getScrollTop, mulberry32, debounce } from '../../lib'
import { For, createSignal, createEffect, Component, JSX, ComponentProps } from 'solid-js'
import { bindDocumentEventListener } from './solid-hooks'

const colors = [
  // yellow
  'rgb(240, 240, 128)',
  // green
  'rgb(64, 128, 64)',
  // blue
  'rgba(20, 44, 255, 0.7)',
  // purple
  'rgb(128, 0, 128)',
  // pink
  'rgb(255,192,203)',
  // yellow
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
    size: random() * 120 + 60,
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
              class="absolute origin-center"
              style={{
                opacity: 0.08,
                background: box.color,
                top: `${box.y}%`,
                left: `${box.x}%`,
                width: `${box.size}vh`,
                height: `${box.size}vh`,
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
  return (
    <div
      class="left-0 top-0 w-100 fixed bottom-0 right-0 overflow-hidden"
      style={{
        'z-index': '-1',
      }}
    >
      <div
        class="relative w-100"
        style={{
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
