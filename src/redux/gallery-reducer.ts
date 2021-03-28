import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {giphyAPI, ResponseDataType} from '../api/api'

let initialState = {
  images: [] as ResponseDataType[]
}
const galleryReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/APP/LOAD_IMAGES':
      return {
        ...state,
        images: [...state.images.filter(i => i.locked), ...action.payload.images]
      }
    default:
      return state
  }
}

export const actions = {
  loadImages: (images: ResponseDataType[]) => ({type: 'SN/APP/LOAD_IMAGES', payload: {images}} as const)
}

export const loadImages = (): ThunkType => async (dispatch) =>  {
  giphyAPI.searchGifs('funny').then(res => {
    console.log(res.data)
    dispatch(actions.loadImages(res.data.data))
  })
}

export default galleryReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>