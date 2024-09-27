import { Dispatch, Middleware, UnknownAction } from "redux"
import { AppStateType } from "../reducer/rootReducer"
import { actions } from "../actions/authActions"

type ActionType = {
    type: string
}

/**
 * Logs all actions and states after they are dispatched.
 */
export const logger: Middleware<object, AppStateType, Dispatch<UnknownAction>> = (api) => (next) => (action) => {
    console.group((action as ActionType).type)
    console.info('dispatching', action)
    const result = next(action)
    console.log('next state', api.getState()) 
  
    const emailFromStor = localStorage.getItem("session_user_email")
    const userIdFromStor = localStorage.getItem("session_id")
    console.log(emailFromStor)
    console.log(userIdFromStor)
    if ((!api.getState().authReducer.userEmail || !api.getState().authReducer.userId) 
      && emailFromStor 
      && userIdFromStor 
      && (action as ActionType).type !== 'DELETE_USER_INFO_FROM_LOCAL_STORAGE') {
        api.dispatch(actions.setUserInfoToLocalStorage({
          userEmail: JSON.parse(emailFromStor), 
          userId: JSON.parse(userIdFromStor)
        }))
    }
  
    console.groupEnd()
    return result
  }