import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {GifType, giphyAPI} from '../api/api'

let initialState = {
  images: [] as GifType[],
  offset: 0 as number
}
const galleryReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/APP/LOAD_IMAGES':
      let lockedImages = state.images.filter(i => i.locked)
      let filteredImages = action.payload.images.filter(i => lockedImages.filter(im => im.id === i.id).length === 0)
      if (filteredImages.length === 0) filteredImages = action.payload.images
      let sorted = [...lockedImages, ...filteredImages].sort((a, b) => Date.parse(a.import_datetime) - Date.parse(b.import_datetime))
      let takenPlacements: number[] = []

      sorted.map((i) => {
        if (i.order_index !== undefined) takenPlacements.push(i.order_index)
        return i
      })

      const getPlacement = () => {
        for (let i = 1; i <= sorted.length + 1; i++) {
          if (!takenPlacements.includes(i)) return i
        }
        return undefined
      }

      sorted.map((i, index) => {
        if (i.order_index === undefined) {
          const placement = getPlacement()
          if (placement) {
            i.order_index = placement
            takenPlacements.push(placement)
          }
        }
        return i
      })
      return {
        ...state,
        images: [...sorted]
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
    case 'SN/APP/SET_TRENDING_OFFSET':
      return {
        ...state,
        offset: state.offset + action.payload.offset
      }
    default:
      return state
  }
}

export const actions = {
  loadImages: (images: GifType[]) => ({type: 'SN/APP/LOAD_IMAGES', payload: {images}} as const),
  toggleImageLock: (image: GifType) => ({type: 'SN/APP/TOGGLE_IMAGE_LOCK', payload: {image}} as const),
  increaseTrendingOffset: (offset: number) => ({type: 'SN/APP/SET_TRENDING_OFFSET', payload: {offset}} as const)
}

export const loadImages = (): ThunkType => async (dispatch) => {
  giphyAPI.searchGifs('funny').then(res => {
    dispatch(actions.loadImages(res.data.data))
  })
}

export const loadTrendingImages = (limit: number | null = 12, offset: number | null = 0): ThunkType => async (dispatch) => {
  giphyAPI.getTrending(limit, offset).then(res => {
    dispatch(actions.loadImages(res.data.data))
  })
}

export default galleryReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>