import { useRouter } from 'next/router'
import styles from './signup.module.css'

export const Signup: React.FC = () => {
  const router = useRouter()
  const pushSignup = () => {
    router.push('/')
  }

  return (
    <>
      <h1>Signup</h1>
      <div className={styles.signupForm}>
        <input className={styles.signupInput} />
        <input className={styles.signupInput} />
        <div>
          <button className={styles.backButton} onClick={() => router.back()}>
            back
          </button>
          <button className={styles.signupButton} onClick={pushSignup}>
            signup
          </button>
        </div>
      </div>
    </>
  )
}

export default Signup
