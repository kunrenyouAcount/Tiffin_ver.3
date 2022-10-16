import Axios from 'axios'
import Image from 'next/image'
import router from 'next/router'
import { useState } from 'react'
import { Header } from 'src/components/header'
import { HeaderRight } from 'src/components/header/headerRight'
import { AccountIcon } from 'src/components/header/headerRight/accountIcon'
import { SigninButton } from 'src/components/header/headerRight/signinButton'
import { Logo } from 'src/components/header/logo'
import { Layout } from 'src/components/layout'
import { AuthSignupRequest } from 'src/models/request/auth/authSignupRequest'

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
          <Image src='/images/auth/backgroundImage.png' alt='背景画像' width='2000' height='1500' />
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
