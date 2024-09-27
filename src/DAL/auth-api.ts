import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export interface SignUpInterface {
    email: string,
    password: string
}

export interface AuthInterface {
    user: {
        userId: string, 
        email: string
    }
}

interface ErrorResponseInterface {
    response?: string,
    request?: string,
    message?: string
}

export interface AuthResponseInterface {
    code: number,
    status: string,
    data?: AuthInterface | null
    error?: ErrorResponseInterface | null
}

const $instance = axios.create({
    baseURL: import.meta.env.VITE_LOCAL_URL,
    withCredentials: true
})

$instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    // request.headers.Authorization = `Bearer `
    // request.headers.Accept = "application/json"
    // request.headers["Content-Type"] = "application/json; charset=utf-8"
    // request.headers["Access-Control-Allow-Origin"] = "*"

    request.headers.set({
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
    });
    console.warn(`REQUEST to ${request.baseURL + '/' + request.url}`)

    return request
}, error => {
    console.error(`REQUEST --> error : ${error.request.data.message + ` - ` + error.request.data.statusCode}`)
})

$instance.interceptors.response.use((response) => {
    console.warn(`RESPONSE from ${response.config.baseURL + '/' + response.config.url} data : `)
    console.dir(response.data)
    localStorage.setItem("session_id", JSON.stringify(response.data.user.userId))
    localStorage.setItem("session_user_email", JSON.stringify(response.data.user.email))
    return response
}, async (error) => {
    console.error(`RESPONSE --> error : ${error.response.data.error.message + ` - ` + error.response.data.code}`)
    console.dir(error.response.data)
    /** Status code by default */
    let statusCode: number = 500
    if (error.response && error.response.data.code) {
        statusCode = error.response.data.code
    }
    // Unauthorized
    if (statusCode === 401) {
        console.error("RESPONSE --> (401) any action to implemate... !")
        window.location.href = '/auth'
    }
    return Promise.reject(error)
})
    
export const signIn = async (data: SignUpInterface): Promise<AuthResponseInterface> => 
    await $instance.post<AuthResponseInterface>(
        "/auth/signin", 
        { email: data.email, password: data.password })
        .then((res: AxiosResponse) => {
            return {
                code: res.status, 
                status: res.statusText,
                data: res.data,
                error: null
            }
        })
        .catch(err => {
            return {
                code: err.status, 
                status: err.statusText,
                error: {
                    response: err.response,
                    request: err.request,
                    message: err.message
                },
                data: null
            }
        })
        
export const signUp = async (data: SignUpInterface): Promise<AuthResponseInterface> =>
    await $instance.post<AuthResponseInterface>(
        "/auth/signup", 
        { email: data.email, password: data.password })
        .then((res: AxiosResponse) => {
            return {
                code: res.status, 
                status: res.statusText,
                data: res.data,
                error: null
            }
        })
        .catch(err => {
            return {
                code: err.status, 
                status: err.statusText,
                error: {
                    response: err.response,
                    request: err.request,
                    message: err.message
                },
                data: null
            }
        })

export const refreshToken = async (): Promise<AuthResponseInterface> =>
    await $instance.post<AuthResponseInterface>(
        "/auth/refresh")
        .then((res: AxiosResponse) => {
            return {
                code: res.status, 
                status: res.statusText,
                data: res.data,
                error: null
            }
        })
        .catch(err => {
            return {
                code: err.status, 
                status: err.statusText,
                error: {
                    response: err.response,
                    request: err.request,
                    message: err.message
                },
                data: null
            }
        })

export const logout = async (): Promise<AuthResponseInterface> =>
    await $instance.post<AuthResponseInterface>(
        "/auth/logout")
        .then((res: AxiosResponse) => {
            return {
                code: res.status, 
                status: res.statusText,
                data: res.data,
                error: null
            }
        })
        .catch(err => {
            return {
                code: err.status, 
                status: err.statusText,
                error: {
                    response: err.response,
                    request: err.request,
                    message: err.message
                },
                data: null
            }
        })

