import Axios from 'axios'
import { AppProps } from 'next/app'
import React from 'react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { getTiffinToken } from 'src/utils/auth'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // AxiosのデフォルトURLの設定
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  //許容するステータスコードを設定
  Axios.defaults.validateStatus = (status) =>
    (status >= 200 && status < 300) ||
    status == 400 ||
    status == 401 ||
    status == 404 ||
    status == 422

  // Axiosのリクエストインターセプター（ミドルウェアの役割）
  Axios.interceptors.request.use(
    (config: any) => {
      const token = getTiffinToken()
      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
