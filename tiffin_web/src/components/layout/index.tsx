import { ReactElement } from 'react'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}
