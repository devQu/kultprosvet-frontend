// import axios, { AxiosResponse } from 'axios';
import { ArticleType } from "../store/reducer/articlesReducer"
import axios from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { AuthResponseInterface, refreshToken } from "./auth-api";

interface ArticleResponse {
    data: ArticleType[] 
}

const $instance = axios.create({
    baseURL: import.meta.env.VITE_LOCAL_URL,
    withCredentials: true
})

$instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    request.headers.Accept = "application/json"
    request.headers["Content-Type"] = "application/json; charset=utf-8"
    request.headers["Access-Control-Allow-Origin"] = "*"

    // request.headers.set({
    //     Accept: "application/json",
    //     "Content-Type": "application/json; charset=utf-8",
    //     "Access-Control-Allow-Origin": "*"
    // });
    console.warn(`REQUEST to ${request.baseURL + '/' + request.url}`)

    return request
}, error => {
    console.error(`REQUEST --> error : ${error.request.data.message + ` - ` + error.request.data.statusCode}`)
})

$instance.interceptors.response.use((response) => {
    console.warn(`RESPONSE from ${response.config.baseURL + '/' + response.config.url} data : `)
    console.dir(response.data)
    return response
}, async (error) => {
    console.error(`RESPONSE --> error : ${error.response.data.message + ` - ` + error.response.data.statusCode}`)
    const statusCode = (error.response) ? error.response.data.statusCode : null
    // Unauthorized
    if (statusCode === 401) {
        localStorage.setItem("session_id", '')
        localStorage.setItem("session_user_email", '')
        // window.location.href = '/';
        const response: AuthResponseInterface = await refreshToken()
        console.warn(`RESPONSE from refreshToken : `)
        console.dir(response)
        if (response.status === 'OK' && response.data) {
            localStorage.setItem("session_id", JSON.stringify(response.data.user.userId));
            localStorage.setItem("session_user_email", JSON.stringify(response.data.user.email));

            console.warn(`RESPONSE (II) to ${error.config.baseURL}/${error.config.url}`)
            return axios.request(error.config) //Promise.reject(error)
        } else {
            return Promise.reject(error)
        }
    }
})
    
export const getAllArticles = async (): Promise<AxiosResponse<ArticleType[], unknown>> => 
    await $instance.get<ArticleResponse>("articles")
        .then(res => res)
        .catch(err => err)

export const createOneArticle = async (article: ArticleType): Promise<AxiosResponse<ArticleType, unknown>> =>
    await $instance.post<ArticleResponse>(
        "/articles", 
        {
            title: article.title, 
            description: article.description,
            content: article.content,
            link: article.link
        })
        .then(res => res)
        .catch(err => err)

export const removeArticleById = (id: number): Promise<{ok: boolean, code: number, data: number}> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ok: true, code: 200, data: id})
        }, 100)
    })
}
