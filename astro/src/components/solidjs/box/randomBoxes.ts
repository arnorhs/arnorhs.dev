import { mulberry32 } from '../../../lib'
import { Box, Color } from './types'

const colors: Color[] = [
  Color.YELLOW,
  Color.GREEN,
  Color.BLUE,
  Color.PURPLE,
  Color.PINK,
  Color.YELLOW_LIGHT,
]

export const randomBoxes = (seed, length): Box[] => {
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
