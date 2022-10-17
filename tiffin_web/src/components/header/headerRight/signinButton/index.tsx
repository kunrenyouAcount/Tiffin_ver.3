import { Button } from '@mui/material'
import router from 'next/router'

export const SigninButton: React.FC = () => {
  const pushSignin = () => {
    router.push('/signin')
  }

  return (
    <Button variant='contained' onClick={pushSignin}>
      signin
    </Button>
  )
}
