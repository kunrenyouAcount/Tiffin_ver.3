import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { useEffect, useState } from 'react'
import { Logo } from './logo'
import { isLogin } from 'src/utils/auth'
import { useRouter } from 'next/router'

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string
    url: string
  }>
  title: string
}

const Header: React.FC<HeaderProps> = (props) => {
  const [isLoginStatus, setIsLoginStatus] = useState<boolean>(false)
  useEffect(() => {
    ;(async () => {
      setIsLoginStatus(isLogin())
    })()
  }, [setIsLoginStatus])
  const { sections, title } = props
  const router = useRouter()
  const pushSignout = () => {
    setIsLoginStatus(false)
    document.cookie = `tiffin_token=; max-age=0`
    router.push('/')
  }

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Logo />
        <Typography
          component='h2'
          variant='h5'
          color='inherit'
          align='center'
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        {isLoginStatus ? (
          <Button variant='outlined' size='small' onClick={pushSignout}>
            signout{' '}
          </Button>
        ) : (
          <>
            <Button
              variant='contained'
              size='small'
              onClick={() => {
                router.push('/signin')
              }}
            >
              Sign in
            </Button>
            <Button
              variant='outlined'
              size='small'
              onClick={() => {
                router.push('/signup')
              }}
            >
              Sign up
            </Button>
          </>
        )}
      </Toolbar>
      <Toolbar
        component='nav'
        variant='dense'
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color='inherit'
            noWrap
            key={section.title}
            variant='body2'
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  )
}

export default Header
