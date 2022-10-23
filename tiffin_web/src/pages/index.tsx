import { AppBar, Grid, Toolbar } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Logo } from 'src/components/logo'
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
      <header>
        <AppBar color='default' position='relative'>
          <Toolbar>
            <Grid container component='main'>
              <Grid item md={11}>
                <Logo />
              </Grid>
              <Grid item md={1}>
                {isLogin() ? (
                  <Button variant='contained' onClick={pushSignout}>
                    signout{' '}
                  </Button>
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </header>
      <Grid container mt={5}>
        <Grid container alignItems='center' justifyContent='center' direction='column'>
          <Grid item>
            <Typography variant='h3' gutterBottom>
              Home
            </Typography>
          </Grid>
          <Grid item>
            {isLogin() ? (
              <></>
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
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
