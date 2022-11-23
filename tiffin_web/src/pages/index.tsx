import {
  Grid,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import IconButton from '@mui/material/IconButton'
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
  const masterPrices = [500, 1000, 1500, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
  //選んだ値格納用のstate
  const [prefecture, setPrefecture] = useState<string>('0')
  const [area, setArea] = useState<string>('0')
  const [detailedArea, setDetailedArea] = useState<string>('0')
  const [station, setStation] = useState<string>('0')
  const [genre, setGenre] = useState<string>('0')
  const [detailedGenre, setDetailedGenre] = useState<string>('0')
  const [cooking, setCooking] = useState<string>('0')
  const [lowerPrice, setLowerPrice] = useState<string>('0')
  const [upperPrice, setUpperPrice] = useState<string>('0')

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
    const prefectureId = event.target.value
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
    setArea('0')
    setDetailedArea('0')
    setStation('0')
    setMasterDetailedAreas([])
  }

  //エリアを選択
  const changeArea = async (event: SelectChangeEvent) => {
    const areaId = event.target.value
    setArea(areaId)

    //詳細エリアのリストを設定
    const detailedAreaResults = await Axios.get<DetailedArea[]>(`detailed-areas/area-id/${areaId}`)

    //選び直しの場合は下位要素をリセットする
    setDetailedArea('0')

    if (detailedAreaResults.status === 404) {
      //詳細エリアが存在しない場合はエラーにしない
      setMasterDetailedAreas([])
    } else {
      setMasterDetailedAreas(detailedAreaResults.data)
    }
  }

  //詳細エリアを選択
  const changeDetailedArea = async (event: SelectChangeEvent) => {
    const detailedAreaId = event.target.value
    setDetailedArea(detailedAreaId)
  }

  //駅を選択
  const changeStation = async (event: SelectChangeEvent) => {
    const stationId = event.target.value
    setStation(stationId)
  }

  //ジャンルを選択
  const changeGenre = async (event: SelectChangeEvent) => {
    const genreId = event.target.value
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
    setDetailedGenre('0')
    setCooking('0')
  }

  //詳細ジャンルを選択
  const changeDetailedGenre = async (event: SelectChangeEvent) => {
    const detialedGenreId = event.target.value
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
    setCooking('0')
  }

  //料理を選択
  const changeCooking = async (event: SelectChangeEvent) => {
    const cookingId = event.target.value
    setCooking(cookingId)
  }

  //下限価格を選択
  const changeLowerPrice = async (event: SelectChangeEvent) => {
    const lowerPrice = event.target.value
    setLowerPrice(lowerPrice)
  }

  //上限価格を選択
  const changeUpperPrice = async (event: SelectChangeEvent) => {
    const upperPrice = event.target.value
    setUpperPrice(upperPrice)
  }

  const searchPhotos = async () => {
    const photoResults = await Axios.post<Photo[]>(`photos/choice-search`, {
      master_prefecture_id: parseInt(prefecture),
      master_area_id: parseInt(area),
      master_detailed_area_id: parseInt(detailedArea),
      master_railroad_station_id: parseInt(station),
      master_genre_id: parseInt(genre),
      master_detailed_genre_id: parseInt(detailedGenre),
      master_cooking_id: parseInt(cooking),
      price_min: parseInt(lowerPrice),
      price_max: parseInt(upperPrice),
    })
    if (photoResults.status === 404) {
      //料理が存在しない場合はエラーにしない
      setPhotos([])
    } else {
      setPhotos(photoResults.data)
    }
  }

  const reset = () => {
    //マスター系のリセット
    setMasterAreas([])
    setMasterDetailedAreas([])
    setMasterStations([])
    setMasterDetailedGenres([])
    setMasterCookings([])
    //選択系のリセット
    setPrefecture('0')
    setArea('0')
    setDetailedArea('0')
    setStation('0')
    setGenre('0')
    setDetailedGenre('0')
    setCooking('0')
    setLowerPrice('0')
    setUpperPrice('0')
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
            <Grid container xs={4} margin={2}>
              <Grid item xs={2}>
                <InputLabel>都道府県</InputLabel>
                <Select fullWidth label='Prefecture' onChange={changePrefecture} value={prefecture}>
                  {masterPrefectures.map((master) => (
                    <MenuItem value={master.id}>{master.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={4}>
                <InputLabel>エリア</InputLabel>
                <Select fullWidth label='Area' onChange={changeArea} value={area}>
                  {masterAreas.map((master) => (
                    <MenuItem value={master.id}>{master.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={3}>
                <InputLabel>詳細エリア</InputLabel>
                <Select
                  fullWidth
                  label='DetailedArea'
                  onChange={changeDetailedArea}
                  value={detailedArea}
                >
                  {masterDetailedAreas.map((master) => (
                    <MenuItem value={master.id}>{master.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={3}>
                <InputLabel>駅名</InputLabel>
                <Select fullWidth label='station' onChange={changeStation} value={station}>
                  {masterStations.map((master) => (
                    <MenuItem value={master.id}>{master.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid container xs={4} margin={2}>
              <Grid item xs={3}>
                <InputLabel>ジャンル</InputLabel>
                <Select fullWidth label='genre' onChange={changeGenre} value={genre}>
                  {masterGenres.map((master) => (
                    <MenuItem value={master.id}>{master.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={5}>
                <InputLabel>詳細ジャンル</InputLabel>
                <Select
                  fullWidth
                  label='detailedGenre'
                  onChange={changeDetailedGenre}
                  value={detailedGenre}
                >
                  {masterDetailedGenres.map((master) => (
                    <MenuItem value={master.id}>{master.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={4}>
                <InputLabel>料理</InputLabel>
                <Select fullWidth label='cooking' onChange={changeCooking} value={cooking}>
                  {masterCookings.map((master) => (
                    <MenuItem value={master.id}>{master.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid container xs={2} margin={2}>
              <Grid item xs={6}>
                <InputLabel>料金下限</InputLabel>
                <Select fullWidth label='lowerPrice' onChange={changeLowerPrice} value={lowerPrice}>
                  {masterPrices.map((master) => (
                    <MenuItem value={master}>{master}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <InputLabel>料金上限</InputLabel>
                <Select fullWidth label='upperPrice' onChange={changeUpperPrice} value={upperPrice}>
                  {masterPrices.map((master) => (
                    <MenuItem value={master}>{master}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid container xs={1} marginTop={4}>
              <Grid item>
                <IconButton onClick={searchPhotos}>
                  <SearchIcon fontSize='large' />
                </IconButton>
                <IconButton onClick={reset}>
                  <RestartAltIcon fontSize='large' />
                </IconButton>
              </Grid>
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
