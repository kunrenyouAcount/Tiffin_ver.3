import { useRouter } from 'next/router'
import styles from './signin.module.css'

export const Signin: React.FC = () => {
  const router = useRouter()
  const pushSignin = () => {
    router.push('/')
  }

  return (
    <>
      <h1>Signin</h1>
      <div className={styles.signinForm}>
        <input className={styles.signinInput} />
        <input className={styles.signinInput} />
        <div>
          <button className={styles.backButton} onClick={() => router.back()}>
            back
          </button>
          <button className={styles.signinButton} onClick={pushSignin}>
            signin
          </button>
        </div>
      </div>
    </>
  )
}

export default Signin
