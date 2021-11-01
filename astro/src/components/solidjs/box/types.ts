export interface Box {
  color: string
  x: number
  y: number
  z: number
  rotation: number
  size: number
}

export enum Color {
  YELLOW = 'rgb(240, 240, 128)',
  GREEN = 'rgb(64, 128, 64)',
  BLUE = 'rgba(20, 44, 255, 0.7)',
  PURPLE = 'rgb(128, 0, 128)',
  PINK = 'rgb(255,192,203)',
  YELLOW_LIGHT = 'rgb(228, 255, 208)',
}
