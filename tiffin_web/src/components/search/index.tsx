import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  EatingSearchByKeywordResponse,
  initEatingSearchByKeywordResponse,
} from 'src/models/api/eating/searchKeyword/response'
import {
  initPlaceSearchByKeywordResponse,
  PlaceSearchByKeywordResponse,
} from 'src/models/api/place/searchKeyword/response'
import { Area } from 'src/models/area'
import { Cooking } from 'src/models/cooking'
import { DetailedArea } from 'src/models/detailedArea'
import { Genre } from 'src/models/genre'
import { Prefecture } from 'src/models/prefecture'
import makeAnimated from 'react-select/animated'
import Axios from 'axios'
import { PrefectureGetResponse } from 'src/models/api/prefecture/get/response'
import { GenreGetResponse } from 'src/models/api/genre/get/response'
import {
  Button,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select as MaterialSelect,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import Select from 'react-select'
import SearchIcon from '@mui/icons-material/Search'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { AreaGetResponse } from 'src/models/api/area/get/response'
import { DetailedAreaGetResponse } from 'src/models/api/detailedArea/get/response'
import { CookingGetResponse } from 'src/models/api/cooking/get/response'
import { PhotoGetResponse } from 'src/models/api/photo/get/response'
import { Photo } from 'src/models/photo'

interface SearchProps {
  setPhotos: Dispatch<SetStateAction<Photo[]>>
}

export const Search: React.FC<SearchProps> = (props) => {
  const [masterPrefectures, setMasterPrefectures] = useState<Prefecture[]>([])
  const [masterAreas, setMasterAreas] = useState<Area[]>([])
  const [masterDetailedAreas, setMasterDetailedAreas] = useState<DetailedArea[]>([])
  const [masterGenres, setMasterGenres] = useState<Genre[]>([])
  const [masterCookings, setMasterCookings] = useState<Cooking[]>([])
  const masterPrices = [500, 1000, 1500, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
  const [masterPlaces, setMasterPlaces] = useState<PlaceSearchByKeywordResponse>(
    initPlaceSearchByKeywordResponse,
  )
  const [masterEatings, setMasterEatings] = useState<EatingSearchByKeywordResponse>(
    initEatingSearchByKeywordResponse,
  )

  const [searchBox, setSearchBox] = useState<'pulldown-search' | 'keyword-search'>('keyword-search')
  const [inputPlace, setInputPlace] = useState<string>('')
  const [inputEating, setInputEating] = useState<string>('')

  const [prefecture, setPrefecture] = useState<string>('0')
  const [area, setArea] = useState<string>('0')
  const [detailedArea, setDetailedArea] = useState<string>('0')
  const [genre, setGenre] = useState<string>('0')
  const [station, setStation] = useState<string>('0')
  const [cooking, setCooking] = useState<string>('0')
  const [lowerPrice, setLowerPrice] = useState<string>('0')
  const [upperPrice, setUpperPrice] = useState<string>('0')

  const animatedComponents = makeAnimated()

  useEffect(() => {
    ;(async () => {
      const prefectureResults = await Axios.get<PrefectureGetResponse[]>('prefectures')
      setMasterPrefectures(prefectureResults.data)
      const genreResults = await Axios.get<GenreGetResponse[]>('genres')
      setMasterGenres(genreResults.data)
    })()
  }, [setMasterPrefectures, setMasterGenres])

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

    //活性状態を変更
    setAreaDisabled(false)
    setDetailedAreaDisabled(true)
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

    //活性状態を変更
    setDetailedAreaDisabled(false)
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

    //料理のリストを設定
    const cookingResults = await Axios.get<CookingGetResponse[]>(`cookings/genre-id/${genreId}`)
    if (cookingResults.status === 404) {
      //料理が存在しない場合はエラーにしない
      setMasterCookings([])
    } else {
      setMasterCookings(cookingResults.data)
    }

    //選び直しの場合は下位要素をリセットする
    setCooking('0')

    //活性状態を変更
    setCookingDisabled(false)
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
  const selectPlace = async (place: any) => {
    //既に入力されていた内容をリセット
    setPrefecture('0')
    setArea('0')
    setDetailedArea('0')
    setStation('0')

    if (place) {
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
  }

  //キーワード検索後（場所選択）
  const selectEating = async (eating: any) => {
    //既に入力されていた内容をリセット
    setGenre('0')
    setCooking('0')

    if (eating) {
      //選択中の項目をセット
      if (eating.datatype === 'genre') {
        setGenre(eating.value)
      }
      if (eating.datatype === 'cooking') {
        setCooking(eating.value)
      }
    }
  }

  const searchPhotos = async () => {
    const photoResults = await Axios.post<PhotoGetResponse[]>(`photos/choice-search`, {
      master_prefecture_id: parseInt(prefecture),
      master_area_id: parseInt(area),
      master_detailed_area_id: parseInt(detailedArea),
      master_railroad_station_id: parseInt(station),
      master_genre_id: parseInt(genre),
      master_cooking_id: parseInt(cooking),
      price_min: parseInt(lowerPrice),
      price_max: parseInt(upperPrice),
    })
    if (photoResults.status === 404) {
      //料理が存在しない場合はエラーにしない
      props.setPhotos([])
    } else {
      props.setPhotos(photoResults.data)
    }
  }

  const reset = () => {
    //マスター系のリセット
    setMasterAreas([])
    setMasterDetailedAreas([])
    setMasterCookings([])
    //選択系のリセット
    setPrefecture('0')
    setArea('0')
    setDetailedArea('0')
    setStation('0')
    setGenre('0')
    setCooking('0')
    setLowerPrice('0')
    setUpperPrice('0')

    //活性状態を変更
    setAreaDisabled(true)
    setDetailedAreaDisabled(true)
    setCookingDisabled(true)
  }

  const [areaDisabled, setAreaDisabled] = useState<boolean>(true)
  const [detailedAreaDisabled, setDetailedAreaDisabled] = useState<boolean>(true)
  const [cookingDisabled, setCookingDisabled] = useState<boolean>(true)

  return (
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
                isClearable={true}
                placeholder='東京都　新宿・代々木・大久保　新宿駅'
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
              <Typography marginBottom={1}>ジャンル、料理名で絞り込み</Typography>
              <Select
                components={animatedComponents}
                inputValue={inputEating}
                isClearable={true}
                placeholder='和食　焼肉　親子丼'
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
              <Grid item xs={2}></Grid>
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
          <Grid item xs={5}>
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
                      <MaterialSelect
                        fullWidth
                        label='Area'
                        onChange={changeArea}
                        value={area}
                        disabled={areaDisabled}
                      >
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
                        disabled={detailedAreaDisabled}
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
          <Grid item xs={4}>
            <Grid container direction='column'>
              <Typography marginBottom={1}>メニューで絞り込み</Typography>
              <Grid container>
                <Grid item xs={6}>
                  <InputLabel>ジャンル</InputLabel>
                  <MaterialSelect fullWidth label='genre' onChange={changeGenre} value={genre}>
                    {masterGenres.map((master) => (
                      <MenuItem value={master.id}>{master.name}</MenuItem>
                    ))}
                  </MaterialSelect>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>料理</InputLabel>
                  <MaterialSelect
                    fullWidth
                    label='cooking'
                    onChange={changeCooking}
                    value={cooking}
                    disabled={cookingDisabled}
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
    </>
  )
}

export default Search
