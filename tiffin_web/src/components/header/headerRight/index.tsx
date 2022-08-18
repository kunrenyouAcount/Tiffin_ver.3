import { ReactElement } from 'react'

type HeaderRightProps = Required<{
  readonly children: ReactElement
}>

export const HeaderRight = ({ children }: HeaderRightProps) => {
  return <div>{children}</div>
}
