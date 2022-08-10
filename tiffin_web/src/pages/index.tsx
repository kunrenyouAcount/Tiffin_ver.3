import Head from 'next/head'
import { useRouter } from 'next/router'

export const Home: React.FC = () => {
  const router = useRouter()

  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Home</h1>
        <button
          onClick={() => {
            router.push('/signin')
          }}
        >
          signin
        </button>
        <button
          onClick={() => {
            router.push('/signup')
          }}
        >
          signup
        </button>
      </main>
    </div>
  )
}

export default Home
