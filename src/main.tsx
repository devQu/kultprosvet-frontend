// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
// import { applyMiddleware } from 'redux'
// import { thunk } from 'redux-thunk'
import { configureStore, Reducer } from '@reduxjs/toolkit'
import { articlesReducer } from './store/reducer/articlesReducer.ts'
import 'semantic-ui-css/semantic.min.css'
import { authReducer } from './store/reducer/authReducer.ts'
import { logger } from './store/middlewares/logger.ts'

const store = configureStore({
  reducer: {
    articlesReducer: articlesReducer as Reducer,
    authReducer: authReducer as Reducer
  }, middleware: (gDM) => gDM().concat(logger)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
) 
