import { ThunkAction } from "redux-thunk"
import { AuthResponseInterface, logout, signIn, signUp, SignUpInterface } from "../../DAL/auth-api"

import { AppStateType } from "../reducer/rootReducer";
import { SAVE_AUTH_SUCCESS, SAVE_TOKEN, SAVE_USERINFO, SET_AUTH_LOADING, SAVE_USER_INFO_IN_LOCAL_STORAGE, DELETE_USER_INFO_FROM_LOCAL_STORAGE } from "./actionTypes"

// Action creator return type
export type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
export type AuthActionsTypes = ReturnType<PropertiesType<typeof actions>>

export type SignupAuthType = typeof signup
export const signup = (formData: SignUpInterface): ThunkAction<Promise<AuthResponseInterface>, AppStateType, unknown, AuthActionsTypes> => 
    async dispatch => {
        dispatch(actions.setLoading())
        console.log('############ action in dispatch signup ############')
        const response: AuthResponseInterface = await signUp(formData)
        if (response) {
            console.dir(response)
            if (response.data) {
                const data = response.data
                dispatch(actions.saveUserInfo(data.user))
                return response
            } 
            return response
            
        } else {
            dispatch(actions.setLoading())
            return response
        }
    }

export type SigninAuthType = typeof signin
export const signin = (formData: SignUpInterface): ThunkAction<Promise<AuthResponseInterface>, AppStateType, unknown, AuthActionsTypes> => 
    async dispatch => {
        dispatch(actions.setLoading())
        console.log('############ action in dispatch signin ############')
        const response: AuthResponseInterface = await signIn(formData)
        if (response) {
            console.dir(response)
            if (response.data) {
                const data = response.data
                dispatch(actions.saveUserInfo(data.user))
                dispatch(actions.setAuthSuccess())
                return response
            } 
            return response
            
        } else {
            dispatch(actions.setLoading())
            return response
        }
    }

export type GetUserInfoFromLocalStorageType = typeof getUserInfoFromLocalStorage
export const getUserInfoFromLocalStorage = (): ThunkAction<void, AppStateType, unknown, AuthActionsTypes> => 
    dispatch => {
        console.log('############ authActions ############ dispatch ----> getUserInfoFromLocalStorage()')
        const emailFromStor = localStorage.getItem("session_user_email")
        const userIdFromStor = localStorage.getItem("session_id")
        /** Set data from local storage to state */
        dispatch(actions.setUserInfoToLocalStorage({
            userEmail: emailFromStor ? JSON.parse(emailFromStor) : undefined, 
            userId: userIdFromStor ? JSON.parse(userIdFromStor) : undefined
        }))
    }

export type LogoutUserAndRemoveUserInfoFromLocalStorageType = typeof logoutUserAndRemoveUserInfoFromLocalStorage
export const logoutUserAndRemoveUserInfoFromLocalStorage = (): ThunkAction<Promise<AuthResponseInterface>, AppStateType, unknown, AuthActionsTypes> => 
    async dispatch => {
        console.log('############ authActions ############ dispatch ----> logoutUserAndRemoveUserInfoFromLocalStorage()')
        const response = await logout()
        /** Delete data from local storage */
        localStorage.setItem("session_id", '')
        localStorage.setItem("session_user_email", '')
        /** Delete data from state */
        dispatch(actions.removeUserInfoFromLocalStorage())
        return response
    }

export const actions = {
    saveToken: (data: string) => ({ type: SAVE_TOKEN, token: data } as const),
    saveUserInfo: (data: {email: string, userId: string}) => ({ type: SAVE_USERINFO, data } as const),
    setAuthSuccess: () => ({ type: SAVE_AUTH_SUCCESS } as const),
    setLoading: () => ({ type: SET_AUTH_LOADING } as const),
    setUserInfoToLocalStorage: (data: { userId: string, userEmail: string }) => ({ type: SAVE_USER_INFO_IN_LOCAL_STORAGE, data } as const),
    removeUserInfoFromLocalStorage: () => ({ type: DELETE_USER_INFO_FROM_LOCAL_STORAGE } as const),
} 
