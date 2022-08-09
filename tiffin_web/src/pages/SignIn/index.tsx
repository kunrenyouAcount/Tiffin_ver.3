import { useRouter } from 'next/router'
import styles from './signIn.module.css'

export const SignIn: React.FC = () => {
  const router = useRouter()
  const pushSignIn = () => {
    router.push('/')
  }

  return (
    <>
      <h1>SignIn</h1>
      <div className={styles.signInForm}>
        <input className={styles.signInInput} />
        <input className={styles.signInInput} />
        <div>
          <button className={styles.backButton} onClick={() => router.back()}>
            back
          </button>
          <button className={styles.signInButton} onClick={pushSignIn}>
            SignIn
          </button>
        </div>
      </div>
    </>
  )
}

export default SignIn
