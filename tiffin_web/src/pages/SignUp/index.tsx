import { useRouter } from 'next/router'
import styles from './signUp.module.css'

export const SignUp: React.FC = () => {
  const router = useRouter()
  const pushSignUp = () => {
    router.push('/')
  }

  return (
    <>
      <h1>SignUp</h1>
      <div className={styles.signUpForm}>
        <input className={styles.signUpInput} />
        <input className={styles.signUpInput} />
        <div>
          <button className={styles.backButton} onClick={() => router.back()}>
            back
          </button>
          <button className={styles.signUpButton} onClick={pushSignUp}>
            SignUp
          </button>
        </div>
      </div>
    </>
  )
}

export default SignUp
