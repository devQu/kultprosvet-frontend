import { ArticleLayoutElement } from "./ArticleLayoutElement/ArticleLayoutElement";
import { connect, Matching } from "react-redux";
import { getAllTasks } from "../store/actions/articlesActions";
import { AppStateType } from "../store/reducer/rootReducer";
import React, { ComponentType, useCallback, useEffect, useState } from "react";
import { ArticleType } from "../store/reducer/articlesReducer";
import { Box, Button, Grid } from "@mui/material";
import { Loader } from "semantic-ui-react";

type GetAllTasksType = () => void
type ArticlesType = ArticleType[] | null

type PropTypes = {
    articles: ArticlesType,
    getAllTasks: GetAllTasksType
}

const RecentPosts: ComponentType<Matching<{ articles: ArticlesType; } & { getAllTasks: GetAllTasksType; }, PropTypes>> = ({ articles, getAllTasks }) => {

    const [isLoading, setIsLoading] = useState(false)

    const getTasks = useCallback(() => {
        try {
            console.log("############ RecentPosts ############ getAllTasks()")
            getAllTasks()
        } catch (err) {
            console.error(err)
        }
    }, [getAllTasks])

    useEffect(() => {
        if (!articles) {
            // getTasks()
            setIsLoading(true)
        }
        if (articles) {
            // setIsLoading(false)
        }
    }, [articles, setIsLoading])

    useEffect(() => {
        getTasks()
    }, [])
    
    return (isLoading 
        ? <Loader active size='medium' inline='centered' />
        : <Box component='div'>
            <Box sx={{ flexGrow: 1, height: '4rem', alignContent: 'center', display: 'flex' }}>
                <Button key='see-all' sx={{ marginRight: 2, color: '#1976d2', margin: '0.7rem 0' }} variant="outlined" size="medium">
                    Посмотреть все
                </Button>
            </Box>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                {articles?.map((article, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <ArticleLayoutElement key={index} title={article.title} description={article.description} createdDate={article.createdAt.toString()} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        articles: state.articlesReducer.articles
    }
}
  
const mapDispatchToProps =  {
    getAllTasks: () => getAllTasks(),
}

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(RecentPosts))