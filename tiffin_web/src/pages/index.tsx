import {
  Grid,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Header from 'src/components/Header'
import { Photo } from 'src/models/Photo'
import { isLogin } from 'src/utils/auth'
import Axios from 'axios'
import { Prefecture } from 'src/models/Prefecture'
import { Area } from 'src/models/Area'
import { DetailedArea } from 'src/models/DetailedArea'

export const Home: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([])
  //マスタ用のstate
  const [masterPrefectures, setMasterPrefectures] = useState<Prefecture[]>([])
  const [masterAreas, setMasterAreas] = useState<Area[]>([])
  const [masterDetailedAreas, setMasterDetailedAreas] = useState<DetailedArea[]>([])
  //選んだ値格納用のstate
  const [prefecture, setPrefecture] = useState<number>(0)
  const [area, setArea] = useState<number>(0)
  const [detailedArea, setDetailedArea] = useState<number>(0)

  useEffect(() => {
    ;(async () => {
      const photoResults = await Axios.get<Photo[]>('photos')
      setPhotos(photoResults.data)
      const prefectureResults = await Axios.get<Prefecture[]>('prefectures')
      setMasterPrefectures(prefectureResults.data)
    })()
  }, [setPhotos, setMasterPrefectures, setMasterAreas])

  //都道府県を選択
  const changePrefecture = async (event: SelectChangeEvent) => {
    setPrefecture(parseInt(event.target.value))
    
    //エリアのリストを設定
    const areaResults = await Axios.get<Area[]>(
      `areas/prefecture-id/${event.target.value as string}`,
    )
    setMasterAreas(areaResults.data)

    //選び直しの場合は下位要素をリセットする
    setArea(0)
    setDetailedArea(0)
    setMasterDetailedAreas([])
  }

  //エリアを選択
  const changeArea = async (event: SelectChangeEvent) => {
    setArea(parseInt(event.target.value))
    
    //詳細エリアのリストを設定
    const detailedAreaResults = await Axios.get<DetailedArea[]>(
      `detailed-areas/area-id/${event.target.value as string}`,
    )

    //選び直しの場合は下位要素をリセットする
    setDetailedArea(0)

    if (detailedAreaResults.status === 404) {
      //詳細エリアが存在しない場合はエラーにしない
      setMasterDetailedAreas([])
    } else {
      setMasterDetailedAreas(detailedAreaResults.data)
    }
  }

  //詳細エリアを選択
  const changeDetailedArea = async (event: SelectChangeEvent) => {
    setDetailedArea(parseInt(event.target.value))
  }

  return (
    <div className='container'>
      <Head>
        <title>Tiffin</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Header title='Home' sections={[]}></Header>
      {isLogin() ? (
        <main>
          <Grid container component='main' sx={{ height: '100px' }}>
            <Grid item>
              <InputLabel>都道府県</InputLabel>
              <Select label='Prefecture' onChange={changePrefecture}>
                {masterPrefectures.map((master) => (
                  <MenuItem value={master.id}>{master.name}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <InputLabel>エリア</InputLabel>
              <Select label='Area' onChange={changeArea}>
                {masterAreas.map((master) => (
                  <MenuItem value={master.id}>{master.name}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <InputLabel>詳細エリア</InputLabel>
              <Select label='DetailedArea' onChange={changeDetailedArea}>
                {masterDetailedAreas.map((master) => (
                  <MenuItem value={master.id}>{master.name}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <ImageList
            sx={{ width: 1900, height: 270 * (Math.floor(photos.length / 7) + 1) }}
            cols={7}
            rowHeight={164}
          >
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
