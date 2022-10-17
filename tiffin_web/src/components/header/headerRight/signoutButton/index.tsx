import { Button } from '@mui/material'
import router from 'next/router'
import { tiffin_token_key } from 'src/utils/auth'

export const SignoutButton: React.FC = () => {
  const pushSignout = () => {
    document.cookie = `${tiffin_token_key}=; max-age=0`
    router.push('/')
  }

  return (
    <Button variant='contained' onClick={pushSignout}>
      signout
    </Button>
  )
}
