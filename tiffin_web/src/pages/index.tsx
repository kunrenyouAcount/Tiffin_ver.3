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
import { Station } from 'src/models/Station'
import { Genre } from 'src/models/Genre'
import { DetailedGenre } from 'src/models/DetailedGenre'
import { Cooking } from 'src/models/Cooking'

export const Home: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([])
  //マスタ用のstate
  const [masterPrefectures, setMasterPrefectures] = useState<Prefecture[]>([])
  const [masterAreas, setMasterAreas] = useState<Area[]>([])
  const [masterDetailedAreas, setMasterDetailedAreas] = useState<DetailedArea[]>([])
  const [masterStations, setMasterStations] = useState<Station[]>([])
  const [masterGenres, setMasterGenres] = useState<Genre[]>([])
  const [masterDetailedGenres, setMasterDetailedGenres] = useState<DetailedGenre[]>([])
  const [masterCookings, setMasterCookings] = useState<Cooking[]>([])
  //選んだ値格納用のstate
  const [prefecture, setPrefecture] = useState<number>(0)
  const [area, setArea] = useState<number>(0)
  const [detailedArea, setDetailedArea] = useState<number>(0)
  const [station, setStation] = useState<number>(0)
  const [genres, setGenre] = useState<number>(0)
  const [detailedGenre, setDetailedGenre] = useState<number>(0)
  const [cooking, setCooking] = useState<number>(0)

  useEffect(() => {
    ;(async () => {
      const photoResults = await Axios.get<Photo[]>('photos')
      setPhotos(photoResults.data)
      const prefectureResults = await Axios.get<Prefecture[]>('prefectures')
      setMasterPrefectures(prefectureResults.data)
      const genreResults = await Axios.get<Genre[]>('genres')
      setMasterGenres(genreResults.data)
    })()
  }, [setPhotos, setMasterPrefectures, setMasterGenres])

  //都道府県を選択
  const changePrefecture = async (event: SelectChangeEvent) => {
    const prefectureId = parseInt(event.target.value)
    setPrefecture(prefectureId)

    //エリアのリストを設定
    const areaResults = await Axios.get<Area[]>(`areas/prefecture-id/${prefectureId}`)
    setMasterAreas(areaResults.data)

    //駅のリストを設定
    const stationResults = await Axios.get<Station[]>(
      `railroad-stations/prefecture-id/${prefectureId}`,
    )
    setMasterStations(stationResults.data)

    //選び直しの場合は下位要素をリセットする
    setArea(0)
    setDetailedArea(0)
    setStation(0)
    setMasterDetailedAreas([])
  }

  //エリアを選択
  const changeArea = async (event: SelectChangeEvent) => {
    const areaId = parseInt(event.target.value)
    setArea(areaId)

    //詳細エリアのリストを設定
    const detailedAreaResults = await Axios.get<DetailedArea[]>(`detailed-areas/area-id/${areaId}`)

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
    const detailedAreaId = parseInt(event.target.value)
    setDetailedArea(detailedAreaId)
  }

  //駅を選択
  const changeStation = async (event: SelectChangeEvent) => {
    const stationId = parseInt(event.target.value)
    setStation(stationId)
  }

  //ジャンルを選択
  const changeGenre = async (event: SelectChangeEvent) => {
    const genreId = parseInt(event.target.value)
    setGenre(genreId)

    //詳細ジャンルのリストを設定
    const detailedGenreResults = await Axios.get<DetailedGenre[]>(
      `detailed-genres/genre-id/${genreId}`,
    )
    if (detailedGenreResults.status === 404) {
      //料理が存在しない場合はエラーにしない
      setMasterDetailedGenres([])
    } else {
      setMasterDetailedGenres(detailedGenreResults.data)
    }

    //料理のリストを設定
    const cookingResults = await Axios.get<Cooking[]>(`cookings/genre-id/${genreId}`)

    if (cookingResults.status === 404) {
      //料理が存在しない場合はエラーにしない
      setMasterCookings([])
    } else {
      setMasterCookings(cookingResults.data)
    }

    //選び直しの場合は下位要素をリセットする
    setDetailedGenre(0)
    setCooking(0)
  }

  //詳細ジャンルを選択
  const changeDetailedGenre = async (event: SelectChangeEvent) => {
    const detialedGenreId = parseInt(event.target.value)
    setDetailedGenre(detialedGenreId)

    //料理のリストを設定
    const cookingResults = await Axios.get<Cooking[]>(
      `cookings/detailed-genre-id/${detialedGenreId}`,
    )
    if (cookingResults.status === 404) {
      //料理が存在しない場合はエラーにしない
      setMasterCookings([])
    } else {
      setMasterCookings(cookingResults.data)
    }

    //選び直しの場合は下位要素をリセットする
    setCooking(0)
  }

  //料理を選択
  const changeCooking = async (event: SelectChangeEvent) => {
    const cookingId = parseInt(event.target.value)
    setCooking(cookingId)
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
            <Grid item>
              <InputLabel>駅名</InputLabel>
              <Select label='station' onChange={changeStation}>
                {masterStations.map((master) => (
                  <MenuItem value={master.id}>{master.name}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <InputLabel>ジャンル</InputLabel>
              <Select label='genre' onChange={changeGenre}>
                {masterGenres.map((master) => (
                  <MenuItem value={master.id}>{master.name}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <InputLabel>詳細ジャンル</InputLabel>
              <Select label='detailedGenre' onChange={changeDetailedGenre}>
                {masterDetailedGenres.map((master) => (
                  <MenuItem value={master.id}>{master.name}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <InputLabel>料理</InputLabel>
              <Select label='cooking' onChange={changeCooking}>
                {masterCookings.map((master) => (
                  <MenuItem value={master.id}>{master.name}</MenuItem>
                ))}
              </Select>
            </Grid>
            {/* <Grid item>
              <InputLabel>料金下限</InputLabel>
              <Select label='rowPrice' onChange={changeRowPrice}>
                {masterPrices.map((master) => (
                  <MenuItem value={master.id}>{master.name}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <InputLabel>料金上限</InputLabel>
              <Select label='cooking' onChange={changeCooking}>
                {masterCookings.map((master) => (
                  <MenuItem value={master.id}>{master.name}</MenuItem>
                ))}
              </Select>
            </Grid> */}
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
