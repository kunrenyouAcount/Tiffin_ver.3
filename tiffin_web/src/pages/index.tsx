import { Grid } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from 'src/components/Header'

export const Home: React.FC = () => {
  const router = useRouter()

  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Header title='Home' sections={[]}></Header>
      <main></main>
    </div>
  )
}

export default Home
