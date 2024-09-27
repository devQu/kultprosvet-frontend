import { ThunkAction } from "redux-thunk";
import { createOneArticle, getAllArticles, removeArticleById } from "../../DAL/todolist-api"
import { GET_ARTICLES, ADD_ARTICLE, DELETE_ARTICLE } from "./actionTypes";
// import { RootState } from "@reduxjs/toolkit/query";
import { ArticleType } from "../reducer/articlesReducer";
import { AppStateType } from "../reducer/rootReducer";

// Action creator return type
export type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
export type ArticlesActionsTypes = ReturnType<PropertiesType<typeof actions>>
export type getTodolistType = typeof getAllTasks

export const getAllTasks = (): ThunkAction<void, AppStateType, unknown, ArticlesActionsTypes> => 
    async (dispatch) => {
        const response = await getAllArticles()
        if (response) {
            const data = response.data;
            dispatch(actions.getTasks(data))
        }
    }

export const createNewArticle = (article: ArticleType): ThunkAction<void, AppStateType, unknown, ArticlesActionsTypes> => 
    async (dispatch) => {
        const response = await createOneArticle(article)
        if (response) {
            const data = response.data;
            dispatch(actions.addArticle(data))
        }
    }

export const deleteArticleById = (id: number): ThunkAction<void, AppStateType, unknown, ArticlesActionsTypes> => 
    async (dispatch) => {
        const response = await removeArticleById(id)
        if (response) {
            const id = response.data;
            dispatch(actions.deleteArticle(id))
        }
    }

export const actions = {
    getTasks: (data: ArticleType[]) => ({type: GET_ARTICLES, articles: data} as const),
    addArticle: (data: ArticleType) => ({type: ADD_ARTICLE, article: data} as const),
    deleteArticle: (id: number) => ({type: DELETE_ARTICLE, id} as const),
}