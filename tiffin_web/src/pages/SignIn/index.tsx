import Axios from 'axios'
import Image from 'next/image'
import router from 'next/router'
import { useState } from 'react'
import { Header } from '@/components/header'
import { HeaderRight } from '@/components/header/headerRight'
import { AccountIcon } from '@/components/header/headerRight/accountIcon'
import { SignupButton } from '@/components/header/headerRight/signupButton'
import { Logo } from '@/components/header/logo'
import { Layout } from '@/components/layout'
import { AuthSigninRequest } from '@/models/request/auth/authSigninRequest'
import { AuthResponse } from '@/models/response/auth/authResponse'
import { tiffin_token_key } from '@/utils/auth'

export const Signin: React.FC = () => {
  const [user, setUser] = useState<AuthSigninRequest>()

  const pushSignin = async () => {
    const response = await Axios.post<AuthResponse>('auth/signin', user)
    if (response.status == 200) {
      //cookieにjwt認証に必要な情報を保存する
      document.cookie = `${tiffin_token_key}=${response.data}`
      router.push('/')
    } else {
      alert('ログイン失敗')
    }
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

  return (
    <>
      <Header>
        <>
          <Logo />
          <HeaderRight>
            <>
              <SignupButton />
              <AccountIcon />
            </>
          </HeaderRight>
        </>
      </Header>
      <Layout>
        <>
          <Image src='/images/auth/backgroundImage.png' alt='背景画像' width='2000' height='1500' />
          <div>Signin</div>
          <div>
            <input type='email' onChange={changedEmail} />
            <input type='password' onChange={changedPassword} />
            <div>
              <button onClick={() => router.back()}>back</button>
              <button onClick={pushSignin}>signin</button>
            </div>
          </div>
        </>
      </Layout>
    </>
  )
}

export default Signin
