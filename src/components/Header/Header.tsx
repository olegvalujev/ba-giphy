import React from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/TESTHY.svg'
import { Button } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {useDispatch} from 'react-redux'
import {loadTrendingImages} from '../../redux/gallery-reducer'

export const Header = () => {
  const dispatch = useDispatch()

  const onShuffleClick = (event: any) => {
    dispatch(loadTrendingImages())
  }

  return <header className={styles.header}>
    <div className={styles.logo}>
      <img src={logo} alt={''}/>
    </div>
    <div className={styles.shuffle}>
      <InfoOutlinedIcon style={{fill: 'rgb(99, 100, 101)', paddingRight: '10px'}}/>
      <span className={styles.info}>Press <span className={styles.spaceBar}>spacebar</span> for shuffle or</span>
      <Button variant="contained" color="primary" size="small" onClick={onShuffleClick}>Click here</Button>
    </div>
  </header>
}