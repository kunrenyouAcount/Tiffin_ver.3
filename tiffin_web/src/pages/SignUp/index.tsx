import Axios from 'axios'
import router from 'next/router'
import { useState } from 'react'
import { Header } from '@/components/header'
import { HeaderRight } from '@/components/header/headerRight'
import { AccountIcon } from '@/components/header/headerRight/accountIcon'
import { SigninButton } from '@/components/header/headerRight/signinButton'
import { Logo } from '@/components/header/logo'
import { Layout } from '@/components/layout'
import { AuthSignupRequest } from '@/models/request/auth/authSignupRequest'

export const Signup: React.FC = () => {
  const [user, setUser] = useState<AuthSignupRequest>()

  const changedName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUser = Object.assign({}, user)
    newUser.name = e.target.value
    setUser(newUser)
  }
  const changedEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUser = Object.assign({}, user)
    newUser.email = e.target.value
    setUser(newUser)
  }

  const changedPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUser = Object.assign({}, user)
    newUser.password = e.target.value
    setUser(newUser)
  }

  const changedConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUser = Object.assign({}, user)
    newUser.password_confirmation = e.target.value
    setUser(newUser)
  }

  const pushSignup = async () => {
    const response = await Axios.post('auth/register', user)
    if (response.status == 200) {
      router.push('/')
    } else {
      alert('登録失敗')
    }
  }

  return (
    <>
      <Header>
        <>
          <Logo />
          <HeaderRight>
            <>
              <SigninButton />
              <AccountIcon />
            </>
          </HeaderRight>
        </>
      </Header>
      <Layout>
        <>
          <div>Signup</div>
          <div>
            <input type='text' onChange={changedName} />
            <input type='email' onChange={changedEmail} />
            <input type='password' onChange={changedPassword} />
            <input type='password' onChange={changedConfirmation} />
            <div>
              <button onClick={() => router.back()}>back</button>
              <button onClick={pushSignup}>signup</button>
            </div>
          </div>
        </>
      </Layout>
    </>
  )
}

export default Signup
