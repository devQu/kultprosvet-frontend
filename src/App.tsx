import React from 'react'
import './assets/css/output.css'
import Layout from './components/UI/Layout'
import { BrowserRouter } from 'react-router-dom'

export type ArticleType = {
  id: number
  title: string
  isDone: boolean
}

export type ArticlesType = ArticleType[]

const App: React.FC = () => {  

  return (
    <BrowserRouter basename="/">
      <Layout/>
    </BrowserRouter>
  )
}

export default App
