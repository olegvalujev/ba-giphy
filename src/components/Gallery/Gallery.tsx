import React, {useEffect} from 'react'
import {ResponseDataType} from '../../api/api'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'
import styles from './Gallery.module.scss'
import {actions} from '../../redux/gallery-reducer'
import {LockOpenOutlined, LockOutlined} from '@material-ui/icons'

export const Gallery: React.FC = () => {
  const images = useSelector((state: AppStateType) => state.gallery.images)

  useEffect(() => {
    console.log(images)
  }, [images])
  return <div className={styles.gallery}>
    {images.map(image => <Image key={image.id} image={image}/>)}
  </div>
}

const Image: React.FC<{ image: ResponseDataType }> = ({image}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('image ' + image.locked)
  }, [image])

  const handleOnClick = (event: any) => {
    dispatch(actions.toggleImageLock(image))
  }

  console.log(styles.image,styles.locked)
  return <div className={styles.image+ ' '+ (image.locked ? styles.locked : '')} onClick={handleOnClick}>
    <img src={image.images.original.url} alt={''}/>
    {image.locked && <div className={styles.unlock}>
      <LockOpenOutlined style={{fill: 'white', paddingRight: '10px'}}/> <span className={styles.lockText}> click to unlock</span>
    </div>}
    {!image.locked && <div className={styles.lock}>
      <LockOutlined style={{fill: 'white', paddingRight: '10px'}}/> <span className={styles.lockText}> click to lock</span>
    </div>}
  </div>
}