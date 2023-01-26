import Axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import { MenuModalItemResponse } from 'src/models/api/menu/getModalItem/response'
import Modal from '@mui/material/Modal'
import { Box, Grid, ImageList, ImageListItem } from '@mui/material'
import styles from 'src/components/menuModal/styles.module.css'

interface MenuModalProps {
  modalItem: MenuModalItemResponse
  setModalItem: Dispatch<SetStateAction<MenuModalItemResponse>>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  handleOpen: (menuId: number) => Promise<void>
  handleClose: () => void
}

export const MenuModal: React.FC<MenuModalProps> = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className={styles.modal}>
        <ImageList>
          <ImageListItem>
            <img
              src={`${props.modalItem.photo_path}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${props.modalItem.photo_path}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              loading='lazy'
            />
          </ImageListItem>
          <Grid container direction='column'>
            <Grid item xs={8}>
              <div>{props.modalItem.name}</div>
              <div>{props.modalItem.price}円</div>
            </Grid>
            <Grid item xs={4}>
              <Box color='#B3B3B3'>
                <div>提供店　：{props.modalItem.shop.name}</div>
                <div>
                  営業時間：{props.modalItem.shop.opening_time.substring(0, 5)}〜
                  {props.modalItem.shop.closing_time.substring(0, 5)}
                </div>
                <div>電話番号：{props.modalItem.shop.tel}</div>
                <div>最寄り駅：{props.modalItem.shop.station_name}駅</div>
                <div>住所　　：{props.modalItem.shop.address}</div>
              </Box>
            </Grid>
          </Grid>
        </ImageList>
        <Box color='#B3B3B3' marginTop={7}>
          『{props.modalItem.shop.name}』の他のメニュー
        </Box>
        <ImageList cols={4}>
          {props.modalItem.other_menus
            .map((menu) => (
              <ImageListItem key={menu.id}>
                <img
                  src={`${menu.photo_path}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${menu.photo_path}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  loading='lazy'
                  className={styles.img_wrap}
                  onClick={() => {
                    props.handleOpen(menu.id)
                  }}
                />
              </ImageListItem>
            ))
            .slice(0, 4)}
        </ImageList>
      </Box>
    </Modal>
  )
}

export default MenuModal
