import { ImageList, ImageListItem } from '@mui/material'
import { Photo } from 'src/models/photo'
import styles from 'src/components/photoList/styles.module.css'

interface PhotoListProps {
  photos: Photo[]
  handleOpen: (menuId: number) => Promise<void>
}

export const PhotoList: React.FC<PhotoListProps> = (props) => {
  return (
    <ImageList cols={5}>
      {props.photos.map((photo) => (
        <ImageListItem key={photo.id}>
          <img
            src={`${photo.path}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${photo.path}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            className={styles.img_wrap}
            loading='lazy'
            onClick={() => {
              props.handleOpen(photo.menu_id)
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default PhotoList
