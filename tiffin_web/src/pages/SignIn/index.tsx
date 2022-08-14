import Axios from 'axios'
import router from 'next/router'
import { useState } from 'react'
import styles from './signin.module.css'
import { Header } from '@/components/header/header'
import { HeaderRight } from '@/components/header/headerRight/headerRight'
import { SignupButton } from '@/components/header/headerRight/signupButton/signupButton'
import { Logo } from '@/components/header/logo/logo'
import { Layout } from '@/components/layout/layout'
import { AuthSigninRequest } from '@/models/request/auth/authSigninRequest'
import { AuthResponse } from '@/models/response/auth/authResponse'
import { tiffin_token_key } from '@/utils/auth'

export const Signin: React.FC = () => {
  const [user, setUser] = useState<AuthSigninRequest>()

  const pushSignin = async () => {
    const response = await Axios.post<AuthResponse>('auth/signin', user)
    if (response.status == 200) {
      //cookieにjwt認証に必要な情報を保存する
      document.cookie = `${tiffin_token_key}=${response.data.access_token}`
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
            </>
          </HeaderRight>
        </>
      </Header>
      <Layout>
        <>
          <div className={styles.pageTitle}>Signin</div>
          <div className={styles.signinForm}>
            <input type='email' className={styles.signinInput} onChange={changedEmail} />
            <input type='password' className={styles.signinInput} onChange={changedPassword} />
            <div>
              <button className={styles.backButton} onClick={() => router.back()}>
                back
              </button>
              <button className={styles.signinButton} onClick={pushSignin}>
                signin
              </button>
            </div>
          </div>
        </>
      </Layout>
    </>
  )
}

export default Signin
