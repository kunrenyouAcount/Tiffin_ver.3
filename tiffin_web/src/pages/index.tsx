import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Header } from 'src/components/header'
import { Logo } from 'src/components/header/logo'
import { Layout } from 'src/components/layout'
import { isLogin } from 'src/utils/auth'

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
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Header>
        <Logo />
      </Header>
      <Layout>
        <>
          <Typography variant='h3' gutterBottom>
            Home
          </Typography>
          {isLogin() ? (
            <Button variant='contained' onClick={pushSignout}>
              signout{' '}
            </Button>
          ) : (
            <>
              <Button
                variant='contained'
                onClick={() => {
                  router.push('/signup')
                }}
              >
                signup
              </Button>
              <Button
                variant='contained'
                onClick={() => {
                  router.push('/signin')
                }}
              >
                signin
              </Button>
            </>
          )}
        </>
      </Layout>
    </div>
  )
}

export default Home
