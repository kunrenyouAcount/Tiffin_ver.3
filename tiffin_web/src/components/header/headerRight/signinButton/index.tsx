import router from 'next/router'

export const SigninButton: React.FC = () => {
  const pushSignin = () => {
    router.push('/signin')
  }

  return <button onClick={pushSignin}>signin</button>
}
