import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {loadImages} from './gallery-reducer'

let initialState = {
  initialized: false
}
const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALIZATION_SUCCESS':
      return {
        ...state,
        initialized: true
      }
    default:
      return state
  }
}

export const actions = {
  initializationSuccess: () => ({type: 'SN/APP/INITIALIZATION_SUCCESS'} as const)
}

export const initializeApp = (): ThunkType => async (dispatch) =>  {
  dispatch(loadImages())
  dispatch(actions.initializationSuccess())
}

export default appReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>