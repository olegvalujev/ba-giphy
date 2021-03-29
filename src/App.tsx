import style from './App.module.scss'
import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {initializeApp} from './redux/app-reducer'
import {Gallery} from './components/Gallery/Gallery'
import {Header} from './components/Header/Header'

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  return <div className={style.container}>
    <Header/>
    <Gallery/>
  </div>
}

export default App
