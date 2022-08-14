import { ReactElement } from 'react'
import styles from './headerRight.module.css'

type HeaderRightProps = Required<{
  readonly children: ReactElement
}>

export const HeaderRight = ({ children }: HeaderRightProps) => {
  return <div className={styles.headerRightArea}>{children}</div>
}
