import router from 'next/router'
import styles from './signoutButton.module.css'
import { tiffin_token_key } from '@/utils/auth'

export const SignoutButton: React.FC = () => {
  const pushSignout = () => {
    document.cookie = `${tiffin_token_key}=; max-age=0`
    router.push('/')
  }

  return (
    <button className={styles.headerButton} onClick={pushSignout}>
      signout
    </button>
  )
}