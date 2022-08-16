import router from 'next/router'
import styles from './signupButton.module.css'

export const SignupButton: React.FC = () => {
  const pushSignup = () => {
    router.push('/signup')
  }

  return (
    <button className={styles.headerButton} onClick={pushSignup}>
      signup
    </button>
  )
}
