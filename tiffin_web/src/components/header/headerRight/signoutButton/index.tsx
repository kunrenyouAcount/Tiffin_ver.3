import router from 'next/router'
import { tiffin_token_key } from 'src/utils/auth'

export const SignoutButton: React.FC = () => {
  const pushSignout = () => {
    document.cookie = `${tiffin_token_key}=; max-age=0`
    router.push('/')
  }

  return <button onClick={pushSignout}>signout</button>
}
