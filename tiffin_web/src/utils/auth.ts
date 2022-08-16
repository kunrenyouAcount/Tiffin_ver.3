export const tiffin_token_key = 'tiffin_token'

type arrType = {
  [key: string]: string
}

const getCookieValue = (key: string) => {
  const arr: arrType = {}
  if (process.browser) {
    if (document.cookie != '') {
      const tmp = document.cookie.split('; ')
      for (let i = 0; i < tmp.length; i++) {
        const data = tmp[i].split('=')
        arr[data[0]] = decodeURIComponent(data[1])
      }
    }
    if (key in arr) {
      return arr[key]
    }
  }
  return ''
}

export const getTiffinToken = (): string => {
  return getCookieValue(tiffin_token_key)
}

export const isLogin = (): boolean => {
  if (getTiffinToken() === '') {
    return false
  }
  return true
}
