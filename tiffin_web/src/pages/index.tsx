import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from './Home.module.css'
import { Header } from '@/components/header/header'
import { Logo } from '@/components/header/logo/logo'
import { Layout } from '@/components/layout/layout'
import { isLogin } from '@/utils/auth'

export const Home: React.FC = () => {
  const router = useRouter()
  const pushSignout = () => {
    document.cookie = `tiffin_token=; max-age=0`
    router.push('/')
  }

  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header>
        <>
          <Logo />
        </>
      </Header>
      <Layout>
        <>
          <div className={styles.pageTitle}>Home</div>
          {isLogin() ? (
            <button className={styles.primaryButton} onClick={pushSignout}>
              signout
            </button>
          ) : (
            <>
              <button
                className={styles.primaryButton}
                onClick={() => {
                  router.push('/signup')
                }}
              >
                signup
              </button>
              <button
                className={styles.primaryButton}
                onClick={() => {
                  router.push('/signin')
                }}
              >
                signin
              </button>
            </>
          )}
        </>
      </Layout>
    </div>
  )
}

export default Home
