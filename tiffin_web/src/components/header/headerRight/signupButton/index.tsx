import { Button } from '@mui/material'
import router from 'next/router'

export const SignupButton: React.FC = () => {
  const pushSignup = () => {
    router.push('/signup')
  }

  return (
    <Button variant='contained' onClick={pushSignup}>
      signup
    </Button>
  )
}
