import { ReactElement } from 'react'
import styles from './layout.module.css'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div className={styles.container}>{children}</div>
    </div>
  )
}
