import React, {useEffect} from 'react'
import {ResponseDataType} from '../../api/api'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'
import styles from './Gallery.module.scss'

export const Gallery: React.FC = () => {
  const images = useSelector((state: AppStateType) => state.gallery.images)

  useEffect(() => {
    console.log(images)
  }, [images])
  return <div>
    {images.map(image => <Image key={image.id} image={image}/>)}
  </div>
}

const Image: React.FC<{ image: ResponseDataType }> = ({image}) => {
  return <div className={styles.image}>
    <img src={image.images.original.url} alt={''}/>
  </div>
}