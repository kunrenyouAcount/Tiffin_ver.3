import Head from 'next/head'
import { useRouter } from 'next/router'
import { Header } from '@/components/header'
import { Logo } from '@/components/header/logo'
import { Layout } from '@/components/layout'
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
        <Logo />
      </Header>
      <Layout>
        <>
          <div>Home</div>
          {isLogin() ? (
            <button onClick={pushSignout}>signout</button>
          ) : (
            <>
              <button
                onClick={() => {
                  router.push('/signup')
                }}
              >
                signup
              </button>
              <button
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
