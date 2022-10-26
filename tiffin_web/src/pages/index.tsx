import { Grid, ImageList, ImageListItem } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from 'src/components/Header'

const itemData = [
  {
    img: '/images/sample/sample01.jpeg',
    title: 'パエリア',
  },
  {
    img: '/images/sample/sample02.png',
    title: '照り焼きチキン',
  },
  {
    img: '/images/sample/sample03.jpeg',
    title: 'サーモンのクリーム煮',
  },
  {
    img: '/images/sample/sample04.jpeg',
    title: 'ひき肉となすのボロネーゼごはん',
  },
  {
    img: '/images/sample/sample05.jpeg',
    title: 'よだれ鶏',
  },
  {
    img: '/images/sample/sample06.jpeg',
    title: 'スタミナ丼',
  },
  {
    img: '/images/sample/sample07.jpeg',
    title: '餃子',
  },
  {
    img: '/images/sample/sample08.jpeg',
    title: '鰻丼',
  },
  {
    img: '/images/sample/sample09.jpg',
    title: 'チョコレートケーキ',
  },
]

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
      <main>
        <ImageList sx={{ width: 1900, height: 540 }} cols={7} rowHeight={164}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading='lazy'
              />
            </ImageListItem>
          ))}
        </ImageList>
      </main>
    </div>
  )
}

export default Home
