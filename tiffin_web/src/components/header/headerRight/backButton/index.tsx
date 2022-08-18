import router from 'next/router'

export const BackButton: React.FC = () => {
  const goBack = () => {
    router.back()
  }

  return <button onClick={goBack}>戻る</button>
}
