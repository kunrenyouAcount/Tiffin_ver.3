import Axios from 'axios'
import { AppProps } from 'next/app'
import React from 'react'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  Axios.defaults.baseURL = 'http://localhost:4000/api/'
  //許容するステータスコードを設定
  Axios.defaults.validateStatus = (status) =>
    (status >= 200 && status < 300) ||
    status == 400 ||
    status == 401 ||
    status == 404 ||
    status == 422

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
