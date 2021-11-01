import { getScrollTop, debounce } from '../../lib'
import { For, createSignal, Component, JSX } from 'solid-js'
import { bindDocumentEventListener } from './solid-hooks'
import { Box, randomBoxes } from './box'

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
        'z-index': -1,
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
