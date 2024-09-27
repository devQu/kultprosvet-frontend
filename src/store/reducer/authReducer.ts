import { DELETE_USER_INFO_FROM_LOCAL_STORAGE, SAVE_AUTH_SUCCESS, SAVE_USER_INFO_IN_LOCAL_STORAGE, SAVE_USERINFO, SET_AUTH_LOADING } from "../actions/actionTypes"
import { AuthActionsTypes } from "../actions/authActions"

// export type ArticlesType = Array<any> | null

type InitialStateType = {
    userEmail?: string | undefined,
    userId?: string | undefined
    errorMessage?: string | undefined,
    isLoading?: boolean,
    isAuthorized: boolean
}

const initialState: InitialStateType = {
    userEmail: undefined,
    userId: undefined,
    errorMessage: undefined,
    isLoading: false,
    isAuthorized: false
}
export type AuthReducerType = typeof authReducer
export const authReducer = (state = initialState, action: AuthActionsTypes) => {
    switch(action.type) {
        case SAVE_USERINFO: return {...state, userEmail: action.data.email, userId: action.data.userId, isLoading: !state.isLoading}
        case SAVE_AUTH_SUCCESS: return {...state, isAuthorized: true}
        case SET_AUTH_LOADING: return {...state, isLoading: !state.isLoading}
        case SAVE_USER_INFO_IN_LOCAL_STORAGE: return {...state, userEmail: action.data.userEmail, userId: action.data.userId, isAuthorized: true }
        case DELETE_USER_INFO_FROM_LOCAL_STORAGE: return {...state, userEmail: undefined, userId: undefined, isAuthorized: false}
        default: return state
    }
}