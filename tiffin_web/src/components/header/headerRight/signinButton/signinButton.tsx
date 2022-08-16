import router from 'next/router'
import styles from './signinButton.module.css'

export const SigninButton: React.FC = () => {
  const pushSignin = () => {
    router.push('/signin')
  }

  return (
    <button className={styles.headerButton} onClick={pushSignin}>
      signin
    </button>
  )
}
