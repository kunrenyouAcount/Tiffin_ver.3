import router from 'next/router'

export const SignupButton: React.FC = () => {
  const pushSignup = () => {
    router.push('/signup')
  }

  return <button onClick={pushSignup}>signup</button>
}
