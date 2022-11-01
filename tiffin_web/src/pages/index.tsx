import { ImageList, ImageListItem } from '@mui/material'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Header from 'src/components/Header'
import { Photo } from 'src/models/Photo'
import { isLogin } from 'src/utils/auth'
import Axios from 'axios'

export const Home: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([])
  useEffect(() => {
    ;(async () => {
      const results = await Axios.get<Photo[]>('photos')
      setPhotos(results.data)
    })()
  }, [setPhotos])
  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Header title='Home' sections={[]}></Header>
      {isLogin() ? (
        <main>
          <ImageList sx={{ width: 1900, height: 540 }} cols={7} rowHeight={164}>
            {photos.map((photo) => (
              <ImageListItem key={photo.id}>
                <img
                  src={`${photo.path}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${photo.path}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  loading='lazy'
                />
              </ImageListItem>
            ))}
          </ImageList>
        </main>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Home
