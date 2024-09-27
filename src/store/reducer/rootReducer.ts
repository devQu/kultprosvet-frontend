import { combineReducers } from "redux"
import { articlesReducer } from "./articlesReducer"
import { authReducer } from "./authReducer"

const rootReducer = combineReducers({ articlesReducer, authReducer })
export default rootReducer

type CombineReducersType = typeof rootReducer
export type AppStateType = ReturnType<CombineReducersType>