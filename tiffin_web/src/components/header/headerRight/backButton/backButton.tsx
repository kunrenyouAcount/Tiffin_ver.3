import router from 'next/router'
import styles from './backButton.module.css'

export const BackButton: React.FC = () => {
  const goBack = () => {
    router.back()
  }

  return (
    <button className={styles.headerButton} onClick={goBack}>
      戻る
    </button>
  )
}
