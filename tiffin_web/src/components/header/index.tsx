import { ReactElement } from 'react'

type HeaderProps = Required<{
  readonly children: ReactElement
}>

export const Header = ({ children }: HeaderProps) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}
