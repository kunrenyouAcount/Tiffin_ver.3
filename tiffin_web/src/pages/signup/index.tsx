import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Axios from 'axios'
import router from 'next/router'
import { useEffect, useState } from 'react'
import { Prefecture } from 'src/models/Prefecture'

function Copyright(props: any) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='/'>
        Tiffin
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export const Signup: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  useEffect(() => {
    ;(async () => {
      const results = await Axios.get<Prefecture[]>('prefectures')
      setPrefectures(results.data)
    })()
  }, [setPrefectures])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const password = data.get('password')
    const confirmPassword = data.get('confirm-password')
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    const response = await Axios.post<void>('auth/signup', {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      master_prefecture_id: parseInt(data.get('prefecture') as string),
    })
    if (response.status == 200) {
      router.push('/')
    } else {
      alert('failed')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/images/auth/backgroundImage.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='name'
                    label='Name'
                    name='name'
                    autoComplete='name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='confirm-password'
                    label='Confirm Password'
                    type='password'
                    id='confirm-password'
                    autoComplete='new-password'
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl required fullWidth>
                    <InputLabel id='prefecture'>Prefecture</InputLabel>
                    <Select
                      labelId='prefecture'
                      id='prefecture'
                      label='prefecture'
                      name='prefecture'
                    >
                      {prefectures.map((prefecture) => {
                        return (
                          <MenuItem value={prefecture.id} key={prefecture.id}>
                            {prefecture.name}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href='/signin' variant='body2'>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Signup
