import React, {useEffect} from 'react'
import {GifType} from '../../api/api'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'
import styles from './Gallery.module.scss'
import {actions, loadTrendingImages} from '../../redux/gallery-reducer'
import {LockOpenOutlined, LockOutlined} from '@material-ui/icons'

export const Gallery: React.FC = React.memo(() => {
  const images = useSelector((state: AppStateType) => state.gallery.images)
  const offset = useSelector((state: AppStateType) => state.gallery.offset)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTrendingImages(12, offset))
  }, [offset])

  useEffect(() => {
    window.document.addEventListener('keydown', keyHandler)
    return () => {
      window.document.removeEventListener('keydown', keyHandler)
    }
  }, [])

  const keyHandler = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      dispatch(actions.increaseTrendingOffset(12))
      event.preventDefault()
    }
  }

  return <div className={styles.gallery}>
    {images.map(image => <Image key={image.id} image={image}/>)}
  </div>
})

const Image: React.FC<{ image: GifType }> = ({image}) => {
  const dispatch = useDispatch()

  const handleOnClick = (event: any) => {
    dispatch(actions.toggleImageLock(image))
  }

  return <div className={styles.image + ' ' + (image.locked ? styles.locked : '')} style={{order: image.order_index}}
              onClick={handleOnClick}>
    <img src={image.images.original.url} alt={``} title={`${image.order_index}`}/>
    {image.locked && <div className={styles.unlock}>
      <LockOpenOutlined style={{fill: 'white', paddingRight: '10px'}}/> <span className={styles.lockText}> click to unlock</span>
    </div>}
    {!image.locked && <div className={styles.lock}>
      <LockOutlined style={{fill: 'white', paddingRight: '10px'}}/> <span
      className={styles.lockText}> click to lock</span>
    </div>}
  </div>
}