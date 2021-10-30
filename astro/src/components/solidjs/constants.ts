export interface BaseTriangle {
  color: string
  rotationRatio: number
  angleSize: number
}

export interface Triangle extends BaseTriangle {
  ref?: HTMLElement
  triangleSizeDeg: number
}

export const triangles: BaseTriangle[] = [
  {
    rotationRatio: 2.05,
    color: 'rgba(240, 240, 128, .12)',
    angleSize: 1 / 7,
  },
  {
    rotationRatio: 1.41,
    color: 'rgba(64, 128, 64, .06)',
    angleSize: 1 / 7,
  },
  {
    rotationRatio: 0.911,
    color: 'rgba(20, 20, 255, .09)',
    angleSize: 1 / 7,
  },
  {
    rotationRatio: 1.7222,
    color: 'rgba(128, 0, 128, 0.08)',
    angleSize: 2 / 7,
  },
  {
    rotationRatio: 1.23,
    color: 'rgba(255, 160, 200, .12',
    angleSize: 1 / 7,
  },
  {
    rotationRatio: 0.77,
    color: 'rgba(228, 255, 208, .12)',
    angleSize: 1 / 7,
  },
]

export const ROTATION_SIZE = 10000
