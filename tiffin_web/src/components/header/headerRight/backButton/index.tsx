import { Button } from '@mui/material'
import router from 'next/router'

export const BackButton: React.FC = () => {
  const goBack = () => {
    router.back()
  }

  return (
    <Button variant='contained' onClick={goBack}>
      戻る
    </Button>
  )
}
