import { GET_ARTICLES, ADD_ARTICLE, DELETE_ARTICLE } from "../actions/actionTypes";
import { ArticlesActionsTypes } from "../actions/articlesActions";

export type ArticleType = {
    id?: number,
    title: string,
    description: string,
    content: string,
    published?: boolean,
    logo?: string,
    link: string,
    createdAt: Date
}

type InitialStateType = {
    articles: ArticleType[] | null
}

const initialState: InitialStateType = {
    articles: null
}

export const articlesReducer = (state = initialState, action: ArticlesActionsTypes) => {
    switch (action.type) {
        case GET_ARTICLES: return {...state, articles: action.articles}
        case ADD_ARTICLE: return {...state, articles: (state.articles != null) ? [...state.articles, action.article] : [action.article]}
        case DELETE_ARTICLE: return {...state, articles: (state.articles != null) ? state.articles.filter((article) => action.id !== article.id) : state.articles}
        default: return state
    }
}
// (state: InitialStateType | undefined, action: { readonly type: "GET_TASKS"; readonly tasks: TaskType[]; }) => InitialStateType
// Reducer<InitialStateType, UnknownAction, InitialStateType>