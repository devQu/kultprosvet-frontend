import CoverImage from '../../assets/cover_article_img.jpg'
import classes from './ArticleLayoutElement.module.css'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'

type TaskProps = {
    title: string
    description: string
    createdDate: string
}

export const ArticleLayoutElement: React.FC<TaskProps> = ({ title, description, createdDate }) => {

    return (
        <Card>
            <CardActionArea>
                <CardMedia>
                    <img src={CoverImage} alt='Article image'></img>
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className={classes.red_underline}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {createdDate}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}