import './App.css'
import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {initializeApp} from './redux/app-reducer'
import {Gallery} from './components/Gallery/Gallery'

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  return <Gallery/>

}

export default App
