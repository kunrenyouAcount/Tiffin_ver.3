import { Grid, ImageList, ImageListItem } from '@mui/material'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Header from 'src/components/Header'
import { isLogin } from 'src/utils/auth'
import Axios from 'axios'
import { PhotoGetResponse } from 'src/models/api/photo/get/response'
import {
  initMenuModalItemResponse,
  MenuModalItemResponse,
} from 'src/models/api/menu/getModalItem/response'
import { Photo } from 'src/models/photo'
import MenuModal from 'src/components/menuModal'
import Search from 'src/components/search'
import PhotoList from 'src/components/photoList'

export const Home: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    ;(async () => {
      const photoResults = await Axios.get<PhotoGetResponse[]>('photos')
      setPhotos(photoResults.data)
    })()
  }, [setPhotos])

  //modal関連の情報
  const [open, setOpen] = useState<boolean>(false)
  const [modalItem, setModalItem] = useState<MenuModalItemResponse>(initMenuModalItemResponse)

  const handleOpen = async (menuId: number) => {
    const modalItemResult = await (
      await Axios.get<MenuModalItemResponse>(`menus/modal-item/${menuId}`)
    ).data
    setModalItem(modalItemResult)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  return (
    <>
      <Head>
        <title>Tiffin</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Grid container>
        <Grid item xs={12}>
          <Header title='Home' sections={[]}></Header>
        </Grid>
      </Grid>
      {isLogin() ? (
        <>
          <Search setPhotos={setPhotos} />
          反映確認用！
          <Grid>
            <PhotoList photos={photos} handleOpen={handleOpen} />
            <MenuModal
              modalItem={modalItem}
              setModalItem={setModalItem}
              open={open}
              setOpen={setOpen}
              handleOpen={handleOpen}
              handleClose={handleClose}
            />
          </Grid>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Home
