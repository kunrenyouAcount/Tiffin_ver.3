import router from 'next/router'
import styles from './logo.module.css'

export const Logo: React.FC = () => {
  return (
    <div className={styles.logo} onClick={() => router.push('/')}>
      Tiffin
    </div>
  )
}
