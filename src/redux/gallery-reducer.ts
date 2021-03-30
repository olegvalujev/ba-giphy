import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {giphyAPI, ResponseDataType} from '../api/api'

let initialState = {
  images: [] as ResponseDataType[]
}
const galleryReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/APP/LOAD_IMAGES':
      let lockedImages = state.images.filter(i => i.locked)
      let filteredImages = action.payload.images.filter(i => lockedImages.filter(im => im.id === i.id).length === 0)
      if (filteredImages.length === 0) filteredImages = action.payload.images

      return {
        ...state,
        images: [...lockedImages,...filteredImages]
      }
    case 'SN/APP/TOGGLE_IMAGE_LOCK':
      const processedImages = state.images.map(i => {
        if (i.id === action.payload.image.id) {
          i.locked = !i.locked
        }
        return i
      })
      return {
        ...state,
        images: [...processedImages]
      }
    default:
      return state
  }
}

export const actions = {
  loadImages: (images: ResponseDataType[]) => ({type: 'SN/APP/LOAD_IMAGES', payload: {images}} as const),
  toggleImageLock: (image: ResponseDataType) => ({type: 'SN/APP/TOGGLE_IMAGE_LOCK', payload: {image}} as const)
}

export const loadImages = (): ThunkType => async (dispatch) =>  {
  giphyAPI.searchGifs('funny').then(res => {
    dispatch(actions.loadImages(res.data.data))
  })
}

export const loadTrendingImages = (limit: number = 12): ThunkType => async (dispatch) =>  {
  giphyAPI.getTrending(limit).then(res => {
    dispatch(actions.loadImages(res.data.data))
  })
}

export default galleryReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>