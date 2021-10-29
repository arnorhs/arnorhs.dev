export interface BaseTriangle {
  color: string
  rotationRatio: number
}

export interface Triangle extends BaseTriangle {
  ref?: HTMLElement
}
