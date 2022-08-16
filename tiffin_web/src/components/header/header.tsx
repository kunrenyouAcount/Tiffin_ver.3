import { ReactElement } from 'react'
import styles from './header.module.css'

type HeaderProps = Required<{
  readonly children: ReactElement
}>

export const Header = ({ children }: HeaderProps) => {
  return (
    <div>
      <div className={styles.headerArea}>{children}</div>
    </div>
  )
}
