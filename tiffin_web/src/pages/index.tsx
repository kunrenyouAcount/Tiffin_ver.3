import {
  Box,
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
import { isLogin } from 'src/utils/auth'
import Axios from 'axios'
import { PhotoGetResponse } from 'src/models/api/photo/get/response'
import { PrefectureGetResponse } from 'src/models/api/prefecture/get/response'
import { AreaGetResponse } from 'src/models/api/area/get/response'
import { DetailedAreaGetResponse } from 'src/models/api/detailedArea/get/response'
import { RailroadStationGetResponse } from 'src/models/api/railroadStation/get/response'
import { GenreGetResponse } from 'src/models/api/genre/get/response'
import { DetailedGenreGetResponse } from 'src/models/api/detailedGenre/get/response'
import { CookingGetResponse } from 'src/models/api/cooking/get/response'
import Modal from '@mui/material/Modal'

import {
  initMenuModalItemResponse,
  MenuModalItemResponse,
} from 'src/models/api/menu/getModalItem/response'

export const Home: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoGetResponse[]>([])
  //マスタ用のstate
  const [masterPrefectures, setMasterPrefectures] = useState<PrefectureGetResponse[]>([])
  const [masterAreas, setMasterAreas] = useState<AreaGetResponse[]>([])
  const [masterDetailedAreas, setMasterDetailedAreas] = useState<DetailedAreaGetResponse[]>([])
  const [masterStations, setMasterStations] = useState<RailroadStationGetResponse[]>([])
  const [masterGenres, setMasterGenres] = useState<GenreGetResponse[]>([])
  const [masterDetailedGenres, setMasterDetailedGenres] = useState<DetailedGenreGetResponse[]>([])
  const [masterCookings, setMasterCookings] = useState<CookingGetResponse[]>([])
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
  //モーダル用
  const [open, setOpen] = useState<boolean>(false)
  const [modalItem, setModalItem] = useState<MenuModalItemResponse>(initMenuModalItemResponse)

  useEffect(() => {
    ;(async () => {
      const photoResults = await Axios.get<PhotoGetResponse[]>('photos')
      setPhotos(photoResults.data)
      const prefectureResults = await Axios.get<PrefectureGetResponse[]>('prefectures')
      setMasterPrefectures(prefectureResults.data)
      const genreResults = await Axios.get<GenreGetResponse[]>('genres')
      setMasterGenres(genreResults.data)
    })()
  }, [setPhotos, setMasterPrefectures, setMasterGenres])

  //都道府県を選択
  const changePrefecture = async (event: SelectChangeEvent) => {
    const prefectureId = event.target.value
    setPrefecture(prefectureId)

    //エリアのリストを設定
    const areaResults = await Axios.get<AreaGetResponse[]>(`areas/prefecture-id/${prefectureId}`)
    setMasterAreas(areaResults.data)

    //駅のリストを設定
    const stationResults = await Axios.get<RailroadStationGetResponse[]>(
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
    const detailedAreaResults = await Axios.get<DetailedAreaGetResponse[]>(
      `detailed-areas/area-id/${areaId}`,
    )

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
    const detailedGenreResults = await Axios.get<DetailedGenreGetResponse[]>(
      `detailed-genres/genre-id/${genreId}`,
    )
    if (detailedGenreResults.status === 404) {
      //料理が存在しない場合はエラーにしない
      setMasterDetailedGenres([])
    } else {
      setMasterDetailedGenres(detailedGenreResults.data)
    }

    //料理のリストを設定
    const cookingResults = await Axios.get<CookingGetResponse[]>(`cookings/genre-id/${genreId}`)

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
    const cookingResults = await Axios.get<CookingGetResponse[]>(
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
    const photoResults = await Axios.post<PhotoGetResponse[]>(`photos/choice-search`, {
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

  const handleOpen = async (menuId: number) => {
    const modalItemResult = await (
      await Axios.get<MenuModalItemResponse>(`menus/modal-item/${menuId}`)
    ).data
    setModalItem(modalItemResult)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    height: 800,
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'rgba(47, 43, 43, 0.9)',
    border: '2px solid rgba(47, 43, 43, 1)',
    boxShadow: 24,
    color: 'white',
    p: 4,
  }

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
          <Grid
            container
            spacing={2}
            border='1px solid grey'
            margin='auto'
            paddingBottom={3}
            xs={12}
            sx={{ borderRadius: '16px', boxShadow: 4 }}
          >
            <Grid item xs={4}>
              <Grid container direction='column'>
                場所で絞り込み
                <Grid container>
                  <Grid item xs={4}>
                    <InputLabel>都道府県</InputLabel>
                    <Select
                      fullWidth
                      label='Prefecture'
                      onChange={changePrefecture}
                      value={prefecture}
                    >
                      {masterPrefectures.map((master) => (
                        <MenuItem value={master.id}>{master.name}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container direction='row'>
                      <Grid item xs={6}>
                        <InputLabel>エリア</InputLabel>
                        <Select fullWidth label='Area' onChange={changeArea} value={area}>
                          {masterAreas.map((master) => (
                            <MenuItem value={master.id}>{master.name}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={6}>
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
                      <Grid item xs={6}>
                        <InputLabel>駅名</InputLabel>
                        <Select fullWidth label='station' onChange={changeStation} value={station}>
                          {masterStations.map((master) => (
                            <MenuItem value={master.id}>{master.name}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid container direction='column'>
                メニューで絞り込み
                <Grid container>
                  <Grid item xs={4}>
                    <InputLabel>ジャンル</InputLabel>
                    <Select fullWidth label='genre' onChange={changeGenre} value={genre}>
                      {masterGenres.map((master) => (
                        <MenuItem value={master.id}>{master.name}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={4}>
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
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction='column'>
                予算で絞り込み
                <Grid container>
                  <Grid item xs={6}>
                    <InputLabel>料金下限</InputLabel>
                    <Select
                      fullWidth
                      label='lowerPrice'
                      onChange={changeLowerPrice}
                      value={lowerPrice}
                    >
                      {masterPrices.map((master) => (
                        <MenuItem value={master}>{master}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel>料金上限</InputLabel>
                    <Select
                      fullWidth
                      label='upperPrice'
                      onChange={changeUpperPrice}
                      value={upperPrice}
                    >
                      {masterPrices.map((master) => (
                        <MenuItem value={master}>{master}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container direction='column' item alignItems='center'>
                <Grid item xs={6}>
                  <IconButton onClick={reset}>
                    <RestartAltIcon fontSize='large' />
                  </IconButton>
                </Grid>
                <Grid item xs={6}>
                  <IconButton onClick={searchPhotos}>
                    <SearchIcon fontSize='large' />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <ImageList cols={5}>
              {photos.map((photo) => (
                <ImageListItem key={photo.id}>
                  <img
                    src={`${photo.path}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${photo.path}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    loading='lazy'
                    onClick={() => {
                      handleOpen(photo.menu_id)
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <ImageList>
                  <ImageListItem>
                    <img
                      src={`${modalItem.photo_path}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${modalItem.photo_path}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      loading='lazy'
                    />
                  </ImageListItem>
                  <Grid container>
                    <div>
                      <div>{modalItem.name}</div>
                      <div>{modalItem.price}円</div>
                      <Grid item alignItems='flex-end'>
                        <Box>
                          <div>{modalItem.shop.name}</div>
                          <div>
                            {modalItem.shop.opening_time.substring(0, 5)}〜
                            {modalItem.shop.closing_time.substring(0, 5)}
                          </div>
                          <div>{modalItem.shop.tel}</div>
                          <div>{modalItem.shop.station_name}駅</div>
                          <div>{modalItem.shop.address}</div>
                        </Box>
                      </Grid>
                    </div>
                  </Grid>
                </ImageList>
                <div>『{modalItem.shop.name}』の他のメニュー</div>
                <ImageList
                  sx={{ width: 2000, height: 270 * (Math.floor(photos.length / 7) + 1) }}
                  cols={7}
                  rowHeight={164}
                >
                  {modalItem.other_menus
                    .map((menu) => (
                      <ImageListItem key={menu.id}>
                        <img
                          src={`${menu.photo_path}?w=164&h=164&fit=crop&auto=format`}
                          srcSet={`${menu.photo_path}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          loading='lazy'
                          onClick={() => {
                            handleOpen(menu.id)
                          }}
                        />
                      </ImageListItem>
                    ))
                    .slice(0, 4)}
                </ImageList>
              </Box>
            </Modal>
          </Grid>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Home
