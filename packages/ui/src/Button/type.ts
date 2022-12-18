import type React from 'react'

export interface IAnButtonBaseProps {
  /**
   * @description 基础按钮
   * @default "primary"
   */
  type?: 'primary' | 'ghost'
}

export type IAnButtonProps = IAnButtonBaseProps &
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
