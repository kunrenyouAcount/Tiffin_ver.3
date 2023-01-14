import {
  Box,
  Button,
  Grid,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select as MaterialSelect,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import Select from 'react-select'
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
import { GenreGetResponse } from 'src/models/api/genre/get/response'
import { DetailedGenreGetResponse } from 'src/models/api/detailedGenre/get/response'
import { CookingGetResponse } from 'src/models/api/cooking/get/response'
import Modal from '@mui/material/Modal'

import {
  initMenuModalItemResponse,
  MenuModalItemResponse,
} from 'src/models/api/menu/getModalItem/response'
import {
  initPlaceSearchByKeywordResponse,
  PlaceSearchByKeywordResponse,
} from 'src/models/api/place/searchKeyword/response'
import makeAnimated from 'react-select/animated'
import {
  EatingSearchByKeywordResponse,
  initEatingSearchByKeywordResponse,
} from 'src/models/api/eating/searchKeyword/response'

export const Home: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoGetResponse[]>([])
  //マスタ用のstate
  const [masterPrefectures, setMasterPrefectures] = useState<PrefectureGetResponse[]>([])
  const [masterAreas, setMasterAreas] = useState<AreaGetResponse[]>([])
  const [masterDetailedAreas, setMasterDetailedAreas] = useState<DetailedAreaGetResponse[]>([])
  const [masterGenres, setMasterGenres] = useState<GenreGetResponse[]>([])
  const [masterDetailedGenres, setMasterDetailedGenres] = useState<DetailedGenreGetResponse[]>([])
  const [masterCookings, setMasterCookings] = useState<CookingGetResponse[]>([])
  const masterPrices = [500, 1000, 1500, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
  const [masterPlaces, setMasterPlaces] = useState<PlaceSearchByKeywordResponse>(
    initPlaceSearchByKeywordResponse,
  )
  const [masterEatings, setMasterEatings] = useState<EatingSearchByKeywordResponse>(
    initEatingSearchByKeywordResponse,
  )
  //選んだ値格納用のstate
  const [prefecture, setPrefecture] = useState<string>('0')
  const [area, setArea] = useState<string>('0')
  const [detailedArea, setDetailedArea] = useState<string>('0')
  const [genre, setGenre] = useState<string>('0')
  const [detailedGenre, setDetailedGenre] = useState<string>('0')
  const [station, setStation] = useState<string>('0')
  const [cooking, setCooking] = useState<string>('0')
  const [lowerPrice, setLowerPrice] = useState<string>('0')
  const [upperPrice, setUpperPrice] = useState<string>('0')
  //画像モーダル用
  const [open, setOpen] = useState<boolean>(false)
  const [modalItem, setModalItem] = useState<MenuModalItemResponse>(initMenuModalItemResponse)
  //検索ボックス用
  const [searchBox, setSearchBox] = useState<'pulldown-search' | 'keyword-search'>('keyword-search')
  const [inputPlace, setInputPlace] = useState<string>('')
  const [inputEating, setInputEating] = useState<string>('')
  //アニメーション用
  const animatedComponents = makeAnimated()

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

    //選び直しの場合は下位要素をリセットする
    setArea('0')
    setDetailedArea('0')
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

  //キーワード検索（場所）
  const changePlace = async (value: any) => {
    const keyword = value
    setInputPlace(keyword)
    const searchResult = await Axios.get<PlaceSearchByKeywordResponse>(
      `places/search-keyword/?keyword=${keyword}`,
    )
    setMasterPlaces(searchResult.data)
  }

  //キーワード検索（食）
  const changeEating = async (value: any) => {
    const keyword = value
    setInputEating(keyword)
    const searchResult = await Axios.get<EatingSearchByKeywordResponse>(
      `eatings/search-keyword/?keyword=${keyword}`,
    )
    setMasterEatings(searchResult.data)
  }

  //キーワード検索後（場所選択）
  const selectPlace = async (place: { datatype: string; label: string; value: string }) => {
    //既に入力されていた内容をリセット
    setPrefecture('0')
    setArea('0')
    setDetailedArea('0')
    setStation('0')

    //選択中の項目をセット
    if (place.datatype === 'prefecture') {
      setPrefecture(place.value)
    }
    if (place.datatype === 'area') {
      setArea(place.value)
    }
    if (place.datatype === 'detailed-area') {
      setDetailedArea(place.value)
    }
    if (place.datatype === 'station') {
      setStation(place.value)
    }
  }

  //キーワード検索後（場所選択）
  const selectEating = async (eating: { datatype: string; label: string; value: string }) => {
    //既に入力されていた内容をリセット
    setGenre('0')
    setDetailedGenre('0')
    setCooking('0')

    //選択中の項目をセット
    if (eating.datatype === 'genre') {
      setGenre(eating.value)
    }
    if (eating.datatype === 'detailed-genre') {
      setDetailedGenre(eating.value)
    }
    if (eating.datatype === 'cooking') {
      setCooking(eating.value)
    }
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
    bgcolor: 'rgba(47, 43, 43, 0.95)',
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
          {searchBox === 'keyword-search' ? (
            <Grid
              container
              item
              spacing={2}
              border='1px solid grey'
              margin='auto'
              paddingBottom={3}
              xs={8}
              sx={{ borderRadius: '5px', boxShadow: 4 }}
              justifyContent='center'
            >
              <Grid item xs={5}>
                <Grid container direction='column'>
                  <Typography marginBottom={1}>場所で絞り込み</Typography>
                  <Select
                    components={animatedComponents}
                    inputValue={inputPlace}
                    onInputChange={changePlace}
                    onChange={selectPlace}
                    options={[
                      {
                        label: '都道府県',
                        options: masterPlaces.prefectures.map((master) => {
                          return {
                            value: master.id,
                            label: master.name,
                            datatype: 'prefecture',
                          }
                        }),
                      },
                      {
                        label: 'エリア',
                        options: masterPlaces.areas.map((master) => {
                          return {
                            value: master.id,
                            label: master.name,
                            datatype: 'area',
                          }
                        }),
                      },
                      {
                        label: '詳細エリア',
                        options: masterPlaces.detailedAreas.map((master) => {
                          return {
                            value: master.id,
                            label: master.name,
                            datatype: 'detailed-area',
                          }
                        }),
                      },
                      {
                        label: '駅名',
                        options: masterPlaces.stations.map((master) => {
                          return {
                            value: master.id,
                            label: master.name,
                            datatype: 'station',
                          }
                        }),
                      },
                    ]}
                  />
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Grid container direction='column'>
                  <Typography marginBottom={1}>場所で絞り込み</Typography>
                  <Select
                    components={animatedComponents}
                    inputValue={inputEating}
                    onInputChange={changeEating}
                    onChange={selectEating}
                    options={[
                      {
                        label: 'ジャンル',
                        options: masterEatings.genres.map((master) => {
                          return {
                            value: master.id,
                            label: master.name,
                            datatype: 'genre',
                          }
                        }),
                      },
                      {
                        label: '詳細ジャンル',
                        options: masterEatings.detailedGenres.map((master) => {
                          return {
                            value: master.id,
                            label: master.name,
                            datatype: 'detailed-genre',
                          }
                        }),
                      },
                      {
                        label: '料理名',
                        options: masterEatings.cookings.map((master) => {
                          return {
                            value: master.id,
                            label: master.name,
                            datatype: 'cooking',
                          }
                        }),
                      },
                    ]}
                  />
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <Grid container justifyContent='center'>
                  <Grid item xs={12}>
                    <Button
                      onClick={() => {
                        reset()
                        setSearchBox('pulldown-search')
                      }}
                    >
                      プルダウン検索
                      <br />
                      に切り替え
                    </Button>
                  </Grid>
                </Grid>
                <Grid container direction='row' alignItems='center'>
                  <Grid item xs={5}>
                    <IconButton onClick={reset}>
                      <RestartAltIcon fontSize='large' />
                    </IconButton>
                  </Grid>
                  <Grid item xs={5}>
                    <IconButton onClick={searchPhotos}>
                      <SearchIcon fontSize='large' />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
          {searchBox === 'pulldown-search' ? (
            <Grid
              container
              spacing={2}
              border='1px solid grey'
              margin='auto'
              paddingBottom={3}
              xs={12}
              sx={{ borderRadius: '5px', boxShadow: 4 }}
            >
              <Grid item xs={4}>
                <Grid container direction='column'>
                  <Typography marginBottom={1}>場所で絞り込み</Typography>
                  <Grid container>
                    <Grid item xs={4}>
                      <InputLabel>都道府県</InputLabel>
                      <MaterialSelect
                        fullWidth
                        label='Prefecture'
                        onChange={changePrefecture}
                        value={prefecture}
                      >
                        {masterPrefectures.map((master) => (
                          <MenuItem value={master.id}>{master.name}</MenuItem>
                        ))}
                      </MaterialSelect>
                    </Grid>
                    <Grid item xs={8}>
                      <Grid container direction='row'>
                        <Grid item xs={6}>
                          <InputLabel>エリア</InputLabel>
                          <MaterialSelect fullWidth label='Area' onChange={changeArea} value={area}>
                            {masterAreas.map((master) => (
                              <MenuItem value={master.id}>{master.name}</MenuItem>
                            ))}
                          </MaterialSelect>
                        </Grid>
                        <Grid item xs={6}>
                          <InputLabel>詳細エリア</InputLabel>
                          <MaterialSelect
                            fullWidth
                            label='DetailedArea'
                            onChange={changeDetailedArea}
                            value={detailedArea}
                          >
                            {masterDetailedAreas.map((master) => (
                              <MenuItem value={master.id}>{master.name}</MenuItem>
                            ))}
                          </MaterialSelect>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Grid container direction='column'>
                  <Typography marginBottom={1}>メニューで絞り込み</Typography>
                  <Grid container>
                    <Grid item xs={4}>
                      <InputLabel>ジャンル</InputLabel>
                      <MaterialSelect fullWidth label='genre' onChange={changeGenre} value={genre}>
                        {masterGenres.map((master) => (
                          <MenuItem value={master.id}>{master.name}</MenuItem>
                        ))}
                      </MaterialSelect>
                    </Grid>
                    <Grid item xs={4}>
                      <InputLabel>詳細ジャンル</InputLabel>
                      <MaterialSelect
                        fullWidth
                        label='detailedGenre'
                        onChange={changeDetailedGenre}
                        value={detailedGenre}
                      >
                        {masterDetailedGenres.map((master) => (
                          <MenuItem value={master.id}>{master.name}</MenuItem>
                        ))}
                      </MaterialSelect>
                    </Grid>
                    <Grid item xs={4}>
                      <InputLabel>料理</InputLabel>
                      <MaterialSelect
                        fullWidth
                        label='cooking'
                        onChange={changeCooking}
                        value={cooking}
                      >
                        {masterCookings.map((master) => (
                          <MenuItem value={master.id}>{master.name}</MenuItem>
                        ))}
                      </MaterialSelect>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <Grid container direction='column'>
                  <Typography marginBottom={1}>予算で絞り込み</Typography>
                  <Grid container>
                    <Grid item xs={6}>
                      <InputLabel>料金下限</InputLabel>
                      <MaterialSelect
                        fullWidth
                        label='lowerPrice'
                        onChange={changeLowerPrice}
                        value={lowerPrice}
                      >
                        {masterPrices.map((master) => (
                          <MenuItem value={master}>{master}</MenuItem>
                        ))}
                      </MaterialSelect>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel>料金上限</InputLabel>
                      <MaterialSelect
                        fullWidth
                        label='upperPrice'
                        onChange={changeUpperPrice}
                        value={upperPrice}
                      >
                        {masterPrices.map((master) => (
                          <MenuItem value={master}>{master}</MenuItem>
                        ))}
                      </MaterialSelect>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}>
                <Grid item xs={10}>
                  <Button
                    onClick={() => {
                      reset()
                      setSearchBox('keyword-search')
                    }}
                  >
                    キーワード検索
                    <br />
                    に切り替え
                  </Button>
                </Grid>
                <Grid container direction='row' item alignItems='center'>
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
          ) : (
            <></>
          )}
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
                  <Grid container direction='column'>
                    <Grid item xs={8}>
                      <div>{modalItem.name}</div>
                      <div>{modalItem.price}円</div>
                    </Grid>
                    <Grid item xs={4}>
                      <Box color='#B3B3B3'>
                        <div>提供店　：{modalItem.shop.name}</div>
                        <div>
                          営業時間：{modalItem.shop.opening_time.substring(0, 5)}〜
                          {modalItem.shop.closing_time.substring(0, 5)}
                        </div>
                        <div>電話番号：{modalItem.shop.tel}</div>
                        <div>最寄り駅：{modalItem.shop.station_name}駅</div>
                        <div>住所　　：{modalItem.shop.address}</div>
                      </Box>
                    </Grid>
                  </Grid>
                </ImageList>
                <Box color='#B3B3B3' marginTop={7}>
                  『{modalItem.shop.name}』の他のメニュー
                </Box>
                <ImageList cols={4}>
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
